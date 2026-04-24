// ============================================
// TOOL 10 — 建筑信息图 (Architectural Infographic)
// 核心：实景主图 + 技术制图 + 参数表 + 施工流程
// 整图 prompt 模式 —— 一次生成完整信息图
// ============================================

// 视觉基调
const T10_STYLE_MAP = {
  darkBlackboard: {
    name: "暗色黑板风（推荐·鸟巢同款）",
    desc: "dark blackboard/chalkboard background with chalk-white technical drawings, minimal color accents from the main architectural photograph, hand-drawn annotation style, like an architect's design board presentation"
  },
  cyanBlueprint: {
    name: "蓝图工程风",
    desc: "classic cyanotype blueprint background (deep Prussian blue) with white technical line drawings, engineering drafting aesthetic, crisp technical documentation feel"
  },
  parchment: {
    name: "古籍羊皮纸",
    desc: "aged parchment/vellum paper background with sepia ink drawings, Leonardo da Vinci codex aesthetic, classical architectural treatise look, vintage scholarly quality"
  },
  museum: {
    name: "博物馆展板",
    desc: "cream/beige museum exhibition panel background with refined black and gold typography, elegant curatorial aesthetic, heritage display panel quality"
  },
  natGeo: {
    name: "National Geographic 风",
    desc: "rich warm editorial magazine layout with high-quality architectural photography as hero image, yellow accent bars, serif typography, documentary publishing aesthetic"
  },
  minimalModern: {
    name: "现代极简",
    desc: "clean white or off-white background with black geometric elements, contemporary Swiss design grid system, minimalist architectural studio aesthetic"
  },
  darkBrutal: {
    name: "暗黑混凝土",
    desc: "industrial concrete/dark graphite background with stark white technical drawings, brutalist architecture poster aesthetic, raw contemporary mood"
  }
};

// 主图氛围
const T10_HERO_MAP = {
  sunset: "golden hour sunset exterior shot, warm amber sky, long shadows, building illuminated internally with warm glow, dramatic cinematic photography",
  night: "night scene with the building illuminated against dark sky, dramatic architectural lighting, city lights in background, reflections, moody atmospheric photography",
  dawn: "dawn/early morning exterior shot, soft blue-pink sky, mist or fog around base, ethereal pristine quality, peaceful beginning-of-day mood",
  clearDay: "bright clear sunny day shot, crisp shadows, strong contrast, blue sky, crystal clear architectural photography showing full detail",
  inkPainting: "traditional ink wash painting style rendering of the architecture, not a photograph — artistic interpretation with flowing brush strokes, classical East Asian landscape painting quality",
  renderCG: "high-quality architectural CG rendering style, photorealistic but clearly digital, professional visualization quality like Vray or Corona renders",
  historicalPhoto: "vintage sepia-toned historical photograph, early 20th century camera quality, aged print look, historical documentation feel",
  aerialDrone: "aerial/drone overhead shot showing building in context with surroundings, dramatic height perspective, contemporary architectural documentation"
};

// 信息密度
const T10_DENSITY_MAP = {
  minimal: {
    name: "极简（5 模块）",
    desc: "Minimal density — include only 5 key information modules around the hero image: title block, key data table, location map, basic floor plan, 3D concept diagram. Keep plenty of negative space. Suitable for museum display or simple posters."
  },
  standard: {
    name: "标准（8 模块）",
    desc: "Standard density — 8 modules: title block, key data table, location map, design concept evolution (3 small diagrams), floor plan view, section/elevation view, structural detail, functions list."
  },
  full: {
    name: "极致（12+ 模块）",
    desc: "Maximum density — 12+ modules packed densely: title block, key data table, location map, design concept evolution, floor plan (top view with dimensions), section view with heights, elevation view, structural node detail, construction process (5-6 steps), connection details, features list, functions icons, material specifications, optional: dimensions annotation, context diagrams. This is the '鸟巢 infographic' level of density."
  }
};

// 语言
const T10_LANG_MAP = {
  bilingual: "bilingual Chinese + English throughout: building name in both, all module titles in both languages, data table in English with Chinese translations, annotations mixed. Example title: 'NATIONAL STADIUM BIRD NEST / 国家体育场（鸟巢）'",
  englishOnly: "pure English throughout, clean international documentation style",
  chineseOnly: "pure Chinese throughout, traditional vertical annotations possible, red seal stamp in corner"
};

// 文化属性
const T10_CULTURE_MAP = {
  modernContemporary: "modern contemporary architecture (20th-21st century), steel/glass/concrete, international style references",
  chineseTraditional: "Chinese traditional architecture (palace, temple, garden), timber framework, dougong brackets, curved roofs, traditional proportions and symbolism",
  westernClassical: "Western classical architecture (Greco-Roman, Gothic, Renaissance), stone masonry, columns, arches, domes, classical proportions",
  japaneseTraditional: "Japanese traditional architecture, wood construction, shoji screens, zen aesthetics, compound roofing, hiwadabuki/copper plating",
  islamicArch: "Islamic architecture, arabesque ornamentation, muqarnas vaulting, geometric patterns, domes and minarets, calligraphic inscriptions",
  industrial: "industrial/utilitarian architecture, factories, infrastructure, bridges, raw functional aesthetic",
  futuristic: "futuristic/speculative architecture, parametric design, biomimicry, sustainable-tech integration, sci-fi quality",
  fantasy: "fantasy/fictional architecture (castles, magic towers, impossible structures), imaginative worldbuilding quality"
};

// 技术图深度
const T10_TECH_DEPTH_MAP = {
  exteriorOnly: "only exterior views — hero photo and possibly one elevation drawing, no floor plans or technical sections",
  withPlanSection: "include floor plan (top view with room labels and dimensions) and section cut (side view showing heights and internal structure)",
  fullTechnical: "full technical suite: floor plan, multiple section cuts (A-A, B-B), front/side elevations, 3D axonometric, structural nodes, dimensions annotated everywhere",
  withConstruction: "full technical suite PLUS construction process timeline (5-6 steps from foundation to completion, each as a small diagram), node details, connection details, material specs"
};

// 品牌风格
const T10_BRAND_MAP = {
  architectStudio: "architect's studio presentation style — professional yet design-forward, emphasizes concept and form, like OMA/SOM/Herzog & de Meuron portfolio page",
  engineeringDoc: "engineering documentation style — emphasizes technical accuracy, structural analysis, material specifications, like a structural engineer's report",
  museumPanel: "museum exhibition panel style — educational, elegant, accessible to public, like a major museum's architecture wing display",
  natGeoMag: "National Geographic magazine style — storytelling with data, rich photography, accessible expertise, editorial publishing quality",
  heritageAtlas: "heritage site atlas style — cultural preservation documentation, historical context emphasis, UNESCO-document aesthetic",
  concept: "architectural concept presentation — focused on design intent, diagrams and metaphors, like a design firm's pitch deck"
};

function switchT10Tab(n) {
  document.querySelectorAll('#tool10 .tab').forEach((t,i) => t.classList.toggle('active', i===n));
  document.querySelectorAll('#tool10 .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
}

function setT10Preset(building, style, hero, density, lang, culture, tech, brand) {
  document.getElementById('t10BuildingInput').value = building;
  document.getElementById('t10StyleSelect').value = style;
  document.getElementById('t10HeroSelect').value = hero;
  document.getElementById('t10DensitySelect').value = density;
  document.getElementById('t10LangSelect').value = lang;
  document.getElementById('t10CultureSelect').value = culture;
  document.getElementById('t10TechSelect').value = tech;
  document.getElementById('t10BrandSelect').value = brand;
}

async function generateTool10() {
  const building = document.getElementById('t10BuildingInput').value.trim();
  if (!building) { document.getElementById('t10BuildingInput').focus(); return; }

  const customContext = document.getElementById('t10ContextInput').value.trim();
  const styleKey = document.getElementById('t10StyleSelect').value;
  const heroKey = document.getElementById('t10HeroSelect').value;
  const densityKey = document.getElementById('t10DensitySelect').value;
  const langKey = document.getElementById('t10LangSelect').value;
  const cultureKey = document.getElementById('t10CultureSelect').value;
  const techKey = document.getElementById('t10TechSelect').value;
  const brandKey = document.getElementById('t10BrandSelect').value;

  const style = T10_STYLE_MAP[styleKey];
  const hero = T10_HERO_MAP[heroKey];
  const density = T10_DENSITY_MAP[densityKey];
  const lang = T10_LANG_MAP[langKey];
  const culture = T10_CULTURE_MAP[cultureKey];
  const tech = T10_TECH_DEPTH_MAP[techKey];
  const brand = T10_BRAND_MAP[brandKey];

  document.getElementById('t10Output').classList.remove('visible');
  document.getElementById('t10Loading').classList.add('visible');
  document.getElementById('t10GenBtn').disabled = true;

  ['t10s1','t10s2','t10s3','t10s4'].forEach((id, i) => {
    setTimeout(() => document.getElementById(id).classList.add('visible'), i * 450);
  });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 7000,
        messages: [{
          role: "user",
          content: `你是一位顶级的"建筑信息图"设计师，擅长把建筑作品转化为博物馆级别的专业信息图（Architectural Infographic）。你的输出是**一次性给图像生成 AI（GPT-4o / Nano Banana / Gemini 2.0 / Flux）的完整长 prompt**——粘贴一下就出整张信息图（含实景主图 + 所有技术图 + 参数表 + 版式布局）。

═══════════════════════════════════════════
【★ 核心参考：鸟巢信息图标杆】
═══════════════════════════════════════════

最好的建筑信息图范例是"鸟巢信息图"：
- 顶部横幅：中英建筑名 + 年份 + 地理坐标
- 中央主图：黄昏/夜景实景摄影（占画面 30-40%）
- 右上角：中国地图标注位置 + 3D 结构示意
- 左侧：钢结构数据 + 节点详图
- 右侧：设计概念演进（蛋→鸟巢→体育场）+ ETFE 膜结构说明
- 中央数据块：Key Data（面积/高度/造价/建筑师等完整参数）
- 下半部：平面图 + 剖面图 + 立面图（带尺寸标注）
- 更下：5-6 步施工流程小图
- 底部：节点连接详图 + 功能图标 + 特征列表
- 整体：暗色黑板风 + 白色手绘感工程线 + 朱红印章

这种信息图的灵魂是：**大量真实技术数据 + 多视角技术制图 + 精美版式 + 实景震撼主图**。

═══════════════════════════════════════════
【★ 用户配置】
═══════════════════════════════════════════

- 建筑名: ${building}
${customContext ? '- 用户补充: ' + customContext : ''}
- 视觉基调: ${style.name} — ${style.desc}
- 主图氛围: ${hero}
- 信息密度: ${density.name} — ${density.desc}
- 语言: ${lang}
- 文化属性: ${culture}
- 技术图深度: ${tech}
- 品牌风格: ${brand}

═══════════════════════════════════════════
【★ 工作流程】
═══════════════════════════════════════════

**Step 1 · 建筑信息研究（内部执行，不暴露）**

根据"${building}"这个建筑，在你的知识里搜集以下真实数据：
- 建筑师/设计团队（lead architect + firm）
- 建造年份（开工-完工）
- 位置（城市、国家、经纬度）
- 关键尺寸（建筑面积、占地面积、高度、层数、容纳人数等）
- 造价（如果知道）
- 结构体系（material, structural system）
- 设计概念（core design idea）
- 重要历史事件或用途

如果是真实建筑，必须用真实数据。
如果是虚构建筑（如霍格沃茨、不夜城），用合理想象但标注"concept architecture"。

**Step 2 · 版式结构规划**

根据"${density.name}"决定模块数量，按"${brand}"的视觉逻辑组织布局。

**Step 3 · 生成完整长 prompt**

═══════════════════════════════════════════
【★ 一个完整"整图 prompt"必须包含】
═══════════════════════════════════════════

一段连贯的长 prompt 描述（不用 markdown 列表），包含：

1. **顶层画布声明**：Generate a large-format architectural infographic poster. Portrait orientation (2:3 or 3:4). ${style.desc}

2. **顶部标题块**：large title with building name in bold sans-serif, subtitle in Chinese/Bilingual, year range, location coordinates. Specific text example: "NATIONAL STADIUM BIRD NEST / 国家体育场（鸟巢）/ BEIJING, CHINA 2003-2008"

3. **中央英雄主图**：prominently placed architectural photograph of ${building}, ${hero}. Image is the visual anchor covering ~30-40% of canvas.

4. **位置地图**：small map of country/region with red dot marking city, GPS coordinates below

5. **Key Data 参数表**：bullet-pointed technical data with specific real numbers (gross floor area, footprint area, height, capacity, construction period, cost, architects, engineers) — use actual verified data for this building

6. **技术制图**：${tech}. Rendered in chalk-white line drawings on the dark background, blueprint-style. All drawings include dimension annotations.

7. **设计概念演进**：3-4 small conceptual diagrams showing the design idea evolution (e.g., for Bird Nest: "egg → nest → stadium")

8. **结构节点详图**：zoomed-in drawings of key structural connections, isometric views with leader lines to labels

9. **施工流程**（若配置为 withConstruction）：5-6 small diagrams showing stages from foundation to completion, numbered and captioned

10. **Features & Functions 块**：bullet list of key features + icon set for building functions (sports/concerts/events)

11. **角落印章**：small red seal stamp with Chinese character for the building

12. **整体版式**：${brand}. Grid-based layout, modular blocks, annotation lines connecting elements.

13. **风格关键词**：architectural infographic poster, technical drawing, chalk-white line drawings on dark background, mixed photography and illustration, professional architectural documentation, museum-quality presentation, ultra-detailed, 8K resolution.

═══════════════════════════════════════════
【★ 必须避免】
═══════════════════════════════════════════

❌ 主图没有真实感（必须是震撼的实景摄影或高质量渲染）
❌ 技术图凌乱/无尺寸标注（必须有专业 dimension annotations）
❌ 参数表用假数据（如果是真实建筑，必须用真实数据）
❌ 版式杂乱无章（必须 grid-based 模块化布局）
❌ 中英文混乱（按配置的语言要求执行）
❌ 过度繁琐色彩（主色调应该克制，突出技术感）
❌ 漏掉标志性元素（比如鸟巢一定要有钢结构网、故宫一定要有斗拱屋顶）

═══════════════════════════════════════════
【★ 输出格式】使用 === 分隔符：
═══════════════════════════════════════════

===EN_PROMPT===
（一段连贯的 800-1000 词英文长 prompt，所有具体内容（建筑师名字/年份/数据）都写出来，不留 [placeholder]。结尾加风格关键词。）

===ZH_PROMPT===
（400-600 字对应中文版，同样完整具体，适合可灵/即梦。）

===MODULE_LIST===
（信息图包含的模块清单，让用户知道 AI 会画什么，格式：
emoji|模块名|内容描述

示例：
🏛️|顶部标题块|建筑名中英双语 + 年份 + 坐标
🌄|中央主图|黄昏实景摄影，鸟巢夜景
📍|位置地图|中国地图标注北京
📊|Key Data|占地、高度、造价、建筑师等
📐|平面图|含尺寸 332.3m × 296.4m
📏|剖面/立面图|高度 69.2m
🔩|结构节点|钢管连接详图
🏗️|施工流程|5 步建造过程
...)

===BUILDING_FACTS===
（关于这个建筑的真实数据汇总，让用户核对 AI 有没有胡编，格式：
字段|数据

示例：
建筑师|Herzog & de Meuron (HdM)
总建筑面积|258,000 平方米
高度|69.2 m
建造年份|2003-2008
造价|约 4.23 亿美元
标志|钢结构鸟巢编织造型
）

===USAGE===
（4-6 条"•"开头使用建议：推荐 GPT-4o/Nano Banana；2:3 竖版；prompt 长时可以分两次；文字识别问题的 PS 修正建议；模块过多时可以简化配置等）

===PLATFORM===
（GPT-4o / Nano Banana / Gemini 2.0 / Flux / Midjourney 各一条参数或提示）

开始输出：`
        }]
      })
    });

    if (!response.ok) throw new Error(`API请求失败 (${response.status})`);

    const data = await response.json();
    const rawText = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    if (!rawText) throw new Error("API返回为空");

    const extract = (section) => {
      const regex = new RegExp(`===${section}===\\s*([\\s\\S]*?)(?====[A-Z_]+===|$)`, 'i');
      const match = rawText.match(regex);
      return match ? match[1].trim() : '';
    };

    const enPrompt = extract('EN_PROMPT');
    const zhPrompt = extract('ZH_PROMPT');
    const moduleList = extract('MODULE_LIST');
    const buildingFacts = extract('BUILDING_FACTS');
    const usage = extract('USAGE');
    const platform = extract('PLATFORM');

    if (!enPrompt) { console.error('Raw:', rawText); throw new Error("解析失败"); }

    const sigEn = (typeof window.getSignatureInstruction === 'function') ? window.getSignatureInstruction() : '';
    const sigZh = (typeof window.getSignatureInstructionZh === 'function') ? window.getSignatureInstructionZh() : '';

    document.getElementById('t10EnPrompt').textContent = enPrompt + sigEn;
    document.getElementById('t10ZhPrompt').textContent = (zhPrompt || enPrompt) + (zhPrompt ? sigZh : sigEn);
    document.getElementById('t10UsageGuide').textContent = usage;
    document.getElementById('t10PlatformNote').innerHTML = `<strong>◩ PLATFORM PARAMETERS</strong>${platform.replace(/\n/g, '<br>')}`;
    document.getElementById('t10OutputLabel').textContent = `◩ ${building.toUpperCase()} · INFOGRAPHIC`;

    // Render module list
    const moduleEl = document.getElementById('t10ModuleList');
    moduleEl.innerHTML = '';
    moduleList.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const parts = line.split('|').map(p => p.trim());
      const el = document.createElement('div');
      el.className = 'module-item';
      el.innerHTML = `<div class="module-icon">${parts[0] || '◩'}</div><div class="module-body"><div class="module-name">${parts[1] || ''}</div><div class="module-desc">${parts[2] || ''}</div></div>`;
      moduleEl.appendChild(el);
    });

    // Render building facts
    const factsEl = document.getElementById('t10Facts');
    factsEl.innerHTML = '';
    if (buildingFacts) {
      const factsList = document.createElement('div');
      factsList.className = 'module-list';
      buildingFacts.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
        const idx = line.indexOf('|');
        const key = line.substring(0, idx).trim();
        const val = line.substring(idx + 1).trim();
        if (key && val) {
          const el = document.createElement('div');
          el.className = 'module-item';
          el.innerHTML = `<div class="module-icon">📋</div><div class="module-body"><div class="module-name">${key}</div><div class="module-desc">${val}</div></div>`;
          factsList.appendChild(el);
        }
      });
      factsEl.appendChild(factsList);
    }

  } catch(err) {
    console.error(err);
    document.getElementById('t10EnPrompt').textContent = `❌ 生成失败\n原因: ${err.message}`;
  }

  document.getElementById('t10Loading').classList.remove('visible');
  ['t10s1','t10s2','t10s3','t10s4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('t10Output').classList.add('visible');
  document.getElementById('t10GenBtn').disabled = false;
  switchT10Tab(0);
}

function copyT10() {
  const en = document.getElementById('t10EnPrompt').textContent;
  const zh = document.getElementById('t10ZhPrompt').textContent;
  navigator.clipboard.writeText(`=== English ===\n${en}\n\n=== 中文 ===\n${zh}`).then(() => {
    const btn = document.querySelector('#tool10 .copy-btn');
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = 'Copy All', 2000);
  });
}

document.getElementById('t10BuildingInput').addEventListener('keydown', e => { if (e.key === 'Enter') generateTool10(); });
