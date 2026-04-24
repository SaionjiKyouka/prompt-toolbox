// ============================================
// TOOL REGISTRY — 在此注册所有工具
// 添加新工具时只需在这里加一项
// ============================================
const TOOLS = [
  {
    id: 'tool1',
    number: '01',
    icon: '🔬',
    title: '剖面图生成器',
    en: 'Cross-Section Infographic',
    desc: '生成百科级深度信息图提示词——树木、相机、手机内部结构、流程图解。支持博物志、赛博、WIRED杂志等7种视觉风格。',
    tags: ['科普信息图', '爆炸图', '百科级'],
    accent: '#06b6d4',
    status: 'active'
  },
  {
    id: 'tool2',
    number: '02',
    icon: '👘',
    title: '真人Cos海报',
    en: 'Cosplay × Anime Poster',
    desc: '真人Cosplay前景 + 2D动漫插画背景的混合海报提示词。内置角色知识库，自动识别标志性装束、群像配置、巴洛克暗金等7种氛围。',
    tags: ['角色海报', '混合媒介', '电影质感'],
    accent: '#c9a961',
    status: 'active'
  },
  {
    id: 'tool3',
    number: '03',
    icon: '📣',
    title: '电影化产品海报',
    en: 'Cinematic Product Manifesto',
    desc: '生成科幻叙事风格的产品海报。包含电影级主视觉、中英双语排版、功能卡片、品牌文案一站式输出。参考2001太空漫游/Her/银翼杀手等8部电影美学。',
    tags: ['产品宣言', '电影叙事', '品牌海报'],
    accent: '#ff5c1f',
    status: 'active'
  },
  {
    id: 'tool4',
    number: '04',
    icon: '📷',
    title: '真实摄影提示词',
    en: 'Film × Editorial Photography',
    desc: '专业级摄影 prompt 工程。内置 11 种胶片型号（Portra/Pro 400H/CineStill）、9 种相机机身、7 种镜头、9 种光线氛围、10 位大师风格。精确到胶卷颗粒、光比、6点光影拆解。',
    tags: ['胶片美学', '人像摄影', '专业级'],
    accent: '#f4c896',
    status: 'active'
  },
  {
    id: 'tool5',
    number: '05',
    icon: '🏯',
    title: '城市地标海报',
    en: 'City Landmark Poster',
    desc: '生成中国城市艺术海报。内置 15+ 城市真实地标数据库（广州/深圳/上海/北京等），自动识别标志性建筑。支持夜色金线/国风工笔/水墨写意/赛博霓虹等 6 种风格。',
    tags: ['城市文化', '中国风', '艺术海报'],
    accent: '#d4351c',
    status: 'active'
  },
  {
    id: 'tool6',
    number: '06',
    icon: '🌕',
    title: '仙侠角色海报',
    en: 'Xianxia Character Poster',
    desc: '生成月光仙侠角色海报——以巨型符文曼陀罗为背景，飘逸仙衣+繁复冠冕+星辉丝带为标志。10 种人物气质 × 12 种动作（奏乐/御剑/打坐/飞天等）× 8 种曼陀罗背景。',
    tags: ['仙侠', '角色肖像', '月光氛围'],
    accent: '#d8e4ff',
    status: 'active'
  },
  {
    id: 'tool7',
    number: '07',
    icon: '☠',
    title: 'IP 角色风格化海报',
    en: 'IP Character Stylized Poster',
    desc: '把任意 IP 角色（动漫/游戏/小说）迁移到完全不同的世界观。内置 10 种世界观（西部/赛博/蒸汽/民国/哥特/武侠/科幻等），自动分析角色 DNA 做保真迁移，避免 Cosplay 感。',
    tags: ['IP 二创', '世界观迁移', '角色海报'],
    accent: '#c41e1e',
    status: 'active'
  },
  {
    id: 'tool8',
    number: '08',
    icon: '✦',
    title: '东方幻想肖像',
    en: 'Oriental Fantasy Portrait',
    desc: '电影级东方幻想人物肖像。不是海报不是角色设定图，是"一张脸一个瞬间一个情绪"的艺术肖像。12 人物类型（男女老少）× 10 气质 × 10 光影氛围 × 10 发饰 × 9 色调。',
    tags: ['肖像画', '东方幻想', '电影光影'],
    accent: '#f0c560',
    status: 'active'
  },
  {
    id: 'tool9',
    number: '09',
    icon: '◎',
    title: '历史人物朋友圈',
    en: 'Historical Moments',
    desc: '一个 prompt 出一张整图——直接粘贴给 GPT-4o/Nano Banana 就能生成完整的朋友圈截图（UI+人物+文案+评论一体）。12 种世界观（历史/水浒/三国/红楼/西游/封神/聊斋/神话/武侠/民间）自动考证。',
    tags: ['穿越朋友圈', '整图 prompt', '严谨考证'],
    accent: '#6ab890',
    status: 'active'
  },
  {
    id: 'tool10',
    number: '10',
    icon: '◩',
    title: '建筑信息图',
    en: 'Architectural Infographic',
    desc: '鸟巢同款博物馆级建筑信息图生成器——震撼实景主图 + 多视角技术制图 + 参数表 + 施工流程一体生成。7 种视觉基调（黑板/蓝图/古籍/博物馆/国家地理等）× 3 信息密度。',
    tags: ['建筑信息图', '技术制图', '博物馆级'],
    accent: '#7fb4f0',
    status: 'active'
  }
];

// ============================================
// HUB — 渲染工具卡片 + 路由
// ============================================
function renderTools() {
  const grid = document.getElementById('toolsGrid');
  grid.innerHTML = '';
  TOOLS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tool-card' + (t.status === 'soon' ? ' disabled' : '');
    card.style.setProperty('--accent-color', t.accent);
    if (t.status === 'active') {
      card.onclick = () => openTool(t.id);
    }
    card.innerHTML = `
      <div class="tool-card-number">
        <span>${t.number} / ${String(TOOLS.length).padStart(2,'0')}</span>
        <span class="tool-card-status ${t.status === 'active' ? 'status-active' : 'status-soon'}">${t.status === 'active' ? '● ACTIVE' : '○ SOON'}</span>
      </div>
      <div class="tool-card-icon">${t.icon}</div>
      <div class="tool-card-title">${t.title}</div>
      <div class="tool-card-en">${t.en}</div>
      <div class="tool-card-desc">${t.desc}</div>
      <div class="tool-card-tags">
        ${t.tags.map(tag => `<span class="tool-card-tag">${tag}</span>`).join('')}
      </div>
      <div class="tool-card-footer">
        <span>ENTER</span>
        <span class="tool-card-arrow">→</span>
      </div>
    `;
    grid.appendChild(card);
  });

  // Placeholder card
  const placeholder = document.createElement('div');
  placeholder.className = 'tool-card placeholder';
  placeholder.innerHTML = `
    <div class="placeholder-plus">+</div>
    <div class="placeholder-text">MORE TOOLS<br>COMING</div>
  `;
  grid.appendChild(placeholder);
}

function openTool(id) {
  document.getElementById('hubScreen').classList.add('hidden');
  document.querySelectorAll('.tool-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goHome() {
  document.querySelectorAll('.tool-screen').forEach(s => s.classList.remove('active'));
  document.getElementById('hubScreen').classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ============================================
// GLOBAL SIGNATURE · 全局签名管理器
// ============================================
// 所有工具都可以调用 getSignatureInstruction() 获取当前签名指令，
// 并拼接到自己的 prompt 末尾。默认启用 "LHJ"。
const SIG_STORAGE_KEY = 'prompt-toolbox-signature';

function loadSignatureSettings() {
  try {
    const raw = localStorage.getItem(SIG_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return { enabled: true, text: 'LHJ' };  // 默认值
}

function saveSignatureSettings(settings) {
  try {
    localStorage.setItem(SIG_STORAGE_KEY, JSON.stringify(settings));
  } catch(e) {}
}

// 全局 API — 所有工具都用这个函数获取签名指令
// 会被拼接到 AI 生成的 prompt 后面
window.getSignatureInstruction = function() {
  const s = loadSignatureSettings();
  if (!s.enabled || !s.text || !s.text.trim()) return '';
  const text = s.text.trim();
  return ` Additionally, at the bottom-right corner of the image, add a small handwritten signature "${text}" in a natural handwritten script style, using a subtle ink or pen tone that complements the image's color palette (darker than the background, semi-transparent). The signature should look like a real artist's personal mark — unobtrusive but visible, positioned inside the image frame margin, rendered as genuine handwriting not digital typography.`;
};

// 中文版签名指令（给中文 prompt 用）
window.getSignatureInstructionZh = function() {
  const s = loadSignatureSettings();
  if (!s.enabled || !s.text || !s.text.trim()) return '';
  const text = s.text.trim();
  return `另外，在图片右下角添加一个小巧的手写签名"${text}"，采用自然的手写字体风格，用与画面色调协调的墨色或笔色（比背景稍深、半透明），看起来像真实艺术家的亲笔落款——低调但可见，位于画面内右下角边距位置，是真实手写笔迹而非数字字体。`;
};

function renderSignaturePanel() {
  const panel = document.getElementById('signaturePanel');
  if (!panel) return;
  const s = loadSignatureSettings();
  panel.innerHTML = `
    <div class="sig-header">
      <div class="sig-title">◈ Global Signature · 全局签名</div>
      <label class="sig-toggle">
        <input type="checkbox" id="sigEnabled" ${s.enabled ? 'checked' : ''}>
        <span class="sig-switch"></span>
        <span class="sig-label-text">${s.enabled ? 'Enabled' : 'Disabled'}</span>
      </label>
    </div>
    <div class="sig-body ${s.enabled ? '' : 'sig-disabled'}">
      <div class="sig-input-row">
        <label class="sig-input-label">Signature Text:</label>
        <input type="text" id="sigText" value="${s.text}" placeholder="LHJ" maxlength="20">
      </div>
      <div class="sig-preview">
        <span class="sig-preview-label">Preview:</span>
        <span class="sig-preview-text" id="sigPreview" style="font-family:'Caveat','Dancing Script',cursive">${s.text || 'LHJ'}</span>
      </div>
      <div class="sig-desc">生成的海报会在右下角自动添加手写签名落款</div>
    </div>
  `;

  // Bind events
  document.getElementById('sigEnabled').addEventListener('change', e => {
    const s = loadSignatureSettings();
    s.enabled = e.target.checked;
    saveSignatureSettings(s);
    renderSignaturePanel();
  });

  document.getElementById('sigText').addEventListener('input', e => {
    const s = loadSignatureSettings();
    s.text = e.target.value;
    saveSignatureSettings(s);
    document.getElementById('sigPreview').textContent = e.target.value || 'LHJ';
  });
}

renderTools();
renderSignaturePanel();

