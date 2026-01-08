/* --- script.js --- */

// --- CONFIGURAÇÕES E CONSTANTES ---
const SKILLS_MAP = {
    'atletismo': 'str',
    'acrobacia': 'dex', 'furtividade': 'dex', 'prestidigitacao': 'dex',
    'arcanismo': 'int', 'historia': 'int', 'investigacao': 'int', 'natureza': 'int', 'religiao': 'int',
    'lidar-animais': 'wis', 'intuicao': 'wis', 'medicina': 'wis', 'percepcao': 'wis', 'sobrevivencia': 'wis',
    'atuacao': 'cha', 'enganacao': 'cha', 'intimidacao': 'cha', 'persuasao': 'cha'
};

const SAVES_MAP = {
    'str': 'str', 'dex': 'dex', 'con': 'con',
    'int': 'int', 'wis': 'wis', 'cha': 'cha'
};

const FEATURE_CATS = ["Classe", "Raça", "Talento", "Maestria", "Outro"];
const SPELL_LEVELS = ["Truque", "1º Círculo", "2º Círculo", "3º Círculo", "4º Círculo", "5º Círculo", "6º Círculo", "7º Círculo", "8º Círculo", "9º Círculo"];
const ITEM_CATS = ["Geral", "Arma", "Armadura", "Poção", "Item Mágico", "Ferramenta", "Tesouro"];

const defaultData = {
    ids: {
        charName: '', charClass: '', charRace: '', charBackground: '',
        'attr-str': 10, 'attr-dex': 10, 'attr-con': 10, 'attr-int': 10, 'attr-wis': 10, 'attr-cha': 10,
        ac: 10, initiative: 0, speed: '9m', profBonus: 2,
        'hp-current': 10, 'hp-max': 10, 'hp-temp': 0,
        currency: '', 'general-notes': ''
    },
    checks: {},
    lists: {
        'attacks-list': [], 'resources-list': [], 'features-list': [], 'spells-list': [], 'inventory-list': []
    }
};

Object.keys(SKILLS_MAP).forEach(k => defaultData.checks[`skill-${k}`] = false);
Object.keys(SAVES_MAP).forEach(k => defaultData.checks[`save-${k}`] = false);

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initListeners();
    loadData();
});

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.add('hidden'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab')).classList.remove('hidden');

            if (document.body.classList.contains('read-mode')) {
                setTimeout(resizeActiveTextareas, 10);
            }
        });
    });
}

function toggleSkills(view) {
    document.getElementById('view-skills').classList.add('hidden');
    document.getElementById('view-saves').classList.add('hidden');
    document.getElementById('btn-view-skills').classList.remove('active');
    document.getElementById('btn-view-saves').classList.remove('active');
    document.getElementById(`view-${view}`).classList.remove('hidden');
    document.getElementById(`btn-view-${view}`).classList.add('active');
}
window.toggleSkills = toggleSkills;

function initListeners() {
    document.getElementById('modeToggle').addEventListener('change', (e) => toggleMode(e.target.checked));

    document.getElementById('btnAddAttack').onclick = () => addItem('attacks-list', 'attack');
    document.getElementById('btnAddResource').onclick = () => addItem('resources-list', 'resource');
    document.getElementById('btnAddFeature').onclick = () => addItem('features-list', 'feature');
    document.getElementById('btnAddSpell').onclick = () => addItem('spells-list', 'spell');
    document.getElementById('btnAddItem').onclick = () => addItem('inventory-list', 'item');
    
    document.getElementById('btnExport').onclick = exportData;
    document.getElementById('btnReset').onclick = resetData;
    document.getElementById('importFile').onchange = (e) => importData(e.target);
    document.getElementById('btnImport').onclick = () => document.getElementById('importFile').click();

    setupFilter('featureSearch', 'featureFilter', 'features-list');
    setupFilter('spellSearch', 'spellFilter', 'spells-list');
    setupFilter('inventorySearch', 'inventoryFilter', 'inventory-list');

    const recalcTriggers = ['attr-str', 'attr-dex', 'attr-con', 'attr-int', 'attr-wis', 'attr-cha', 'profBonus'];
    recalcTriggers.forEach(id => {
        document.getElementById(id).addEventListener('input', () => { calcMods(); debouncedSave(); });
    });

    document.querySelectorAll('input, textarea').forEach(el => {
        if (!recalcTriggers.includes(el.id) && !el.id.includes('Search')) {
            el.addEventListener('input', () => {
                if (el.id.startsWith('hp-')) updateHPUI();
                debouncedSave();
            });
        }
    });
    
    Object.keys(SKILLS_MAP).forEach(skill => {
        document.getElementById(`skill-${skill}`).addEventListener('change', () => { calcMods(); debouncedSave(); });
    });
    Object.keys(SAVES_MAP).forEach(save => {
        document.getElementById(`save-${save}`).addEventListener('change', () => { calcMods(); debouncedSave(); });
    });

    document.querySelectorAll('[data-hp-mod]').forEach(btn => {
        btn.addEventListener('click', (e) => modHP(parseInt(e.target.getAttribute('data-hp-mod'))));
    });
}

function setupFilter(searchId, filterId, listId) {
    const update = () => filterList(searchId, filterId, listId);
    document.getElementById(searchId).addEventListener('input', update);
    document.getElementById(filterId).addEventListener('change', update);
}

function filterList(searchId, filterId, listId) {
    const searchText = document.getElementById(searchId).value.toLowerCase();
    const filterCat = document.getElementById(filterId).value;
    const container = document.getElementById(listId);
    
    container.querySelectorAll('.dynamic-item').forEach(item => {
        const nameInput = item.querySelector('input[name="name"]');
        const descInput = item.querySelector('textarea[name="desc"]');
        const catSelect = item.querySelector('select[name="category"]');
        
        const nameText = (nameInput ? nameInput.value : '').toLowerCase();
        const descText = (descInput ? descInput.value : '').toLowerCase();
        const itemCat = catSelect ? catSelect.value : '';

        const matchesSearch = nameText.includes(searchText) || descText.includes(searchText);
        const matchesCat = filterCat === 'all' || itemCat === filterCat;

        if (matchesSearch && matchesCat) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

const debouncedSave = debounce(saveData, 500);

function saveData() {
    const data = { ids: {}, checks: {}, lists: {} };
    for (const key in defaultData.ids) {
        const el = document.getElementById(key);
        if (el) data.ids[key] = el.value;
    }
    Object.keys(SKILLS_MAP).forEach(key => {
        const el = document.getElementById(`skill-${key}`);
        if(el) data.checks[`skill-${key}`] = el.checked;
    });
    Object.keys(SAVES_MAP).forEach(key => {
        const el = document.getElementById(`save-${key}`);
        if(el) data.checks[`save-${key}`] = el.checked;
    });
    ['attacks-list', 'resources-list', 'features-list', 'spells-list', 'inventory-list'].forEach(listId => {
        const container = document.getElementById(listId);
        const items = [];
        container.querySelectorAll('.dynamic-item').forEach(row => {
            const itemData = {};
            row.querySelectorAll('input, textarea, select').forEach(input => {
                itemData[input.name] = input.type === 'checkbox' ? input.checked : input.value;
            });
            items.push(itemData);
        });
        data.lists[listId] = items;
    });
    localStorage.setItem('dndSheetData', JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem('dndSheetData');
    const data = saved ? JSON.parse(saved) : defaultData;
    for (const [key, value] of Object.entries(data.ids)) {
        const el = document.getElementById(key);
        if (el) el.value = value;
    }
    if(data.checks) {
        for (const [key, value] of Object.entries(data.checks)) {
            const el = document.getElementById(key);
            if (el) el.checked = value;
        }
    }
    for (const [listId, items] of Object.entries(data.lists)) {
        const container = document.getElementById(listId);
        container.innerHTML = '';
        let type = 'item';
        if(listId.includes('attack')) type = 'attack';
        else if(listId.includes('resource')) type = 'resource';
        else if(listId.includes('feature')) type = 'feature';
        else if(listId.includes('spell')) type = 'spell';
        items.forEach(item => renderItem(container, type, item));
    }
    calcMods();
    updateHPUI();
}

function calcMods() {
    const profBonus = parseInt(document.getElementById('profBonus').value) || 0;
    const mods = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
        const val = parseInt(document.getElementById(`attr-${attr}`).value) || 10;
        const mod = Math.floor((val - 10) / 2);
        mods[attr] = mod;
        const modEl = document.getElementById(`mod-${attr}`);
        if(modEl) modEl.innerText = (mod >= 0 ? '+' : '') + mod;
    });
    for (const [skill, attr] of Object.entries(SKILLS_MAP)) {
        const isProficient = document.getElementById(`skill-${skill}`).checked;
        const total = mods[attr] + (isProficient ? profBonus : 0);
        const el = document.getElementById(`val-${skill}`);
        if(el) { el.innerText = (total >= 0 ? '+' : '') + total; el.style.color = isProficient ? 'var(--success)' : 'var(--accent)'; }
    }
    for (const [save, attr] of Object.entries(SAVES_MAP)) {
        const isProficient = document.getElementById(`save-${save}`).checked;
        const total = mods[attr] + (isProficient ? profBonus : 0);
        const el = document.getElementById(`val-save-${save}`);
        if(el) { el.innerText = (total >= 0 ? '+' : '') + total; el.style.color = isProficient ? 'var(--success)' : 'var(--accent)'; }
    }
    const percBonus = document.getElementById('skill-percepcao').checked ? profBonus : 0;
    document.getElementById('passive-perception').innerText = 10 + mods['wis'] + percBonus;
    const invBonus = document.getElementById('skill-investigacao').checked ? profBonus : 0;
    document.getElementById('passive-investigation').innerText = 10 + mods['int'] + invBonus;
}

function updateHPUI() {
    const current = parseInt(document.getElementById('hp-current').value) || 0;
    const max = parseInt(document.getElementById('hp-max').value) || 1;
    const percent = Math.min(100, Math.max(0, (current / max) * 100));
    const bar = document.getElementById('hp-bar');
    bar.style.width = percent + '%';
    bar.style.background = percent < 25 ? '#cf6679' : (percent < 50 ? '#ffb74d' : '#03dac6');
}

function modHP(amount) {
    const currentEl = document.getElementById('hp-current');
    currentEl.value = (parseInt(currentEl.value) || 0) + amount;
    updateHPUI();
    debouncedSave();
}

function addItem(containerId, type) {
    const container = document.getElementById(containerId);
    let defaultCat = '';
    if (type === 'feature') defaultCat = 'Classe';
    if (type === 'spell') defaultCat = '1º Círculo';
    if (type === 'item') defaultCat = 'Geral';
    
    renderItem(container, type, { category: defaultCat });
    saveData();
}

function renderItem(container, type, data) {
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    let html = '';

    const createSelect = (options, selected) => {
        return `<select name="category" class="category-select" onchange="debouncedSave(); filterList(this.closest('.tab-content').querySelector('.search-input').id, this.closest('.tab-content').querySelector('.filter-select').id, this.closest('.dynamic-list').id);">
            ${options.map(c => `<option value="${c}" ${selected === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>`;
    };

    if (type === 'attack') {
        html = `<input type="text" name="name" placeholder="Arma" value="${data.name||''}" style="flex:2" oninput="debouncedSave()">
                <input type="text" name="bonus" placeholder="+Tk" value="${data.bonus||''}" style="width:50px" oninput="debouncedSave()">
                <input type="text" name="dmg" placeholder="Dano" value="${data.dmg||''}" style="flex:1" oninput="debouncedSave()">`;
    } else if (type === 'resource') {
        html = `<input type="text" name="name" placeholder="Recurso" value="${data.name||''}" style="flex:2" oninput="debouncedSave()">
                <input type="number" name="current" value="${data.current||0}" style="width:50px" oninput="debouncedSave()">
                <span>/</span> <input type="number" name="max" value="${data.max||0}" style="width:50px" oninput="debouncedSave()">`;
    } else if (type === 'feature') {
        html = `
            <div style="width:100%">
                ${createSelect(FEATURE_CATS, data.category)}
                <input type="text" name="name" placeholder="Nome" value="${data.name||''}" style="font-weight:bold; margin-bottom:5px" oninput="debouncedSave(); filterList('featureSearch','featureFilter','features-list');">
                <textarea name="desc" placeholder="Descrição..." rows="2" oninput="debouncedSave(); filterList('featureSearch','featureFilter','features-list');">${data.desc||''}</textarea>
            </div>`;
    } else if (type === 'spell') {
        html = `
            <div style="width:100%">
                ${createSelect(SPELL_LEVELS, data.category)}
                <input type="text" name="name" placeholder="Nome da Magia" value="${data.name||''}" style="font-weight:bold; margin-bottom:5px" oninput="debouncedSave(); filterList('spellSearch','spellFilter','spells-list');">
                <textarea name="desc" placeholder="Descrição..." rows="2" oninput="debouncedSave(); filterList('spellSearch','spellFilter','spells-list');">${data.desc||''}</textarea>
            </div>`;
    } else if (type === 'item') {
        html = `<input type="number" name="qtd" value="${data.qtd||1}" class="qty-col" oninput="debouncedSave()">
                <div style="flex:1; display:flex; flex-direction:column;">
                    ${createSelect(ITEM_CATS, data.category)}
                    <input type="text" name="name" placeholder="Nome do Item" value="${data.name||''}" class="name-col" oninput="debouncedSave(); filterList('inventorySearch','inventoryFilter','inventory-list');">
                </div>`;
    }

    div.innerHTML = html + `<button class="btn btn-danger btn-small action-col" onclick="this.parentElement.remove(); debouncedSave()">X</button>`;
    container.appendChild(div);
}

function exportData() {
    saveData();
    const raw = localStorage.getItem('dndSheetData');
    if(!raw) return;
    const name = JSON.parse(raw).ids.charName || 'Personagem';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([raw], {type: "application/json"}));
    a.download = `${name.replace(/[^a-z0-9]/gi, '_')}_Ficha.json`;
    a.click();
}

function importData(input) {
    const f = input.files[0];
    if(!f || !confirm("Isso substituirá a ficha atual. Continuar?")) return;
    const r = new FileReader();
    r.onload = e => {
        try {
            JSON.parse(e.target.result);
            localStorage.setItem('dndSheetData', e.target.result);
            loadData();
            alert("Sucesso!");
        } catch { alert("Arquivo inválido"); }
    };
    r.readAsText(f);
}

function resetData() {
    if(confirm("Apagar tudo?")) { localStorage.removeItem('dndSheetData'); location.reload(); }
}

function resizeActiveTextareas() {
    document.querySelectorAll('textarea').forEach(el => {
        if (el.offsetParent !== null) { 
            el.style.height = 'auto'; 
            el.style.height = (el.scrollHeight + 5) + 'px'; 
        }
    });
}

function toggleMode(isReadMode) {
    const body = document.body;
    if (isReadMode) {
        body.classList.add('read-mode');
        resizeActiveTextareas();
    } else {
        body.classList.remove('read-mode');
        document.querySelectorAll('textarea').forEach(el => { el.style.height = ''; });
    }
}