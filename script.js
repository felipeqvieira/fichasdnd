/* --- script.js (CORRIGIDO: Vida, Morte e Exaustão) --- */

// --- CONFIGURAÇÕES ---
const SKILLS_MAP = {
    'atletismo': 'str', 'acrobacia': 'dex', 'furtividade': 'dex', 'prestidigitacao': 'dex',
    'arcanismo': 'int', 'historia': 'int', 'investigacao': 'int', 'natureza': 'int', 'religiao': 'int',
    'lidar-animais': 'wis', 'intuicao': 'wis', 'medicina': 'wis', 'percepcao': 'wis', 'sobrevivencia': 'wis',
    'atuacao': 'cha', 'enganacao': 'cha', 'intimidacao': 'cha', 'persuasao': 'cha'
};

const SAVES_MAP = { 'str': 'str', 'dex': 'dex', 'con': 'con', 'int': 'int', 'wis': 'wis', 'cha': 'cha' };

const SENSES_LIST = ['blindsight', 'darkvision', 'tremorsense', 'truesight'];
const SENSES_LABELS = { 'blindsight': 'Percepção às Cegas', 'darkvision': 'Visão no Escuro', 'tremorsense': 'Sentido Sísmico', 'truesight': 'Visão Verdadeira' };

const DMG_TYPES = ['acido', 'concussivo', 'cortante', 'eletrico', 'frio', 'fogo', 'forca', 'necrotico', 'perfurante', 'psiquico', 'radiante', 'trovejante', 'venenoso', 'magico', 'prata', 'adamantina'];
const DMG_LABELS = { 'acido': 'Ácido', 'concussivo': 'Concussivo', 'cortante': 'Cortante', 'eletrico': 'Elétrico', 'frio': 'Frio', 'fogo': 'Fogo', 'forca': 'Força', 'necrotico': 'Necrótico', 'perfurante': 'Perfurante', 'psiquico': 'Psíquico', 'radiante': 'Radiante', 'trovejante': 'Trovejante', 'venenoso': 'Venenoso', 'magico': 'Mágico', 'prata': 'Prata', 'adamantina': 'Adamantina' };

const CONDITIONS_LIST = ['agarrado', 'amaldiçoado', 'amedrontado', 'atordoado', 'caido', 'caindo', 'cego', 'desidratado', 'desnutrido', 'doente', 'encantado', 'envenenado', 'exausto', 'incapacitado', 'inconsciente', 'invisivel', 'paralisado', 'petrificado', 'queimando', 'restrito', 'sangrando', 'silenciado', 'sufocado', 'surdo', 'surpreso', 'transformado'];
const COND_LABELS = { 'agarrado': 'Agarrado', 'amaldiçoado': 'Amaldiçoado', 'amedrontado': 'Amedrontado', 'atordoado': 'Atordoado', 'caido': 'Caído', 'caindo': 'Caindo', 'cego': 'Cego', 'desidratado': 'Desidratado', 'desnutrido': 'Desnutrido', 'doente': 'Doente', 'encantado': 'Encantado', 'envenenado': 'Envenenado', 'exausto': 'Exausto', 'incapacitado': 'Incapacitado', 'inconsciente': 'Inconsciente', 'invisivel': 'Invisível', 'paralisado': 'Paralisado', 'petrificado': 'Petrificado', 'queimando': 'Queimando', 'restrito': 'Restrito', 'sangrando': 'Sangrando', 'silenciado': 'Silenciado', 'sufocado': 'Sufocado', 'surdo': 'Surdo', 'surpreso': 'Surpreso', 'transformado': 'Transformado' };

const ARMORS_LIST = ['light-all', 'padded', 'leather', 'studded', 'medium-all', 'hide', 'chain-shirt', 'scale', 'breastplate', 'half-plate', 'heavy-all', 'ring', 'chain-mail', 'splint', 'plate', 'shield-all', 'shield'];
const ARMOR_LABELS = { 'light-all': 'Todas Leves', 'padded': 'Acolchoada', 'leather': 'Couro', 'studded': 'Couro Batido', 'medium-all': 'Todas Médias', 'hide': 'Peles', 'chain-shirt': 'Camisão', 'scale': 'Brunea', 'breastplate': 'Peitoral', 'half-plate': 'Meia-Armadura', 'heavy-all': 'Todas Pesadas', 'ring': 'Anéis', 'chain-mail': 'Cota de Malha', 'splint': 'Talas', 'plate': 'Placas', 'shield-all': 'Todos Escudos', 'shield': 'Escudo' };

const WEAPONS_LIST = ['simple-all', 'club', 'dagger', 'dart', 'greatclub', 'handaxe', 'javelin', 'light-hammer', 'mace', 'quarterstaff', 'sickle', 'spear', 'light-crossbow', 'shortbow', 'sling', 'martial-all', 'battleaxe', 'flail', 'glaive', 'greataxe', 'greatsword', 'halberd', 'lance', 'longsword', 'maul', 'morningstar', 'pike', 'rapier', 'scimitar', 'shortsword', 'trident', 'war-pick', 'warhammer', 'whip', 'blowgun', 'hand-crossbow', 'heavy-crossbow', 'longbow', 'net', 'pistol', 'musket'];
const WEAPON_LABELS = { 'simple-all': 'Todas Simples', 'club': 'Clava', 'dagger': 'Adaga', 'dart': 'Dardo', 'greatclub': 'Grande Clava', 'handaxe': 'Machadinha', 'javelin': 'Azagaia', 'light-hammer': 'Martelo Leve', 'mace': 'Maça', 'quarterstaff': 'Bordão', 'sickle': 'Foice', 'spear': 'Lança', 'light-crossbow': 'Besta Leve', 'shortbow': 'Arco Curto', 'sling': 'Funda', 'martial-all': 'Todas Marciais', 'battleaxe': 'Machado Batalha', 'flail': 'Mangual', 'glaive': 'Glaive', 'greataxe': 'Machado Grande', 'greatsword': 'Espada Grande', 'halberd': 'Alabarda', 'lance': 'Lança Montada', 'longsword': 'Espada Longa', 'maul': 'Marreta', 'morningstar': 'Maça Estrela', 'pike': 'Pique', 'rapier': 'Rapieira', 'scimitar': 'Cimitarra', 'shortsword': 'Espada Curta', 'trident': 'Tridente', 'war-pick': 'Picareta', 'warhammer': 'Martelo Guerra', 'whip': 'Chicote', 'blowgun': 'Zarabatana', 'hand-crossbow': 'Besta Mão', 'heavy-crossbow': 'Besta Pesada', 'longbow': 'Arco Longo', 'net': 'Rede', 'pistol': 'Pistola', 'musket': 'Mosquete' };

const LANGUAGES_LIST = ['common', 'dwarvish', 'elvish', 'giant', 'gnomish', 'goblin', 'halfling', 'orc', 'draconic', 'sign', 'celestial', 'abyssal', 'infernal', 'primordial', 'sylvan', 'undercommon', 'deep', 'druidic', 'thieves', 'aarakocra', 'gith', 'gnoll', 'telepathy'];
const LANG_LABELS = { 'common': 'Comum', 'dwarvish': 'Anão', 'elvish': 'Élfico', 'giant': 'Gigante', 'gnomish': 'Gnomico', 'goblin': 'Goblin', 'halfling': 'Pequenino', 'orc': 'Orc', 'draconic': 'Dracônico', 'sign': 'Libras', 'celestial': 'Celestial', 'abyssal': 'Abissal', 'infernal': 'Infernal', 'primordial': 'Primordial', 'sylvan': 'Silvestre', 'undercommon': 'Subcomum', 'deep': 'Profundo', 'druidic': 'Druídico', 'thieves': 'Gíria Ladino', 'aarakocra': 'Aarakocra', 'gith': 'Gith', 'gnoll': 'Gnoll', 'telepathy': 'Telepatia' };

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
        'charAvatarData': '',
        'mod-global-skill': 0,
        'mod-global-save': 0,
        'exhaustion-level': 0,
        'death-s1': false, 'death-s2': false, 'death-s3': false,
        'death-f1': false, 'death-f2': false, 'death-f3': false,

        // --- ADICIONE ESTAS LINHAS (Slots de Magia) ---
        'slot-1-curr': 0, 'slot-1-max': 0,
        'slot-2-curr': 0, 'slot-2-max': 0,
        'slot-3-curr': 0, 'slot-3-max': 0,
        'slot-4-curr': 0, 'slot-4-max': 0,
        'slot-5-curr': 0, 'slot-5-max': 0,
        'slot-6-curr': 0, 'slot-6-max': 0,
        'slot-7-curr': 0, 'slot-7-max': 0,
        'slot-8-curr': 0, 'slot-8-max': 0,
        'slot-9-curr': 0, 'slot-9-max': 0,
        'slot-pact-curr': 0, 'slot-pact-max': 0
        // ----------------------------------------------
    },
    checks: {}, 
    values: {}, 
    lists: { 'attacks-list': [], 'resources-list': [], 'features-list': [], 'spells-list': [], 'inventory-list': [] }
};

// Initial setup
Object.keys(SKILLS_MAP).forEach(k => defaultData.checks[`skill-${k}`] = 0);
Object.keys(SAVES_MAP).forEach(k => defaultData.checks[`save-${k}`] = false);
SENSES_LIST.forEach(k => { defaultData.checks[`sense-${k}`] = false; defaultData.values[`val-sense-${k}`] = ''; });
DMG_TYPES.forEach(k => { defaultData.checks[`res-${k}`] = false; defaultData.checks[`vul-${k}`] = false; defaultData.checks[`imm-${k}`] = false; });
CONDITIONS_LIST.forEach(k => { defaultData.checks[`cond-${k}`] = false; defaultData.checks[`imm-cond-${k}`] = false; });
ARMORS_LIST.forEach(k => defaultData.checks[`arm-${k}`] = false);
WEAPONS_LIST.forEach(k => defaultData.checks[`wpn-${k}`] = false);
LANGUAGES_LIST.forEach(k => { defaultData.checks[`lang-${k}`] = false; if(k === 'telepathy') defaultData.values[`val-lang-telepathy`] = ''; });

function debounce(func, wait) {
    let timeout;
    return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); };
}

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initListeners();
    loadData();
});

// --- MODAIS ---
function openModal(modalId) { const m = document.getElementById(modalId); if(m) m.classList.remove('hidden'); }
function closeModal(event, modalId) {
    if (!event || event.target.id === modalId || event.target.classList.contains('btn') || event.target.classList.contains('btn-close')) {
        document.getElementById(modalId).classList.add('hidden');
        renderTags(); debouncedSave(); calcMods();
    }
}
window.openModal = openModal; window.closeModal = closeModal;

// --- RENDERIZAÇÃO ---
function renderTags() {
    const safeHTML = (id, html) => { const el = document.getElementById(id); if(el) el.innerHTML = html; };
    const getVal = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
    const isChk = (id) => { const el = document.getElementById(id); return el ? el.checked : false; };

    let hS = ''; let hasS = false; SENSES_LIST.forEach(k => { if(isChk(`sense-${k}`)) { hasS=true; hS += `<span class="tag-item">${SENSES_LABELS[k]} <span class="tag-val">${getVal(`val-sense-${k}`)}ft</span></span>`; }}); safeHTML('display-senses', hasS ? hS : '<span class="empty-msg">Nenhum sentido especial.</span>');
    let hR = ''; let hasR = false; DMG_TYPES.forEach(k => { if(isChk(`res-${k}`)) { hasR=true; hR += `<span class="tag-item" style="border-color:var(--success)">${DMG_LABELS[k]}</span>`; }}); safeHTML('display-resistances', hasR ? hR : '<span class="empty-msg">Nenhuma resistência.</span>');
    let hV = ''; let hasV = false; DMG_TYPES.forEach(k => { if(isChk(`vul-${k}`)) { hasV=true; hV += `<span class="tag-item" style="border-color:var(--danger)">${DMG_LABELS[k]}</span>`; }}); safeHTML('display-vulnerabilities', hasV ? hV : '<span class="empty-msg">Nenhuma vulnerabilidade.</span>');
    let hI = ''; let hasI = false; DMG_TYPES.forEach(k => { if(isChk(`imm-${k}`)) { hasI=true; hI += `<span class="tag-item" style="background:#4a148c; border-color:#8e24aa;">🛡️ ${DMG_LABELS[k]}</span>`; }}); CONDITIONS_LIST.forEach(k => { if(isChk(`imm-cond-${k}`)) { hasI=true; hI += `<span class="tag-item" style="background:#4a148c; border-color:#8e24aa;">🚫 ${COND_LABELS[k]}</span>`; }}); safeHTML('display-immunities', hasI ? hI : '<span class="empty-msg">Nenhuma imunidade.</span>');
    let hC = ''; let hasC = false; CONDITIONS_LIST.forEach(k => { if(isChk(`cond-${k}`)) { hasC=true; hC += `<span class="tag-item" style="border-color:var(--accent); color:var(--accent);">${COND_LABELS[k]}</span>`; }}); safeHTML('display-conditions', hasC ? hC : '<span class="empty-msg">Normal.</span>');
    let hA = ''; let hasA = false; ARMORS_LIST.forEach(k => { if(isChk(`arm-${k}`)) { hasA=true; hA += `<span class="tag-item" style="${k.includes('all')?'font-weight:bold;color:var(--accent)':''}">${ARMOR_LABELS[k]}</span>`; }}); safeHTML('display-armors', hasA ? hA : '<span class="empty-msg">Nenhuma.</span>');
    let hW = ''; let hasW = false; WEAPONS_LIST.forEach(k => { if(isChk(`wpn-${k}`)) { hasW=true; hW += `<span class="tag-item" style="${k.includes('all')?'font-weight:bold;color:var(--accent)':''}">${WEAPON_LABELS[k]}</span>`; }}); safeHTML('display-weapons', hasW ? hW : '<span class="empty-msg">Nenhuma.</span>');
    let hL = ''; let hasL = false; LANGUAGES_LIST.forEach(k => { if(isChk(`lang-${k}`)) { hasL=true; let v = k==='telepathy'?` (${getVal('val-lang-telepathy')}ft)`:''; hL += `<span class="tag-item" style="color:#ce93d8; border-color:#ce93d8;">${LANG_LABELS[k]}${v}</span>`; }}); safeHTML('display-languages', hasL ? hL : '<span class="empty-msg">Nenhum.</span>');
}

// --- TABS ---
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            tab.classList.add('active');
            const target = document.getElementById(tab.getAttribute('data-tab'));
            if(target) target.classList.remove('hidden');
            if (document.body.classList.contains('read-mode')) setTimeout(resizeActiveTextareas, 10);
        });
    });
}

function toggleSkills(view) {
    const vSkills = document.getElementById('view-skills');
    const vSaves = document.getElementById('view-saves');
    const btnSkills = document.getElementById('btn-view-skills');
    const btnSaves = document.getElementById('btn-view-saves');
    if(vSkills && vSaves && btnSkills && btnSaves) {
        vSkills.classList.add('hidden'); vSaves.classList.add('hidden');
        btnSkills.classList.remove('active'); btnSaves.classList.remove('active');
        document.getElementById(`view-${view}`).classList.remove('hidden');
        document.getElementById(`btn-view-${view}`).classList.add('active');
    }
}
window.toggleSkills = toggleSkills;

// --- EXAUSTÃO ---
function modExhaustion(amount) {
    const el = document.getElementById('exhaustion-level');
    if(!el) return;
    let val = parseInt(el.value) || 0;
    val += amount;
    if (val < 0) val = 0; if (val > 6) val = 6;
    el.value = val;
    updateExhaustionUI(); debouncedSave();
}
window.modExhaustion = modExhaustion;

function updateExhaustionUI() {
    const el = document.getElementById('exhaustion-level');
    if(!el) return;
    const val = parseInt(el.value) || 0;
    const valSpan = document.getElementById('exhaustion-val');
    if(valSpan) valSpan.innerText = val;
    const texts = ["Normal", "Desvantagem em Perícias", "Deslocamento / 2", "Desvantagem Ataques/Saves", "PV Máximo / 2", "Deslocamento 0", "💀 MORTE"];
    const descEl = document.getElementById('exhaustion-desc');
    if(descEl) {
        descEl.innerText = texts[val] || "Normal";
        descEl.style.color = val === 0 ? "var(--text-muted)" : (val === 6 ? "#ff0000" : "#cf6679");
    }
}

// --- LISTENERS ---
function initListeners() {
    const recalcTriggers = ['attr-str', 'attr-dex', 'attr-con', 'attr-int', 'attr-wis', 'attr-cha', 'profBonus'];
    recalcTriggers.forEach(id => { const el = document.getElementById(id); if(el) el.addEventListener('input', () => { calcMods(); debouncedSave(); }); });

    // Adicione esta linha:
    const btnRest = document.getElementById('btnLongRest'); if(btnRest) btnRest.onclick = longRest;

    document.querySelectorAll('input, textarea').forEach(el => {
        if (!recalcTriggers.includes(el.id) && !el.id.includes('Search') && el.id !== 'jack-of-all-trades' && !el.id.startsWith('mod-global')) {
            el.addEventListener('input', () => { if (el.id.startsWith('hp-')) updateHPUI(); debouncedSave(); });
        }
    });

    const btnMode = document.getElementById('modeToggle'); if(btnMode) btnMode.addEventListener('change', (e) => toggleMode(e.target.checked));
    
    const btnAdd = (id, list, type) => { const b = document.getElementById(id); if(b) b.onclick = () => addItem(list, type); };
    btnAdd('btnAddAttack', 'attacks-list', 'attack'); btnAdd('btnAddResource', 'resources-list', 'resource'); btnAdd('btnAddFeature', 'features-list', 'feature'); btnAdd('btnAddSpell', 'spells-list', 'spell'); btnAdd('btnAddItem', 'inventory-list', 'item');

    const btnExp = document.getElementById('btnExport'); if(btnExp) btnExp.onclick = exportData;
    const btnRes = document.getElementById('btnReset'); if(btnRes) btnRes.onclick = resetData;
    const inpImp = document.getElementById('importFile'); if(inpImp) inpImp.onchange = (e) => importData(e.target);
    const btnImp = document.getElementById('btnImport'); if(btnImp) btnImp.onclick = () => inpImp.click();

    setupFilter('featureSearch', 'featureFilter', 'features-list');
    setupFilter('spellSearch', 'spellFilter', 'spells-list');
    setupFilter('inventorySearch', 'inventoryFilter', 'inventory-list');

    const chkJack = document.getElementById('jack-of-all-trades'); if(chkJack) chkJack.addEventListener('change', () => { calcMods(); debouncedSave(); });
    const gSkill = document.getElementById('mod-global-skill'); if(gSkill) gSkill.addEventListener('input', () => { calcMods(); debouncedSave(); });
    const gSave = document.getElementById('mod-global-save'); if(gSave) gSave.addEventListener('input', () => { calcMods(); debouncedSave(); });

    Object.keys(SKILLS_MAP).forEach(skill => { const el = document.getElementById(`skill-${skill}`); if(el) el.addEventListener('click', () => { let s = parseInt(el.getAttribute('data-state')) || 0; s = (s + 1) % 3; el.setAttribute('data-state', s); calcMods(); debouncedSave(); }); });
    Object.keys(SAVES_MAP).forEach(save => { const el = document.getElementById(`save-${save}`); if(el) el.addEventListener('change', () => { calcMods(); debouncedSave(); }); });

    // Modais e Checkboxes
    SENSES_LIST.forEach(k => { const e = document.getElementById(`sense-${k}`); if(e) e.addEventListener('change', debouncedSave); const ev = document.getElementById(`val-sense-${k}`); if(ev) ev.addEventListener('input', debouncedSave); });
    DMG_TYPES.forEach(k => { const r = document.getElementById(`res-${k}`); if(r) r.addEventListener('change', debouncedSave); const v = document.getElementById(`vul-${k}`); if(v) v.addEventListener('change', debouncedSave); const i = document.getElementById(`imm-${k}`); if(i) i.addEventListener('change', debouncedSave); });
    CONDITIONS_LIST.forEach(k => { const c = document.getElementById(`cond-${k}`); if(c) c.addEventListener('change', debouncedSave); const ic = document.getElementById(`imm-cond-${k}`); if(ic) ic.addEventListener('change', debouncedSave); });
    ARMORS_LIST.forEach(k => { const a = document.getElementById(`arm-${k}`); if(a) a.addEventListener('change', debouncedSave); });
    WEAPONS_LIST.forEach(k => { const w = document.getElementById(`wpn-${k}`); if(w) w.addEventListener('change', debouncedSave); });
    LANGUAGES_LIST.forEach(k => { const l = document.getElementById(`lang-${k}`); if(l) l.addEventListener('change', debouncedSave); if(k==='telepathy') { const tv = document.getElementById(`val-lang-telepathy`); if(tv) tv.addEventListener('input', debouncedSave); } });

    // Título & Avatar
    const nameInput = document.getElementById('charName');
    if(nameInput) nameInput.addEventListener('input', () => { const t = document.getElementById('page-title'); if(t) t.innerText = nameInput.value.trim() || 'Ficha de Personagem'; debouncedSave(); });
    const avatarInput = document.getElementById('avatar-upload'); const avatarImg = document.getElementById('char-avatar-img');
    if(avatarInput && avatarImg) {
        avatarInput.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (f) {
                if (f.size > 2 * 1024 * 1024) { alert("Imagem muito grande! (Max 2MB)"); return; }
                const reader = new FileReader();
                reader.onloadend = () => { avatarImg.src = reader.result; if(nameInput) nameInput.setAttribute('data-avatar', reader.result); debouncedSave(); };
                reader.readAsDataURL(f);
            }
        });
    }

    // Death Saves Listeners
    ['s1','s2','s3','f1','f2','f3'].forEach(k => {
        const el = document.getElementById(`death-${k}`);
        if(el) el.addEventListener('change', debouncedSave);
    });
}

function setupFilter(searchId, filterId, listId) {
    const update = () => filterList(searchId, filterId, listId);
    const s = document.getElementById(searchId); if(s) s.addEventListener('input', update);
    const f = document.getElementById(filterId); if(f) f.addEventListener('change', update);
}

function filterList(searchId, filterId, listId) {
    const s = document.getElementById(searchId); const f = document.getElementById(filterId); const c = document.getElementById(listId);
    if(!s || !f || !c) return;
    const txt = s.value.toLowerCase(); const cat = f.value;
    c.querySelectorAll('.dynamic-item').forEach(item => {
        const n = item.querySelector('input[name="name"]')?.value.toLowerCase() || '';
        const d = item.querySelector('textarea[name="desc"]')?.value.toLowerCase() || '';
        const k = item.querySelector('select[name="category"]')?.value || '';
        if((n.includes(txt)||d.includes(txt)) && (cat==='all'||k===cat)) item.classList.remove('hidden'); else item.classList.add('hidden');
    });
}

const debouncedSave = debounce(saveData, 500);

function saveData() {
    const data = { ids: {}, checks: {}, values: {}, lists: {} };
    for (const key in defaultData.ids) {
        if(key === 'charAvatarData') continue; 
        const el = document.getElementById(key);
        if (el) { if(el.type === 'checkbox') data.ids[key] = el.checked; else data.ids[key] = el.value; }
    }
    const imgEl = document.getElementById('char-avatar-img');
    if(imgEl && imgEl.src.startsWith('data:image')) data.ids['charAvatarData'] = imgEl.src;

    const getChk = (id) => { const el = document.getElementById(id); return el ? el.checked : false; };
    const getVal = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };

    Object.keys(SKILLS_MAP).forEach(k => { const el = document.getElementById(`skill-${k}`); if(el) data.checks[`skill-${k}`] = parseInt(el.getAttribute('data-state'))||0; });
    Object.keys(SAVES_MAP).forEach(k => data.checks[`save-${k}`] = getChk(`save-${k}`));
    SENSES_LIST.forEach(k => { data.checks[`sense-${k}`] = getChk(`sense-${k}`); data.values[`val-sense-${k}`] = getVal(`val-sense-${k}`); });
    DMG_TYPES.forEach(k => { data.checks[`res-${k}`] = getChk(`res-${k}`); data.checks[`vul-${k}`] = getChk(`vul-${k}`); data.checks[`imm-${k}`] = getChk(`imm-${k}`); });
    CONDITIONS_LIST.forEach(k => { data.checks[`cond-${k}`] = getChk(`cond-${k}`); data.checks[`imm-cond-${k}`] = getChk(`imm-cond-${k}`); });
    ARMORS_LIST.forEach(k => data.checks[`arm-${k}`] = getChk(`arm-${k}`));
    WEAPONS_LIST.forEach(k => data.checks[`wpn-${k}`] = getChk(`wpn-${k}`));
    LANGUAGES_LIST.forEach(k => { data.checks[`lang-${k}`] = getChk(`lang-${k}`); if(k==='telepathy') data.values[`val-lang-telepathy`] = getVal('val-lang-telepathy'); });
    // Death Saves
    ['s1','s2','s3','f1','f2','f3'].forEach(k => data.checks[`death-${k}`] = getChk(`death-${k}`));

    ['attacks-list', 'resources-list', 'features-list', 'spells-list', 'inventory-list'].forEach(lid => {
        const c = document.getElementById(lid); if(!c) return;
        const items = [];
        c.querySelectorAll('.dynamic-item').forEach(row => {
            const d = {};
            row.querySelectorAll('input, textarea, select').forEach(i => d[i.name] = i.type==='checkbox'?i.checked:i.value);
            items.push(d);
        });
        data.lists[lid] = items;
    });
    localStorage.setItem('dndSheetData', JSON.stringify(data));
}

function loadData() {
    const s = localStorage.getItem('dndSheetData');
    const d = s ? JSON.parse(s) : defaultData;

    // Carrega IDs (Inputs simples)
    for (const [k, v] of Object.entries(d.ids)) {
        if(k === 'charAvatarData') continue;
        const el = document.getElementById(k);
        if(el) { if(el.type === 'checkbox') el.checked = v; else el.value = v; }
    }
    
    // Carrega Imagem
    const imgEl = document.getElementById('char-avatar-img');
    if(imgEl) {
        if(d.ids.charAvatarData) imgEl.src = d.ids.charAvatarData;
        else imgEl.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
    }
    const titleEl = document.getElementById('page-title'); const nameEl = document.getElementById('charName');
    if(titleEl && nameEl) titleEl.innerText = nameEl.value.trim() || 'Ficha de Personagem';

    // Carrega Checkboxes (Perícias e Saves)
    if(d.checks) for (const [k, v] of Object.entries(d.checks)) { const el = document.getElementById(k); if(el) { if(k.startsWith('skill-')) el.setAttribute('data-state', v); else el.checked = v; } }
    
    // Carrega Valores (Inputs manuais dentro de listas)
    if(d.values) for (const [k, v] of Object.entries(d.values)) { const el = document.getElementById(k); if(el) el.value = v; }
    
    // Carrega Listas (Ataques, Magias, etc)
    for (const [lid, items] of Object.entries(d.lists)) {
        const c = document.getElementById(lid); 
        if(c) {
            // CORREÇÃO AQUI: Se for magias, não apaga tudo, limpa só o conteúdo das gavetas
            if (lid === 'spells-list') {
                c.querySelectorAll('.sg-content').forEach(div => div.innerHTML = '');
            } else {
                c.innerHTML = ''; // Para as outras listas, limpa tudo normalmente
            }

            let type = 'item';
            if(lid.includes('attack')) type = 'attack';
            else if(lid.includes('resource')) type = 'resource';
            else if(lid.includes('feature')) type = 'feature';
            else if(lid.includes('spell')) type = 'spell';
            
            items.forEach(i => renderItem(c, type, i));
        }
    }
    updateExhaustionUI(); 
    calcMods(); renderTags(); updateHPUI();
}

function calcMods() {
    const getVal = (id) => { const el = document.getElementById(id); return el ? (parseInt(el.value)||0) : 0; };
    const getChk = (id) => { const el = document.getElementById(id); return el ? el.checked : false; };

    const prof = getVal('profBonus'); const jack = getChk('jack-of-all-trades'); const jackBonus = Math.floor(prof / 2);
    const gSkill = getVal('mod-global-skill'); const gSave = getVal('mod-global-save');

    const lblGS = document.getElementById('lbl-global-skill'); if(lblGS){ lblGS.innerText = `Global: ${gSkill>=0?'+':''}${gSkill}`; lblGS.style.display = gSkill!==0 ? 'inline-block' : 'none'; }
    const lblGSave = document.getElementById('lbl-global-save'); if(lblGSave){ lblGSave.innerText = `Global: ${gSave>=0?'+':''}${gSave}`; lblGSave.style.display = gSave!==0 ? 'inline-block' : 'none'; }

    const mods = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(a => {
        const v = getVal(`attr-${a}`) || 10; const m = Math.floor((v - 10) / 2);
        mods[a] = m;
        const me = document.getElementById(`mod-${a}`); if(me) me.innerText = (m >= 0 ? '+' : '') + m;
    });

    for (const [skill, attr] of Object.entries(SKILLS_MAP)) {
        const el = document.getElementById(`skill-${skill}`);
        if(el) {
            const st = parseInt(el.getAttribute('data-state')) || 0;
            let b = mods[attr] + gSkill;
            if (st === 1) b += prof; else if (st === 2) b += (prof * 2); else if (jack) b += jackBonus;
            const ve = document.getElementById(`val-${skill}`);
            if(ve) {
                ve.innerText = (b >= 0 ? '+' : '') + b;
                if(st===2) ve.style.color='#ffd700'; else if(st===1) ve.style.color='var(--success)'; else if(jack) ve.style.color='#81d4fa'; else ve.style.color='var(--accent)';
            }
        }
    }
    for (const [save, attr] of Object.entries(SAVES_MAP)) {
        const p = getChk(`save-${save}`);
        const t = mods[attr] + (p ? prof : 0) + gSave;
        const el = document.getElementById(`val-save-${save}`);
        if(el) { el.innerText = (t >= 0 ? '+' : '') + t; el.style.color = p ? 'var(--success)' : 'var(--accent)'; }
    }
    const elPerc = document.getElementById(`skill-percepcao`); if(elPerc) { const stP = parseInt(elPerc.getAttribute('data-state')) || 0; let bP = (stP === 2) ? (prof * 2) : (stP === 1 ? prof : (jack ? jackBonus : 0)); document.getElementById('passive-perception').innerText = 10 + mods['wis'] + bP + gSkill; }
    const elInv = document.getElementById(`skill-investigacao`); if(elInv) { const stI = parseInt(elInv.getAttribute('data-state')) || 0; let bI = (stI === 2) ? (prof * 2) : (stI === 1 ? prof : (jack ? jackBonus : 0)); document.getElementById('passive-investigation').innerText = 10 + mods['int'] + bI + gSkill; }
}

function updateHPUI() {
    const c = parseInt(document.getElementById('hp-current').value) || 0;
    const m = parseInt(document.getElementById('hp-max').value) || 1;
    let p = Math.min(100, Math.max(0, (c / m) * 100));
    const b = document.getElementById('hp-bar');
    if(b) {
        b.style.width = p + '%';
        // CORREÇÃO: Força verde se for > 50%
        if (p >= 50) b.style.background = '#4caf50'; // Verde
        else if (p >= 25) b.style.background = '#ffb74d'; // Laranja
        else b.style.background = '#cf6679'; // Vermelho
    }
}
function modHP(a) {
    const el = document.getElementById('hp-current');
    if(el) { el.value = (parseInt(el.value) || 0) + a; updateHPUI(); debouncedSave(); }
}
function addItem(cid, type) {
    const c = document.getElementById(cid);
    if(c) { let cat = ''; if(type==='feature') cat='Classe'; if(type==='spell') cat='1º Círculo'; if(type==='item') cat='Geral'; renderItem(c, type, {category:cat}); saveData(); }
}

// Função auxiliar para mapear o nome da categoria (ex: "1º Círculo") para o ID da div (ex: "sg-1")
function getSpellGroupId(category) {
    if (!category || category === 'Truque') return 'sg-0';
    // Pega o primeiro número da string (ex: "1º Círculo" -> "1")
    const match = category.match(/\d+/);
    return match ? 'sg-' + match[0] : 'sg-0';
}

function renderItem(c, type, d) {
    const div = document.createElement('div'); 
    div.className = 'dynamic-item';
    
    // Função para criar o select de categorias
    // Adicionei onchange="moveSpell(this)" para detectar mudança de nível em magias
    const sel = (opts, s) => `<select name="category" class="category-select" onchange="debouncedSave(); ${type === 'spell' ? 'moveSpell(this);' : ''} filterList(this.closest('.tab-content').querySelector('.search-input').id, this.closest('.tab-content').querySelector('.filter-select').id, this.closest('.dynamic-list').id);">${opts.map(o => `<option value="${o}" ${s===o?'selected':''}>${o}</option>`).join('')}</select>`;
    
    let h = '';
    
    if (type === 'attack') {
        h = `<input type="text" name="name" placeholder="Arma" value="${d.name||''}" style="flex:2" oninput="debouncedSave()"><input type="text" name="bonus" placeholder="+Tk" value="${d.bonus||''}" style="width:50px" oninput="debouncedSave()"><input type="text" name="dmg" placeholder="Dano" value="${d.dmg||''}" style="flex:1" oninput="debouncedSave()">`;
    } 
    else if (type === 'resource') {
        h = `<input type="text" name="name" placeholder="Recurso" value="${d.name||''}" style="flex:2" oninput="debouncedSave()">
             <div style="display:flex; align-items:center; gap:2px;">
                <button class="btn-ingame btn-use-res" onclick="useResource(this)" title="Gastar 1">▼</button>
                <input type="number" name="current" value="${d.current||0}" style="width:50px" oninput="debouncedSave()">
                <span>/</span>
                <input type="number" name="max" value="${d.max||0}" style="width:50px" oninput="debouncedSave()">
             </div>`;
    } 
    else if (type === 'feature') {
        h = `<div style="width:100%">${sel(FEATURE_CATS, d.category)}<input type="text" name="name" placeholder="Nome" value="${d.name||''}" style="font-weight:bold; margin-bottom:5px" oninput="debouncedSave(); filterList('featureSearch','featureFilter','features-list');"><textarea name="desc" placeholder="Descrição..." rows="2" oninput="debouncedSave(); filterList('featureSearch','featureFilter','features-list');">${d.desc||''}</textarea></div>`;
    } 
    else if (type === 'spell') {
        h = `<div style="width:100%">
                ${sel(SPELL_LEVELS, d.category)}
                <input type="text" name="name" placeholder="Nome da Magia" value="${d.name||''}" style="font-weight:bold; margin-bottom:5px" oninput="debouncedSave(); filterList('spellSearch','spellFilter','spells-list');">
                <textarea name="desc" placeholder="Descrição..." rows="2" oninput="debouncedSave(); filterList('spellSearch','spellFilter','spells-list');">${d.desc||''}</textarea>
             </div>`;
    } 
    else if (type === 'item') {
        h = `<input type="number" name="qtd" value="${d.qtd||1}" class="qty-col" oninput="debouncedSave()"><div style="flex:1; display:flex; flex-direction:column;">${sel(ITEM_CATS, d.category)}<input type="text" name="name" placeholder="Item" value="${d.name||''}" class="name-col" oninput="debouncedSave(); filterList('inventorySearch','inventoryFilter','inventory-list');"></div>`;
    }

    div.innerHTML = h + `<button class="btn btn-danger btn-small action-col" onclick="this.parentElement.remove(); debouncedSave()">X</button>`;

    // LÓGICA DE INSERÇÃO
    // Se for Magia, não insere direto no 'c' (que é #spells-list), mas sim na sub-div correta
    if (type === 'spell') {
        const groupId = getSpellGroupId(d.category);
        const groupContainer = document.getElementById(groupId);
        if (groupContainer) {
            // Insere dentro da div .sg-content desse grupo
            groupContainer.querySelector('.sg-content').appendChild(div);
        } else {
            // Fallback se algo der errado (ex: categoria inválida), joga no Truque
            const fallback = document.getElementById('sg-0');
            if(fallback) fallback.querySelector('.sg-content').appendChild(div);
        }
    } else {
        // Outros itens (Inventário, Features, Ataques) seguem o padrão normal
        c.appendChild(div);
    }
}

// NOVA FUNÇÃO: Move a magia de grupo quando muda o dropdown
function moveSpell(selectElement) {
    const newCategory = selectElement.value;
    const itemRow = selectElement.closest('.dynamic-item');
    const newGroupId = getSpellGroupId(newCategory);
    
    const newContainer = document.getElementById(newGroupId);
    if (newContainer && itemRow) {
        newContainer.querySelector('.sg-content').appendChild(itemRow);
    }
}

window.moveSpell = moveSpell;
function exportData() { saveData(); const r=localStorage.getItem('dndSheetData'); if(!r)return; const n=JSON.parse(r).ids.charName||'Personagem'; const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([r],{type:"application/json"})); a.download=`${n.replace(/[^a-z0-9]/gi,'_')}_Ficha.json`; a.click(); }
function importData(i) { const f=i.files[0]; if(!f||!confirm("Substituir ficha?"))return; const r=new FileReader(); r.onload=e=>{try{JSON.parse(e.target.result);localStorage.setItem('dndSheetData',e.target.result);loadData();alert("Sucesso!");}catch{alert("Erro");}}; r.readAsText(f); }
function resetData() { if(confirm("Apagar tudo?")){localStorage.removeItem('dndSheetData'); location.reload();} }
function resizeActiveTextareas() { document.querySelectorAll('textarea').forEach(e=>{if(e.offsetParent!==null){e.style.height='auto';e.style.height=(e.scrollHeight+5)+'px';}}); }
function toggleMode(r) { const b=document.body; if(r){b.classList.add('read-mode');resizeActiveTextareas();}else{b.classList.remove('read-mode');document.querySelectorAll('textarea').forEach(e=>e.style.height='');} }

/* --- SISTEMA DE DESCANSO E CURA --- */

function fullHeal() {
    const max = parseInt(document.getElementById('hp-max').value) || 0;
    document.getElementById('hp-current').value = max;
    updateHPUI();
    debouncedSave();
}
// Exporta para o HTML usar no onclick
window.fullHeal = fullHeal;

function longRest() {
    if(!confirm("Realizar DESCANSO LONGO?\n\nIsso irá:\n- Recuperar toda a Vida\n- Restaurar Espaços de Magia\n- Restaurar Recursos\n- Reduzir Exaustão (1)\n- Limpar Testes de Morte")) return;

    // 1. Cura Total
    fullHeal();

    // 2. Remove PV Temporário
    const hpTemp = document.getElementById('hp-temp');
    if(hpTemp) hpTemp.value = 0;

    // 3. Renova Slots de Magia (Define Atual = Máximo)
    for(let i=1; i<=9; i++) {
        const max = document.getElementById(`slot-${i}-max`);
        const curr = document.getElementById(`slot-${i}-curr`);
        if(max && curr && max.value > 0) curr.value = max.value;
    }
    // Slot Pacto
    const pMax = document.getElementById('slot-pact-max');
    const pCurr = document.getElementById('slot-pact-curr');
    if(pMax && pCurr && pMax.value > 0) pCurr.value = pMax.value;

    // 4. Renova Recursos (Dynamic List)
    const resList = document.getElementById('resources-list');
    if(resList) {
        resList.querySelectorAll('.dynamic-item').forEach(row => {
            const rMax = row.querySelector('input[name="max"]');
            const rCurr = row.querySelector('input[name="current"]');
            if(rMax && rCurr && rMax.value > 0) rCurr.value = rMax.value;
        });
    }

    // 5. Reduz Exaustão em 1
    modExhaustion(-1);

    // 6. Limpa Testes de Morte
    ['s1','s2','s3','f1','f2','f3'].forEach(k => {
        const el = document.getElementById(`death-${k}`);
        if(el) el.checked = false;
    });

    alert("Descanso Longo concluído! Você está renovado.");
    debouncedSave();
}

/* --- SISTEMA DE USO (INGAME) --- */

// Função para diminuir recurso da lista dinâmica
function useResource(btn) {
    // Acha o input "current" que está na mesma linha do botão
    const row = btn.closest('.dynamic-item');
    const input = row.querySelector('input[name="current"]');
    if (input) {
        let val = parseInt(input.value) || 0;
        if (val > 0) {
            input.value = val - 1;
            debouncedSave();
        }
    }
}
// Exporta para o HTML
window.useResource = useResource;

// Função para diminuir Slot de Magia
function useSlot(level) {
    // Se for 'pact', o ID é diferente
    const id = level === 'pact' ? 'slot-pact-curr' : `slot-${level}-curr`;
    const input = document.getElementById(id);
    
    if (input) {
        let val = parseInt(input.value) || 0;
        if (val > 0) {
            input.value = val - 1;
            debouncedSave();
        }
    }
}
window.useSlot = useSlot;
