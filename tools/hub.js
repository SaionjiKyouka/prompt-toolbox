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

renderTools();

