/* --- script.js --- */

// --- CONFIGURAÇÕES ---
const SKILLS_MAP = {
    'atletismo': 'str', 'acrobacia': 'dex', 'furtividade': 'dex', 'prestidigitacao': 'dex',
    'arcanismo': 'int', 'historia': 'int', 'investigacao': 'int', 'natureza': 'int', 'religiao': 'int',
    'lidar-animais': 'wis', 'intuicao': 'wis', 'medicina': 'wis', 'percepcao': 'wis', 'sobrevivencia': 'wis',
    'atuacao': 'cha', 'enganacao': 'cha', 'intimidacao': 'cha', 'persuasao': 'cha'
};

const SAVES_MAP = { 'str': 'str', 'dex': 'dex', 'con': 'con', 'int': 'int', 'wis': 'wis', 'cha': 'cha' };

// Sentidos
const SENSES_LIST = ['blindsight', 'darkvision', 'tremorsense', 'truesight'];
const SENSES_LABELS = {
    'blindsight': 'Percepção às Cegas', 'darkvision': 'Visão no Escuro',
    'tremorsense': 'Sentido Sísmico', 'truesight': 'Visão Verdadeira'
};

// Danos
const DMG_TYPES = [
    'acido', 'concussivo', 'cortante', 'eletrico', 'frio', 'fogo', 
    'forca', 'necrotico', 'perfurante', 'psiquico', 'radiante', 
    'trovejante', 'venenoso', 'magico', 'prata', 'adamantina'
];
const DMG_LABELS = {
    'acido': 'Ácido', 'concussivo': 'Concussivo', 'cortante': 'Cortante', 
    'eletrico': 'Elétrico', 'frio': 'Frio', 'fogo': 'Fogo', 'forca': 'Força',
    'necrotico': 'Necrótico', 'perfurante': 'Perfurante', 'psiquico': 'Psíquico',
    'radiante': 'Radiante', 'trovejante': 'Trovejante', 'venenoso': 'Venenoso',
    'magico': 'Mágico', 'prata': 'Prata', 'adamantina': 'Adamantina'
};

// Condições
const CONDITIONS_LIST = [
    'agarrado', 'amaldiçoado', 'amedrontado', 'atordoado', 'caido', 'caindo', 'cego', 
    'desidratado', 'desnutrido', 'doente', 'encantado', 'envenenado', 'exausto', 
    'incapacitado', 'inconsciente', 'invisivel', 'paralisado', 'petrificado', 
    'queimando', 'restrito', 'sangrando', 'silenciado', 'sufocado', 'surdo', 
    'surpreso', 'transformado'
];
const COND_LABELS = {
    'agarrado': 'Agarrado', 'amaldiçoado': 'Amaldiçoado', 'amedrontado': 'Amedrontado',
    'atordoado': 'Atordoado', 'caido': 'Caído', 'caindo': 'Caindo', 'cego': 'Cego',
    'desidratado': 'Desidratado', 'desnutrido': 'Desnutrido', 'doente': 'Doente',
    'encantado': 'Encantado', 'envenenado': 'Envenenado', 'exausto': 'Exausto',
    'incapacitado': 'Incapacitado', 'inconsciente': 'Inconsciente', 'invisivel': 'Invisível',
    'paralisado': 'Paralisado', 'petrificado': 'Petrificado', 'queimando': 'Queimando',
    'restrito': 'Restrito', 'sangrando': 'Sangrando', 'silenciado': 'Silenciado',
    'sufocado': 'Sufocado', 'surdo': 'Surdo', 'surpreso': 'Surpreso', 'transformado': 'Transformado'
};

// Armaduras
const ARMORS_LIST = [
    'light-all', 'padded', 'leather', 'studded',
    'medium-all', 'hide', 'chain-shirt', 'scale', 'breastplate', 'half-plate',
    'heavy-all', 'ring', 'chain-mail', 'splint', 'plate',
    'shield-all', 'shield'
];
const ARMOR_LABELS = {
    'light-all': 'Todas Leves', 'padded': 'Acolchoada', 'leather': 'Couro', 'studded': 'Couro Batido',
    'medium-all': 'Todas Médias', 'hide': 'Peles', 'chain-shirt': 'Camisão', 'scale': 'Brunea', 'breastplate': 'Peitoral', 'half-plate': 'Meia-Armadura',
    'heavy-all': 'Todas Pesadas', 'ring': 'Anéis', 'chain-mail': 'Cota de Malha', 'splint': 'Talas', 'plate': 'Placas',
    'shield-all': 'Todos Escudos', 'shield': 'Escudo'
};

// Armas
const WEAPONS_LIST = [
    'simple-all', 'club', 'dagger', 'dart', 'greatclub', 'handaxe', 'javelin', 'light-hammer', 'mace', 'quarterstaff', 'sickle', 'spear', 'light-crossbow', 'shortbow', 'sling',
    'martial-all', 'battleaxe', 'flail', 'glaive', 'greataxe', 'greatsword', 'halberd', 'lance', 'longsword', 'maul', 'morningstar', 'pike', 'rapier', 'scimitar', 'shortsword', 'trident', 'war-pick', 'warhammer', 'whip', 'blowgun', 'hand-crossbow', 'heavy-crossbow', 'longbow', 'net',
    'pistol', 'musket'
];
const WEAPON_LABELS = {
    'simple-all': 'Todas Simples', 'club': 'Clava', 'dagger': 'Adaga', 'dart': 'Dardo', 'greatclub': 'Grande Clava', 'handaxe': 'Machadinha', 'javelin': 'Azagaia', 'light-hammer': 'Martelo Leve', 'mace': 'Maça', 'quarterstaff': 'Bordão', 'sickle': 'Foice', 'spear': 'Lança', 'light-crossbow': 'Besta Leve', 'shortbow': 'Arco Curto', 'sling': 'Funda',
    'martial-all': 'Todas Marciais', 'battleaxe': 'Machado Batalha', 'flail': 'Mangual', 'glaive': 'Glaive', 'greataxe': 'Machado Grande', 'greatsword': 'Espada Grande', 'halberd': 'Alabarda', 'lance': 'Lança Montada', 'longsword': 'Espada Longa', 'maul': 'Marreta', 'morningstar': 'Maça Estrela', 'pike': 'Pique', 'rapier': 'Rapieira', 'scimitar': 'Cimitarra', 'shortsword': 'Espada Curta', 'trident': 'Tridente', 'war-pick': 'Picareta', 'warhammer': 'Martelo Guerra', 'whip': 'Chicote', 'blowgun': 'Zarabatana', 'hand-crossbow': 'Besta Mão', 'heavy-crossbow': 'Besta Pesada', 'longbow': 'Arco Longo', 'net': 'Rede',
    'pistol': 'Pistola', 'musket': 'Mosquete'
};

// Idiomas
const LANGUAGES_LIST = [
    'common', 'dwarvish', 'elvish', 'giant', 'gnomish', 'goblin', 'halfling', 'orc', 'draconic', 'sign',
    'celestial', 'abyssal', 'infernal', 'primordial', 'sylvan', 'undercommon', 'deep', 'druidic', 'thieves', 'aarakocra', 'gith', 'gnoll',
    'telepathy'
];
const LANG_LABELS = {
    'common': 'Comum', 'dwarvish': 'Anão', 'elvish': 'Élfico', 'giant': 'Gigante', 'gnomish': 'Gnomico',
    'goblin': 'Goblin', 'halfling': 'Pequenino', 'orc': 'Orc', 'draconic': 'Dracônico', 'sign': 'Libras',
    'celestial': 'Celestial', 'abyssal': 'Abissal', 'infernal': 'Infernal', 'primordial': 'Primordial',
    'sylvan': 'Silvestre', 'undercommon': 'Subcomum', 'deep': 'Profundo', 'druidic': 'Druídico',
    'thieves': 'Gíria Ladino', 'aarakocra': 'Aarakocra', 'gith': 'Gith', 'gnoll': 'Gnoll',
    'telepathy': 'Telepatia'
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
        currency: '', 'general-notes': '',
        'jack-of-all-trades': false,
        charAvatarData: ''
    },
    checks: {}, 
    values: {}, 
    lists: {
        'attacks-list': [], 'resources-list': [], 'features-list': [], 'spells-list': [], 'inventory-list': []
    }
};

// Inicialização
Object.keys(SKILLS_MAP).forEach(k => defaultData.checks[`skill-${k}`] = 0);
Object.keys(SAVES_MAP).forEach(k => defaultData.checks[`save-${k}`] = false);
SENSES_LIST.forEach(k => {
    defaultData.checks[`sense-${k}`] = false;
    defaultData.values[`val-sense-${k}`] = '';
});
DMG_TYPES.forEach(k => {
    defaultData.checks[`res-${k}`] = false;
    defaultData.checks[`vul-${k}`] = false;
    defaultData.checks[`imm-${k}`] = false;
});
CONDITIONS_LIST.forEach(k => {
    defaultData.checks[`cond-${k}`] = false;
    defaultData.checks[`imm-cond-${k}`] = false;
});
ARMORS_LIST.forEach(k => defaultData.checks[`arm-${k}`] = false);
WEAPONS_LIST.forEach(k => defaultData.checks[`wpn-${k}`] = false);
LANGUAGES_LIST.forEach(k => {
    defaultData.checks[`lang-${k}`] = false;
    if(k === 'telepathy') defaultData.values[`val-lang-telepathy`] = '';
});

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

// --- MODAIS ---
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(event, modalId) {
    if (!event || event.target.id === modalId || event.target.classList.contains('btn') || event.target.classList.contains('btn-close')) {
        document.getElementById(modalId).classList.add('hidden');
        renderTags(); 
        debouncedSave();
    }
}
window.openModal = openModal;
window.closeModal = closeModal;

// --- RENDERIZAÇÃO DE TAGS ---
function renderTags() {
    // 1. Sentidos
    const sensesContainer = document.getElementById('display-senses');
    sensesContainer.innerHTML = '';
    let hasSense = false;
    SENSES_LIST.forEach(key => {
        const isChecked = document.getElementById(`sense-${key}`).checked;
        const val = document.getElementById(`val-sense-${key}`).value;
        if (isChecked) {
            hasSense = true;
            sensesContainer.innerHTML += `<span class="tag-item">${SENSES_LABELS[key]} <span class="tag-val">${val ? val + 'ft' : ''}</span></span>`;
        }
    });
    if (!hasSense) sensesContainer.innerHTML = '<span class="empty-msg">Nenhum sentido especial.</span>';

    // 2. Resistências
    const resContainer = document.getElementById('display-resistances');
    resContainer.innerHTML = '';
    let hasRes = false;
    DMG_TYPES.forEach(key => {
        const isChecked = document.getElementById(`res-${key}`).checked;
        if (isChecked) {
            hasRes = true;
            resContainer.innerHTML += `<span class="tag-item" style="border-color:var(--success)">${DMG_LABELS[key]}</span>`;
        }
    });
    if (!hasRes) resContainer.innerHTML = '<span class="empty-msg">Nenhuma resistência.</span>';

    // 3. Vulnerabilidades
    const vulContainer = document.getElementById('display-vulnerabilities');
    vulContainer.innerHTML = '';
    let hasVul = false;
    DMG_TYPES.forEach(key => {
        const isChecked = document.getElementById(`vul-${key}`).checked;
        if (isChecked) {
            hasVul = true;
            vulContainer.innerHTML += `<span class="tag-item" style="border-color:var(--danger)">${DMG_LABELS[key]}</span>`;
        }
    });
    if (!hasVul) vulContainer.innerHTML = '<span class="empty-msg">Nenhuma vulnerabilidade.</span>';

    // 4. Condições (Ativas)
    const condContainer = document.getElementById('display-conditions');
    condContainer.innerHTML = '';
    let hasCond = false;
    CONDITIONS_LIST.forEach(key => {
        const isChecked = document.getElementById(`cond-${key}`).checked;
        if (isChecked) {
            hasCond = true;
            condContainer.innerHTML += `<span class="tag-item" style="border-color:var(--accent); color:var(--accent);">${COND_LABELS[key]}</span>`;
        }
    });
    if (!hasCond) condContainer.innerHTML = '<span class="empty-msg">Normal.</span>';

    // 5. Imunidades
    const immContainer = document.getElementById('display-immunities');
    immContainer.innerHTML = '';
    let hasImm = false;
    DMG_TYPES.forEach(key => {
        const isChecked = document.getElementById(`imm-${key}`).checked;
        if (isChecked) { hasImm = true; immContainer.innerHTML += `<span class="tag-item" style="background:#4a148c; border-color:#8e24aa;">🛡️ ${DMG_LABELS[key]}</span>`; }
    });
    CONDITIONS_LIST.forEach(key => {
        const isChecked = document.getElementById(`imm-cond-${key}`).checked;
        if (isChecked) { hasImm = true; immContainer.innerHTML += `<span class="tag-item" style="background:#4a148c; border-color:#8e24aa;">🚫 ${COND_LABELS[key]}</span>`; }
    });
    if (!hasImm) immContainer.innerHTML = '<span class="empty-msg">Nenhuma imunidade.</span>';

    // 6. Armaduras
    const armContainer = document.getElementById('display-armors');
    armContainer.innerHTML = '';
    let hasArm = false;
    ARMORS_LIST.forEach(key => {
        const isChecked = document.getElementById(`arm-${key}`).checked;
        if (isChecked) {
            hasArm = true;
            const style = key.includes('all') ? 'font-weight:bold; color:var(--accent);' : '';
            armContainer.innerHTML += `<span class="tag-item" style="${style}">${ARMOR_LABELS[key]}</span>`;
        }
    });
    if (!hasArm) armContainer.innerHTML = '<span class="empty-msg">Nenhuma.</span>';

    // 7. Armas
    const wpnContainer = document.getElementById('display-weapons');
    wpnContainer.innerHTML = '';
    let hasWpn = false;
    WEAPONS_LIST.forEach(key => {
        const isChecked = document.getElementById(`wpn-${key}`).checked;
        if (isChecked) {
            hasWpn = true;
            const style = key.includes('all') ? 'font-weight:bold; color:var(--accent);' : '';
            wpnContainer.innerHTML += `<span class="tag-item" style="${style}">${WEAPON_LABELS[key]}</span>`;
        }
    });
    if (!hasWpn) wpnContainer.innerHTML = '<span class="empty-msg">Nenhuma.</span>';

    // 8. Idiomas
    const langContainer = document.getElementById('display-languages');
    langContainer.innerHTML = '';
    let hasLang = false;
    LANGUAGES_LIST.forEach(key => {
        const isChecked = document.getElementById(`lang-${key}`).checked;
        if (isChecked) {
            hasLang = true;
            let val = '';
            if (key === 'telepathy') {
                const num = document.getElementById('val-lang-telepathy').value;
                val = num ? ` (${num}ft)` : '';
            }
            langContainer.innerHTML += `<span class="tag-item" style="color:#ce93d8; border-color:#ce93d8;">${LANG_LABELS[key]}${val}</span>`;
        }
    });
    if (!hasLang) langContainer.innerHTML = '<span class="empty-msg">Nenhum.</span>';
}

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

// --- Lógica de Sub-Abas (Perícias vs Salvaguardas) ---
function toggleSkills(view) {
    // Esconde ambos
    document.getElementById('view-skills').classList.add('hidden');
    document.getElementById('view-saves').classList.add('hidden');
    
    // Desativa botões
    document.getElementById('btn-view-skills').classList.remove('active');
    document.getElementById('btn-view-saves').classList.remove('active');

    // Mostra o selecionado
    document.getElementById(`view-${view}`).classList.remove('hidden');
    document.getElementById(`btn-view-${view}`).classList.add('active');
}
// Exporta para o HTML usar
window.toggleSkills = toggleSkills;

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

    document.getElementById('jack-of-all-trades').addEventListener('change', () => { calcMods(); debouncedSave(); });

    document.querySelectorAll('input, textarea').forEach(el => {
        if (!recalcTriggers.includes(el.id) && !el.id.includes('Search') && el.id !== 'jack-of-all-trades') {
            el.addEventListener('input', () => {
                if (el.id.startsWith('hp-')) updateHPUI();
                debouncedSave();
            });
        }
    });

    Object.keys(SKILLS_MAP).forEach(skill => {
        const el = document.getElementById(`skill-${skill}`);
        el.addEventListener('click', () => {
            let state = parseInt(el.getAttribute('data-state')) || 0;
            state = (state + 1) % 3; 
            el.setAttribute('data-state', state);
            calcMods(); debouncedSave();
        });
    });

    Object.keys(SAVES_MAP).forEach(save => {
        document.getElementById(`save-${save}`).addEventListener('change', () => { calcMods(); debouncedSave(); });
    });

    document.querySelectorAll('[data-hp-mod]').forEach(btn => {
        btn.addEventListener('click', (e) => modHP(parseInt(e.target.getAttribute('data-hp-mod'))));
    });

    // Listeners Tags
    SENSES_LIST.forEach(k => {
        document.getElementById(`sense-${k}`).addEventListener('change', debouncedSave);
        document.getElementById(`val-sense-${k}`).addEventListener('input', debouncedSave);
    });
    DMG_TYPES.forEach(k => {
        document.getElementById(`res-${k}`).addEventListener('change', debouncedSave);
        document.getElementById(`vul-${k}`).addEventListener('change', debouncedSave);
        document.getElementById(`imm-${k}`).addEventListener('change', debouncedSave);
    });
    CONDITIONS_LIST.forEach(k => {
        document.getElementById(`cond-${k}`).addEventListener('change', debouncedSave);
        document.getElementById(`imm-cond-${k}`).addEventListener('change', debouncedSave);
    });
    ARMORS_LIST.forEach(k => {
        document.getElementById(`arm-${k}`).addEventListener('change', debouncedSave);
    });
    WEAPONS_LIST.forEach(k => {
        document.getElementById(`wpn-${k}`).addEventListener('change', debouncedSave);
    });
    LANGUAGES_LIST.forEach(k => {
        document.getElementById(`lang-${k}`).addEventListener('change', debouncedSave);
        if(k === 'telepathy') document.getElementById(`val-lang-telepathy`).addEventListener('input', debouncedSave);
    });

    // 1. Lógica do Título Dinâmico
    const nameInput = document.getElementById('charName');
    const titleText = document.getElementById('page-title');
    
    // Função para atualizar título
    const updateTitle = () => {
        titleText.innerText = nameInput.value.trim() || 'Ficha de Personagem';
    };
    
    nameInput.addEventListener('input', () => {
        updateTitle();
        debouncedSave(); // Salva o nome
    });

    // 2. Lógica do Avatar (Upload)
    const avatarInput = document.getElementById('avatar-upload');
    const avatarImg = document.getElementById('char-avatar-img');

    avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Limite de tamanho simples (opcional, ex: 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("Imagem muito grande! Tente uma menor que 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                avatarImg.src = base64String;
                // Salva no objeto temporário para persistência
                document.getElementById('charName').setAttribute('data-avatar', base64String); 
                debouncedSave();
            };
            reader.readAsDataURL(file);
        }
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

        if (matchesSearch && matchesCat) item.classList.remove('hidden');
        else item.classList.add('hidden');
    });
}

const debouncedSave = debounce(saveData, 500);

function saveData() {

    const data = { ids: {}, checks: {}, values: {}, lists: {} };
    
    // Salva IDs normais
    for (const key in defaultData.ids) {
        // Pula o charAvatarData aqui, vamos tratar manual
        if(key === 'charAvatarData') continue; 
        
        const el = document.getElementById(key);
        if (el) {
            if(el.type === 'checkbox') data.ids[key] = el.checked;
            else data.ids[key] = el.value;
        }
    }
    
    // SALVA O AVATAR E O TÍTULO
    const avatarSrc = document.getElementById('char-avatar-img').src;
    // Só salva se não for o placeholder padrão (verifica se começa com data:image)
    if(avatarSrc.startsWith('data:image')) {
        data.ids['charAvatarData'] = avatarSrc;
    }

    Object.keys(SKILLS_MAP).forEach(key => {
        const el = document.getElementById(`skill-${key}`);
        if(el) data.checks[`skill-${key}`] = parseInt(el.getAttribute('data-state')) || 0;
    });
    Object.keys(SAVES_MAP).forEach(key => {
        const el = document.getElementById(`save-${key}`);
        if(el) data.checks[`save-${key}`] = el.checked;
    });
    SENSES_LIST.forEach(key => {
        const el = document.getElementById(`sense-${key}`);
        if(el) data.checks[`sense-${key}`] = el.checked;
        const valEl = document.getElementById(`val-sense-${key}`);
        if(valEl) data.values[`val-sense-${key}`] = valEl.value;
    });
    DMG_TYPES.forEach(key => {
        const resEl = document.getElementById(`res-${key}`);
        if(resEl) data.checks[`res-${key}`] = resEl.checked;
        const vulEl = document.getElementById(`vul-${key}`);
        if(vulEl) data.checks[`vul-${key}`] = vulEl.checked;
        const immEl = document.getElementById(`imm-${key}`);
        if(immEl) data.checks[`imm-${key}`] = immEl.checked;
    });
    CONDITIONS_LIST.forEach(key => {
        const condEl = document.getElementById(`cond-${key}`);
        if(condEl) data.checks[`cond-${key}`] = condEl.checked;
        const immCondEl = document.getElementById(`imm-cond-${key}`);
        if(immCondEl) data.checks[`imm-cond-${key}`] = immCondEl.checked;
    });
    ARMORS_LIST.forEach(key => {
        const el = document.getElementById(`arm-${key}`);
        if(el) data.checks[`arm-${key}`] = el.checked;
    });
    WEAPONS_LIST.forEach(key => {
        const el = document.getElementById(`wpn-${key}`);
        if(el) data.checks[`wpn-${key}`] = el.checked;
    });
    LANGUAGES_LIST.forEach(key => {
        const el = document.getElementById(`lang-${key}`);
        if(el) data.checks[`lang-${key}`] = el.checked;
        if(key === 'telepathy') {
            const valEl = document.getElementById(`val-lang-telepathy`);
            if(valEl) data.values[`val-lang-telepathy`] = valEl.value;
        }
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

    // Carrega IDs
    for (const [key, value] of Object.entries(data.ids)) {
        if(key === 'charAvatarData') continue; // Tratamento manual

        const el = document.getElementById(key);
        if (el) {
            if(el.type === 'checkbox') el.checked = value;
            else el.value = value;
        }
    }

    // CARREGA AVATAR
    if (data.ids.charAvatarData) {
        document.getElementById('char-avatar-img').src = data.ids.charAvatarData;
    } else {
        // Restaura placeholder se não houver imagem salva
        document.getElementById('char-avatar-img').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
    }

    // ATUALIZA TÍTULO DA PÁGINA
    const nameVal = document.getElementById('charName').value;
    document.getElementById('page-title').innerText = nameVal || 'Ficha de Personagem';
    
    if(data.checks) {
        for (const [key, value] of Object.entries(data.checks)) {
            const el = document.getElementById(key);
            if (el) {
                if(key.startsWith('skill-')) el.setAttribute('data-state', value);
                else el.checked = value;
            }
        }
    }
    if(data.values) {
        for (const [key, value] of Object.entries(data.values)) {
            const el = document.getElementById(key);
            if(el) el.value = value;
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
    renderTags(); // Atualiza UI
    updateHPUI();
}

function calcMods() {
    const profBonus = parseInt(document.getElementById('profBonus').value) || 0;
    const isJack = document.getElementById('jack-of-all-trades').checked;
    const jackBonus = Math.floor(profBonus / 2);
    const mods = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
        const val = parseInt(document.getElementById(`attr-${attr}`).value) || 10;
        const mod = Math.floor((val - 10) / 2);
        mods[attr] = mod;
        const modEl = document.getElementById(`mod-${attr}`);
        if(modEl) modEl.innerText = (mod >= 0 ? '+' : '') + mod;
    });
    for (const [skill, attr] of Object.entries(SKILLS_MAP)) {
        const el = document.getElementById(`skill-${skill}`);
        const state = parseInt(el.getAttribute('data-state')) || 0;
        let bonus = mods[attr];
        if (state === 1) bonus += profBonus;
        else if (state === 2) bonus += (profBonus * 2);
        else if (isJack) bonus += jackBonus;
        const valEl = document.getElementById(`val-${skill}`);
        if(valEl) {
            valEl.innerText = (bonus >= 0 ? '+' : '') + bonus;
            if(state === 2) valEl.style.color = '#ffd700';
            else if(state === 1) valEl.style.color = 'var(--success)';
            else if(isJack) valEl.style.color = '#81d4fa'; 
            else valEl.style.color = 'var(--accent)';
        }
    }
    for (const [save, attr] of Object.entries(SAVES_MAP)) {
        const isProficient = document.getElementById(`save-${save}`).checked;
        const total = mods[attr] + (isProficient ? profBonus : 0);
        const el = document.getElementById(`val-save-${save}`);
        if(el) { el.innerText = (total >= 0 ? '+' : '') + total; el.style.color = isProficient ? 'var(--success)' : 'var(--accent)'; }
    }
    const elPerc = document.getElementById(`skill-percepcao`);
    const statePerc = parseInt(elPerc.getAttribute('data-state')) || 0;
    let bonusPerc = (statePerc === 2) ? (profBonus * 2) : (statePerc === 1 ? profBonus : (isJack ? jackBonus : 0));
    document.getElementById('passive-perception').innerText = 10 + mods['wis'] + bonusPerc;
    const elInv = document.getElementById(`skill-investigacao`);
    const stateInv = parseInt(elInv.getAttribute('data-state')) || 0;
    let bonusInv = (stateInv === 2) ? (profBonus * 2) : (stateInv === 1 ? profBonus : (isJack ? jackBonus : 0));
    document.getElementById('passive-investigation').innerText = 10 + mods['int'] + bonusInv;
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
        html = `<input type="text" name="name" placeholder="Arma" value="${data.name||''}" style="flex:2" oninput="debouncedSave()"><input type="text" name="bonus" placeholder="+Tk" value="${data.bonus||''}" style="width:50px" oninput="debouncedSave()"><input type="text" name="dmg" placeholder="Dano" value="${data.dmg||''}" style="flex:1" oninput="debouncedSave()">`;
    } else if (type === 'resource') {
        html = `<input type="text" name="name" placeholder="Recurso" value="${data.name||''}" style="flex:2" oninput="debouncedSave()"><input type="number" name="current" value="${data.current||0}" style="width:50px" oninput="debouncedSave()"><span>/</span><input type="number" name="max" value="${data.max||0}" style="width:50px" oninput="debouncedSave()">`;
    } else if (type === 'feature') {
        html = `<div style="width:100%">${createSelect(FEATURE_CATS, data.category)}<input type="text" name="name" placeholder="Nome" value="${data.name||''}" style="font-weight:bold; margin-bottom:5px" oninput="debouncedSave(); filterList('featureSearch','featureFilter','features-list');"><textarea name="desc" placeholder="Descrição..." rows="2" oninput="debouncedSave(); filterList('featureSearch','featureFilter','features-list');">${data.desc||''}</textarea></div>`;
    } else if (type === 'spell') {
        html = `<div style="width:100%">${createSelect(SPELL_LEVELS, data.category)}<input type="text" name="name" placeholder="Nome da Magia" value="${data.name||''}" style="font-weight:bold; margin-bottom:5px" oninput="debouncedSave(); filterList('spellSearch','spellFilter','spells-list');"><textarea name="desc" placeholder="Descrição..." rows="2" oninput="debouncedSave(); filterList('spellSearch','spellFilter','spells-list');">${data.desc||''}</textarea></div>`;
    } else if (type === 'item') {
        html = `<input type="number" name="qtd" value="${data.qtd||1}" class="qty-col" oninput="debouncedSave()"><div style="flex:1; display:flex; flex-direction:column;">${createSelect(ITEM_CATS, data.category)}<input type="text" name="name" placeholder="Nome do Item" value="${data.name||''}" class="name-col" oninput="debouncedSave(); filterList('inventorySearch','inventoryFilter','inventory-list');"></div>`;
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
        try { JSON.parse(e.target.result); localStorage.setItem('dndSheetData', e.target.result); loadData(); alert("Sucesso!"); } catch { alert("Arquivo inválido"); }
    };
    r.readAsText(f);
}

function resetData() {
    if(confirm("Apagar tudo?")) { localStorage.removeItem('dndSheetData'); location.reload(); }
}

function resizeActiveTextareas() {
    document.querySelectorAll('textarea').forEach(el => {
        if (el.offsetParent !== null) { el.style.height = 'auto'; el.style.height = (el.scrollHeight + 5) + 'px'; }
    });
}

function toggleMode(isReadMode) {
    const body = document.body;
    if (isReadMode) { body.classList.add('read-mode'); resizeActiveTextareas(); } 
    else { body.classList.remove('read-mode'); document.querySelectorAll('textarea').forEach(el => { el.style.height = ''; }); }
}
