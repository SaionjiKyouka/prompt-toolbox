// ============================================
// TOOL 10 — 建筑信息图 (Architectural Infographic)
// 核心：实景主图 + 技术制图 + 参数表 + 施工流程
// 整图 prompt 模式 —— 一次生成完整信息图
// ============================================

// 主色调（独立于视觉基调，覆盖整体色温）
const T10_PALETTE_MAP = {
  coolBlue: {
    name: "🌌 黑板灰调",
    desc: "WARM DARK GREY-BROWN chalkboard master palette — dominant color is real physical blackboard (#2a2520 to #28231e), slightly warm but neutral, NOT cold navy blue, NOT pure black, NOT sepia. Hero photo can be dusk/night but the surrounding canvas stays in this chalkboard grey tone. Subtle chalk dust texture throughout. Feeling is 'architect's physical design chalkboard in a dim evening studio'."
  },
  warmGold: {
    name: "🌅 暖金黄昏",
    desc: "WARM GOLD-AMBER master palette — dominant color is warm charcoal with amber accents across the canvas. Hero photo should be golden sunset. All background tinted warm brown-amber. Feels like looking at the building in sunset glow."
  },
  forestGreen: {
    name: "🌿 暗绿黑板（古典学院）",
    desc: "DARK FOREST GREEN master palette — classic chalkboard green background (#1a2820, vintage schoolboard color). Hero photo can be any time of day. White chalk lines. Feels like an old university lecture hall's architectural chalkboard presentation."
  },
  pureNoir: {
    name: "⚫ 纯黑极简（现代主义）",
    desc: "PURE BLACK minimalist master palette — true black background (#0a0a0a), extremely minimalist, high-contrast white technical drawings. Hero photo in stark contrast, clean dramatic lighting. Feels like a luxury architectural monograph."
  },
  parchmentBrown: {
    name: "📜 羊皮纸棕（古籍风）",
    desc: "WARM PARCHMENT BROWN master palette — aged vellum/parchment background (warm tan #3a2a1a), Leonardo da Vinci codex aesthetic, sepia-brown ink drawings. Hero photo should look like an aged photograph or ink wash. Classical scholarly treatise mood."
  },
  concreteGrey: {
    name: "🏗️ 混凝土灰（工业极简）",
    desc: "COOL CONCRETE GREY master palette — neutral graphite grey (#2a2e32) throughout. Industrial brutalist mood. Hero photo in any lighting but contrasts against grey canvas. White line drawings with subtle texture."
  },
  inkWash: {
    name: "🖌️ 水墨黑白（东方古典）",
    desc: "INK-WASH BLACK-AND-WHITE palette — pure ink wash painting aesthetic. Mostly white/off-white paper background with black brush strokes for technical drawings. Hero image stylized as ink painting. Chinese scholar's treatise feel."
  }
};

// 视觉基调
const T10_STYLE_MAP = {
  darkBlackboard: {
    name: "暗色黑板风（推荐）",
    desc: "REAL CHALKBOARD background color — WARM DARK GREY-BROWN (#2a2520 to #28231e, like actual school blackboard), NOT cold navy blue, NOT pure black, NOT sepia brown. The surface has subtle chalk dust texture and slight uneven tone variation like a real chalkboard. Hero photograph blends via soft vignette into this warm-dark-grey background. Chalk-white technical line drawings with subtle roughness. Minimal warm color accents only from the hero photo itself. Overall mood: architect's physical chalkboard in a dim studio, warm-dark but not blue, not brown-red"
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

// 主图氛围 — HIGH-ANGLE 俯视 + 浅蓝/淡蓝天空（不是深蓝，不是深海军蓝）
const T10_HERO_MAP = {
  night: "HIGH-ANGLE AERIAL architectural photograph at BLUE HOUR (just after sunset). Camera positioned ABOVE, looking DOWN. ★ SKY IS LIGHT POWDER BLUE ★ — soft airy luminous blue (like a #6b9dd4 - #8ec5e8 range), NOT deep navy, NOT dark blue, NOT midnight blue. Think pale early-evening sky where stars are barely starting to appear. A THIN STRIP of warm peach/orange sits at the very horizon (15% of sky area). Blue dominates but it's LIGHT and AIRY, not heavy. Sky occupies 50% of photograph. The sky should feel WEIGHTLESS — visually lighter than the building. Building backlit against the luminous pale-blue. NOT pitch-black. NOT a worm's-eye shot",
  
  sunset: "HIGH-ANGLE AERIAL architectural photograph at golden hour. Camera ABOVE looking DOWN. ★ UPPER SKY IS LIGHT POWDER BLUE ★ — soft airy pale blue (#8ec5e8 range), NOT deep navy, NOT dark blue. Lower horizon strip (15-20% of sky) has warm golden-orange sunset. The pale blue upper sky is the main atmosphere. Sky occupies 50%. BRILLIANTLY GLOWING, sky visually LIGHTER than building. Avoid muddy warm-dominated or navy-heavy skies. NOT a worm's-eye shot",
  
  dawn: "HIGH-ANGLE AERIAL architectural photograph at dawn. Camera ABOVE looking DOWN. ★ SKY IS PALE LIGHT BLUE ★ with soft peach-pink only at horizon (lower 15%). Upper sky is luminous light powder blue with wispy clouds — feels like first light, airy and weightless. Sky occupies 50%, VERY BRIGHT. Building 40% emerging from dawn light. NOT murky, NOT dark, NOT deep-toned",
  
  clearDay: "HIGH-ANGLE AERIAL architectural photograph on bright clear day. Camera ABOVE looking DOWN. BRILLIANT LIGHT SKY BLUE with DETAILED WHITE CUMULUS CLOUDS occupies 50%. Sky is a LIGHT pale vibrant blue (like a clear spring afternoon), NOT deep navy. Light-toned, high-exposure. Building 40% with crisp shadows. NOT a worm's-eye shot",
  
  inkPainting: "HIGH-ANGLE overhead view in traditional ink wash painting style. NOT photograph. Soft LIGHT-toned atmospheric sky occupies 50% with pale wash gradients — light blue-ink washes dominate, minimal warm tones. Building silhouette from above 40%. Classical East Asian aerial landscape — LIGHT, AIRY, pale-toned",
  
  renderCG: "HIGH-ANGLE AERIAL photorealistic CG rendering. Camera above looking down. BRILLIANT LIGHT POWDER BLUE sky with HDR atmospheric layers occupies 50%. Pale blue cool-toned sky (NOT navy). Building 40%. Professional architectural visualization. NOT upward perspective",
  
  historicalPhoto: "HIGH-ANGLE AERIAL vintage sepia photograph looking down. Sky occupies 50% with luminous cloud details (sepia-tinted but the sky still feels bright and airy, not muddy). Building 40%. Aged but LUMINOUS print quality. NOT a ground-level upward shot",
  
  aerialDrone: "DRAMATIC AERIAL DRONE photograph from high altitude or 45-degree angle. ★ LIGHT PALE BLUE sky ★ with dramatic HDR cloud layers occupies 50% — light-toned blue, not deep navy. Sky is MUCH BRIGHTER than building. Building full shape visible 40%. Ground context 10%. Contemporary drone photography — light pale blue gives visual lightness"
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

function setT10Preset(building, style, palette, hero, density, lang, culture, tech, brand) {
  document.getElementById('t10BuildingInput').value = building;
  document.getElementById('t10StyleSelect').value = style;
  if (palette) document.getElementById('t10PaletteSelect').value = palette;
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
  const paletteKey = document.getElementById('t10PaletteSelect').value;
  const heroKey = document.getElementById('t10HeroSelect').value;
  const densityKey = document.getElementById('t10DensitySelect').value;
  const langKey = document.getElementById('t10LangSelect').value;
  const cultureKey = document.getElementById('t10CultureSelect').value;
  const techKey = document.getElementById('t10TechSelect').value;
  const brandKey = document.getElementById('t10BrandSelect').value;

  const style = T10_STYLE_MAP[styleKey];
  const palette = T10_PALETTE_MAP[paletteKey];
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
          content: `你是一位顶级的**建筑美学海报艺术家**，不是普通信息图设计师。你的作品被博物馆收藏、被设计杂志封面引用，是介于"科学档案"与"艺术品"之间的高级创作。你的输出是**一次性给图像生成 AI（GPT-Image-2 / GPT-4o / Nano Banana / Gemini 2.0 / Flux）的完整长 prompt**——粘贴一下就出一张可以挂在建筑师工作室墙上的震撼艺术品。

═══════════════════════════════════════════
【★★★★★ 美学宣言（必须首先建立正确心态）】
═══════════════════════════════════════════

你**不是**在做：
  ❌ 数据报表
  ❌ 教学图示
  ❌ 工程说明书
  ❌ 信息清单

你**是**在做：
  ✅ 建筑艺术海报
  ✅ 博物馆级艺术品
  ✅ 建筑师的诗意设计笔记
  ✅ 一件让人想挂在墙上的作品

━━━━━━━━━━━━━━━━━━━━━━━━

【核心哲学 · 珠宝法则】

信息图里的**数据和注释 = 昂贵的珠宝**：
  • 必须真实（不能虚假）
  • 必须丰富（不能少）
  • 但本质是**装饰**（不是主角）

真正要展示的是：
  ✦ 建筑的**精确与恢宏**之美
  ✦ 科技与美学的**震撼融合**
  ✦ 整张画面的**视觉冲击力**
  ✦ 一种让观者心跳加速的**艺术感染力**

"没人真的会认真研究一张小图上的数据 —— 
 数据的存在是为了支撑那种'精确感'的氛围，
 就像珠宝的意义不在于让人数克拉，而在于让整个人闪耀。"

━━━━━━━━━━━━━━━━━━━━━━━━

【美学优先级排序（从高到低）】

1. 🎭 **画面整体震撼力**（最高优先级）
    → 一眼看上去"哇"的那种感觉
    → 精确感 × 恢宏感 × 温度感

2. 🏛️ **主图的美学质量**
    → 主图不是一张普通照片
    → 是一张建筑艺术摄影
    → 值得单独挂在墙上

3. 📐 **版式的优雅节奏**
    → 留白、层次、呼吸感
    → 精致紧凑 + 大片留白的平衡

4. 💎 **注释的手稿气质**
    → 像建筑师凌晨 3 点在工作室
      黑板上写下的设计笔记
    → 有人的温度、情绪、专业

5. 📊 **数据的真实准确**（必须有，但是装饰层）
    → 数据真实正确
    → 但**不是**画面的主角

━━━━━━━━━━━━━━━━━━━━━━━━

【创作心态转换】

❌ 旧心态："我要把这个建筑的所有数据都塞进去"
✅ 新心态："我要让这张图震撼到让人想收藏"

❌ 旧心态："12 个模块越多越好"
✅ 新心态："宁可少一两个模块，也要画面大气"

❌ 旧心态："每个模块都要清晰完整"
✅ 新心态："画面节奏比模块完整更重要"

❌ 旧心态："数据是主角"
✅ 新心态："美学是主角，数据是珠宝"

━━━━━━━━━━━━━━━━━━━━━━━━

【灵魂关键词】（贯穿整个 prompt）：
architectural poetry · 建筑之诗
visual symphony of precision and grandeur · 精确与恢宏的视觉交响
architect's midnight design notes · 建筑师的深夜设计笔记
museum-quality art piece · 博物馆级艺术品
emotionally charged yet technically precise · 情感充沛且技术精确
awe-inspiring composition · 令人震撼的构图

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
【★★★ 艺术指导五铁律（最高优先级，决定观感好坏）】
═══════════════════════════════════════════

这是区分"高级建筑信息图"和"拼贴表格"的关键。

━━━━━━━━━━━━━━━━━━━━━━━━
【铁律 1 · 主图 = Hero Shot（英雄主图）】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 错误：主图小小的被塞进一个方框里，占画面 15-20%
✅ 正确：主图是绝对视觉焦点，占画面 **35-45%**

  • 主图必须是最震撼的角度（常用 3/4 低角度仰望 or 黄昏俯瞰）
  • 主图必须有戏剧性光影（黄昏金光 / 夜景霓虹 / 晨雾烟云）
  • 主图的天空和周围环境**要够丰富**（不只是建筑本身）
  • 主图像 National Geographic 封面级别的摄影大片
  • 主图尺寸：跨整个画布宽度的 75-90%，高度占画布 25-30%

提示词关键词：hero photograph, cinematic architectural photography,
dramatic lighting, magazine-cover quality, fills most of the upper-middle canvas

━━━━━━━━━━━━━━━━━━━━━━━━
【铁律 2 · 色彩渗透（一体化背景）】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 错误：纯黑背景 + 彩色照片硬贴在中间 = 贴纸感
✅ 正确：整张海报的背景色**被主图的色调"浸染"**

具体实现：
  • 主图的主色调（黄昏金红 / 夜景蓝紫 / 晨雾灰蓝）
    要"染"到整张画布
  • 画布背景不是纯黑，而是**主图色调的深色版**
    例：黄昏主图 → 整张海报背景是深红紫调（不是纯黑）
    例：夜景主图 → 整张海报背景是深蓝紫调（不是纯黑）
  • 主图边缘要**柔化融入**背景，不要硬方框切割
    使用 vignette edges / soft gradient / atmospheric blend
  • 文字和技术图"漂浮"在这个统一背景上

提示词关键词：unified atmospheric background tinted by hero image,
soft vignette edges blending photo into canvas, single coherent color story,
NO hard rectangular photo frames, painterly edge fade

━━━━━━━━━━━━━━━━━━━━━━━━
【铁律 3 · 视觉层级分明】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 错误：所有模块大小接近，平均分布 = 报表感
✅ 正确：大中小三级分明，有呼吸和节奏

视觉权重分配：
  主图：60% 的视觉权重（最大最亮最抓眼）
    ↓
  Key Data 参数表 + 设计概念演进：20% 权重（中等尺寸）
    ↓
  技术图（平面/剖面/立面）+ 施工流程：15% 权重（较小）
    ↓
  角标印章 + 功能图标 + 细节：5% 权重（点缀）

**模块之间必须有留白**。不要填满每一寸画布。
让读者的视线**先被主图吸住**，再自然流转到技术图。

提示词关键词：clear visual hierarchy, hero image dominates,
supporting modules have breathing room, intentional negative space,
NOT evenly distributed grid, asymmetric editorial layout

━━━━━━━━━━━━━━━━━━━━━━━━
【铁律 4 · 标题海报级设计】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 错误：小号字体，和其他文字差不多大
✅ 正确：**超大粗体英文主标题**，海报级震撼

具体要求：
  • 英文主标题：粗体 sans-serif，字号占画布宽度 40-60%
  • 设计：有明显的边框 / 下划线 / 强调色
  • 标题块要占据 header 的视觉焦点
  • 副标题（中文名 / 年份 / 坐标）小字在主标题下方

参考效果：类似 National Geographic / Monocle 杂志封面的标题排版

提示词关键词：massive bold sans-serif English title dominating the header,
oversized typography, editorial magazine-cover quality,
title occupies 40-60% of header width, distinctive framing or underline

━━━━━━━━━━━━━━━━━━━━━━━━
【★★★★★ 铁律 5 · 锋利明亮的超细线条（不是粉笔！）】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 严重错误：AI 画出粉笔涂鸦感的粗线
✅ 必须做到：**像头发丝一样细 + 像 LED 灯一样亮的白线**

★★★ 完全忘记"chalk"这个词，这不是粉笔画！★★★
这是**精密工程制图**的美学 + 一点点手绘温度。

【强制要求】：

1. 📏 **线条必须极细**：0.5-1.5px 的发丝级细线
   ❌ 绝对不要 2-4px 的粗线
   ❌ 绝对不要看起来"钝"的笔触
   ✅ 必须像**极细的针管笔**或**Apple 产品线稿**

2. ✨ **线条必须极亮**：纯白 + 发光感
   ❌ 不是米白、暗白、灰白
   ✅ 纯白 #FFFFFF，在深色背景上**看起来像在发光**
   ✅ 像白色霓虹灯的亮度
   ✅ 像激光笔的锋利感

3. 🎯 **风格类比**（AI 必须理解）：
   ✅ **Apple 技术插图**（产品剖面图的那种细线）
   ✅ **Dieter Rams 的技术手册**
   ✅ **Le Corbusier 的建筑图纸**
   ✅ **Dan Flavin 霓虹艺术**的亮度
   ✅ **MUJI 产品说明书**
   ❌ 不是小学黑板粉笔字
   ❌ 不是儿童蜡笔画
   ❌ 不是厚重的毛笔字
   ❌ 不要任何"texture"或"roughness"

4. 💎 **手绘温度只体现在**：
   • 线条**末端**的极微妙渐细（几乎看不出）
   • 连接处的极小自然不完美
   • **绝对不是**粗糙的笔触质感

【关键词强调】：
EXTREMELY THIN lines (0.5-1.5px stroke width),
BRILLIANTLY BRIGHT pure white (#FFFFFF) lines,
lines that GLOW like LED or neon against dark background,
Apple product illustration precision,
Dieter Rams technical manual aesthetic,
Swiss engineering drawing quality,
laser-sharp precision lines,
NOT thick / NOT chalky / NOT rough / NOT textured,
FORGET the word "chalk" — this is precision illustration,
NO "chalk-texture" effects whatsoever

━━━━━━━━━━━━━━━━━━━━━━━━
【★★★ 铁律 6 · OVERLAY 压叠构图（最核心，决定是不是"专业建筑档案"）】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 错误理解 · "上下堆叠"布局（扁平报纸感）：
  ┌──────────────┐
  │ 顶部信息条    │ 独立一条，和主图完全分离
  ├──────────────┤
  │ 主图单独一层  │ 主图下面又是一条分割线
  ├──────────────┤
  │ 下方信息      │
  └──────────────┘

✅ 正确理解 · "OVERLAY 压叠 + 天空入画"布局（专业建筑海报）：
  ┌──────────────┐
  │ ░░░░天空░░░░ │ ← 主图上半是大片明亮天空（占画布 25%）
  │ TITLE 叠标题 │ ← 标题叠在天空上
  │ ░░░░天空░░░░ │
  │──────────── │
  │ 🏟️ 建筑主体 │ ← 建筑占画布 20%（俯视看到全貌）
  │  LOC    3D  │ ← 信息块叠在建筑两侧
  │──────────── │ ← 主图总共占画布 50%
  │ KEY | CONC  │ ← 下半部 50% 是信息区
  │ PLAN  SEC   │
  │ 施工流程    │
  │ 图标+印章   │
  └──────────────┘

【天空占比的重要性 · 整张图"大气"的核心】：
原版鸟巢信息图"感觉不黑"的秘密不是背景色浅，
而是主图上半部是大片明亮天空！
天空的亮色和下方信息区的暗色形成 1:1 平衡，画面就显得恢宏大气。

【OVERLAY 压叠的具体规则】：

━━━━━━━━━━━━━━━━━━━━━━━━
【★★★ 三层纯净叠加结构（重要澄清！）】
━━━━━━━━━━━━━━━━━━━━━━━━

注释 OVERLAY 不是"半透明黑色便签贴图"，而是纯白粉笔字/线条！

正确的三层结构：

  ┌────────────────────────────────┐
  │ 📝 L3 · 最上层：纯白注释层        │
  │    所有文字、标注、边框、引线     │
  │    ✅ 纯白色轮廓 / 白色文字       │
  │    ❌ 绝对没有任何黑色填充底      │
  │    ❌ 绝对没有半透明背景          │
  │    就像粉笔直接在画面上写/画       │
  ├────────────────────────────────┤
  │ 📸 L2 · 中间层：主图              │
  │    浮在深色背景上                 │
  │    边缘柔化融入背景（vignette）    │
  │    不需要任何外框                 │
  ├────────────────────────────────┤
  │ 🟫 L1 · 最底层：深色黑板背景      │
  │    暖灰深棕 #2a2520              │
  │    填满整张画布                   │
  └────────────────────────────────┘

就像真实的建筑师黑板教学：
  1. 黑板本身是深色的（L1）
  2. 上面贴一张建筑照片（L2）
  3. 老师拿粉笔直接在照片和黑板上写字画线（L3）

粉笔字**没有背景框**，是白色直接写在下方画面上。
画到照片上的粉笔字，**也没有框**，白线条直接压在照片上。
这才是真正的**建筑师黑板美学**，不是 PPT 贴图感！

━━━━━━━━━━━━━━━━━━━━━━━━

1. 📸 **主图覆盖整个画面上半部** (**必须严格占画布 60%**，不是 50% 不是 45%)
   主图**延伸到画布最顶端**，没有"顶部信息条"独立存在
   主图横跨全宽 100%（没有左右留白）
   
   ★★★★★ 最高级别强制要求：
   主图 MUST fill TOP 60% of canvas height. 
   Measure it: from pixel 0 to pixel (canvas_height * 0.6).
   That entire zone IS the hero photograph.
   
   ❌ If you make hero 40% → WRONG
   ❌ If you make hero 50% → STILL WRONG
   ✅ Hero MUST be 60%. Measure and verify.
   
   如果模块塞不下，**减少模块数量，或者缩小每个模块**，
   绝对不要压缩主图！
   
   【主图内部的内容分配】（按画布百分比）：
   - 上部 0-30% (占画布 30%)：**大片明亮通透的天空**
     天空必须**明亮、有云层细节、有大气渐变**，视觉亮部
     ★ 天空决定整张画面的"大气感"
   - 中部 30-52% (占画布 22%)：**建筑主体**
     视角必须是俯视/半俯视/航拍！绝对不要仰视！
   - 下部 52-60% (占画布 8%)：**地面/城市/水面倒影**
     过渡到下方的信息区
   
   下方信息区只剩 40%（60-100%）—— 必须把所有模块压缩到这里。

2. 🏷️ **标题直接叠在主图的天空部分** (0-10% 区域)
   标题是**白色大字**，叠在主图顶部的天空上
   副标题 · 年份 · 坐标也叠在这一带

3. 🗺️ **顶部 OVERLAY 信息块叠在主图右上角** (10-20% 顶部右侧)
   Location 地图 + 3D 结构示意
   纯白线条，无背景框，直接叠在主图天空上

★★★ 4. 🔬 **主图左右两侧的压叠数据区**（非常重要 · 之前漏掉）
   主图的左右两侧（15-55% 垂直范围）也压有数据块：
   
   左侧：钢结构数据 / 材料参数 + 关键构件详图
   右侧：签名结构详图（如 ETFE 分层） + 次要技术详图
   
   这些数据**直接画在主图的天空/建筑旁**，
   纯白极细线条（0.5-1.5px），无背景框。
   
   ✨ 关键好处：数据块住在主图上，不占下方空间！
   → 主图 60% 占比保持
   → 信息量反而更多
   → 画面更丰富更渗透

5. 📊 **信息模块从 60% 开始** (60-100%，只占 40% 空间 · 严格分 3 层)
   下半部完整 40% 留给信息区，**严格 3 层**：
   
   ★ Layer 1 (60-80% · 20% 高度)：概念+技术图带
     DESIGN CONCEPT (30%) + 三视图并排 (70%)
     **KEY DATA 已在主图左侧压叠，不在这里！**
   
   ★ Layer 2 (80-90% · 10% 高度)：施工流程
     5-6 个小图横排
   
   ★ Layer 3 (90-100% · 10% 高度)：底部混合带
     节点 + 特征 + 功能图标 + 印章
   
   因为 KEY DATA 这个"大块"移到了上部，下部可以更紧凑！

═══════════════════════════════════════════

【视角的铁律】：
主图的相机角度必须是：
  ✅ AERIAL（航拍，完全俯视）
  ✅ HIGH-ANGLE（半俯视，45 度角）
  ✅ BIRD'S-EYE VIEW（鸟瞰）
  ❌ 绝对不要 WORM'S-EYE（仰视蹲拍）
  ❌ 绝对不要 GROUND LEVEL（平视地面）
  
因为只有俯视视角才能让天空大量入画，
仰视只会看到建筑的暗面，没有天空。

═══════════════════════════════════════════

【画布尺寸严格要求】：
**画布比例必须是 2:3 竖版**（比如 1024×1536 或 1200×1800），
**绝对不要 9:16 或更瘦长的比例**！

═══════════════════════════════════════════

【OVERLAY + 天空入画 关键词】：
HIGH-ANGLE aerial architectural photograph fills upper 60% of canvas,
SKY occupies 50% of the hero photo (30% of total canvas height),
building appears in full form from above NOT from below,
title text overlaid on sky portion,
location and structural blocks overlaid on hero photo as EXTREMELY THIN BRIGHT WHITE PRECISION LINE DRAWINGS (0.5-1.5px, like Apple product illustration) with NO fill, NO semi-transparent backing — just luminous fine white outline frames and crisp white text directly on the sky,
lower 50% of canvas contains all information modules,
balanced composition with bright sky top half vs dark info bottom half,
strict 2:3 portrait aspect ratio

━━━━━━━━━━━━━━━━━━━━━━━━
【★★★★★ 铁律 7 · 错落构图节奏（必须做到，不是推荐）】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 错误：所有模块大小接近、等宽均分 = 九宫格 Excel 感
✅ 正确：大小错落 + 节奏对比 = 建筑师在黑板上的真实创作

★★★ 这是强制要求，不是建议 ★★★
画面必须呈现 visible size contrast，让一眼看去就有"大中小"三个层级。

━━━━━━━━━━━━━━━━━━━━━━━━
【具体布局示意 · 请严格照此比例】

下半部信息区（占画布 60-100%，40% 高度，严格 3 层）：

★ Layer 1 · 概念+技术图带（60-80% · 20% 高度）：
★ 注意：KEY DATA 已移到主图左侧压叠区，这里没有！
┌──────────────────────────────────────────┐
│ DESIGN    │ PLAN    │  SEC  │  ELEV       │
│ CONCEPT    │         │       │             │
│ (30% 宽)   │    (70% 宽 · 三视图并排)      │
│ 演进图示   │ 40%     │ 35%   │ 25%         │
│           │         │       │             │
└──────────────────────────────────────────┘
★ 只有 CONCEPT + 三视图，没有 KEY DATA（它在上面）

★ Layer 2 · 施工流程（80-90% · 10% 高度）：
┌──────────────────────────────────────────┐
│ ┌──┐  ┌─┐   ┌──┐ ┌──┐  ┌──┐  ┌─┐        │
│ │1 │→│2│ → │3│→│4│ → │5│ →│6│          │
│ └──┘  └─┘   └──┘ └──┘  └──┘  └─┘        │
│  大   小     大   大    中    小           │
└──────────────────────────────────────────┘
  6 个尺寸 0.8x-1.2x 变化，箭头长度也不同

★ Layer 3 · 混合底带（90-100% · 10% 高度）：
┌──────────────────────────────────────────┐
│ NODE │ FEATURES │ FUNCTIONS 图标        │印 │
│ 节点  │ 特征      │ ☆ ⚽ 🎵 📷 🎭          │章 │
└──────────────────────────────────────────┘
  四象限：节点+特征+功能图标+印章

━━━━━━━━━━━━━━━━━━━━━━━━
【强制规则 · 一条都不能违反】

1. ★ **KEY DATA 必须是整张图最大的数据块**
   占下方数据带左侧 40-50% 宽度
   高度较高（因为内容多）

2. ★ **右边小块必须错位堆叠**（offset stacking）
   不要垂直对齐！
   第 1 块靠右边
   第 2 块向左偏移一点
   第 3 块再偏移回来
   形成"手摆"的随机感

3. ★ **技术图三视图绝不等宽**
   PLAN 40% → SECTION 35% → ELEVATION 25%
   宽度递减，高度也不同

4. ★ **施工流程 6 个小图大小有别**
   至少 20% 的尺寸差异
   不能全一样大

5. ★ **留白必须存在**
   有些地方紧凑，有些地方宽松
   模块之间 gap 不要均匀

━━━━━━━━━━━━━━━━━━━━━━━━

【错落构图关键词】（必须在最终 prompt 里包含）：
MANDATORY size variation between modules,
KEY DATA block is 2x larger than concept diagrams,
three technical drawings MUST have different widths (40%/35%/25%),
construction process icons have 0.8x-1.2x size variation,
small blocks are OFFSET-STACKED not vertically aligned,
architect's sketchbook feel with organic placement,
NEVER uniform grid, NEVER equal-sized columns, NEVER PowerPoint template

━━━━━━━━━━━━━━━━━━━━━━━━
【★★★★★ 铁律 8 · 流动布局 · 无硬分界 · 无闭合边框】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 严重错误：主图和信息区有硬分界，每个模块四周都有闭合白框
   = 画面变成 Excel 表格 / 数据库图集 / PPT 分栏

✅ 正确：整张画布是连续的氛围场，模块之间用**细线/留白/角装饰**轻柔分隔
   = 画面像建筑师的手稿笔记本 / 艺术海报

━━━━━━━━━━━━━━━━━━━━━━━━
【规则 A · 主图和信息区没有硬分界】

❌ 错误的三段式切割：
  [主图区 60%]
  ═══════════  ← 硬分界线
  [信息区 40%]

❌ 错误的"黑色入侵"渗透：
  [主图上部]
  ▓▓▓ 黑色向上蔓延 ▓▓▓  ← 错！主图被吞没
  [信息区]

✅ 正确的"亮色延伸"渗透：
  [主图主体区 0-60% —— 天空+建筑**完整明亮**]
  [过渡渗透带 60-65% —— 主图的地平线/城市/水面**亮色向下延续**
                        亮色融入黑板顶部，而不是黑色向上扩张]
  [纯黑板区 65-100% —— 技术图、施工流程、功能图标]

**关键做法**：
- 主图的**亮色内容向下延伸**（城市剪影、水面反光等）
- 不是**黑色往上侵蚀主图**（禁止！）
- 主图 60% 以上区域保持**完全明亮**，不变暗
- 只有 60-65% 的 5% 过渡带是"亮色渐隐到黑板"
- 让 KEY DATA 或 DESIGN CONCEPT 这类**中等模块的顶部**
  可以**压在这个过渡带上**（它们压在主图的亮色延续部分）
- 不要在主图和信息区之间画水平分割线
- 过渡要**自然渗透**，像水墨晕染

━━━━━━━━━━━━━━━━━━━━━━━━
【规则 B · 模块之间用弱分隔，不用闭合边框】

❌ 错误的 Excel 单元格式：
  ┌──────────────┐
  │  KEY DATA    │  ← 四周都有完整白框
  └──────────────┘
  ┌──────────────┐
  │  DESIGN      │  ← 每个都是闭合矩形
  └──────────────┘

✅ 正确的笔记本式分区：
  KEY DATA · 关键数据
  ─────────────────      ← 只有顶部一条细线作为标题下划线
  [数据内容......]
  
                         ← 用留白分隔
  
  DESIGN CONCEPT
  ─────────────────      ← 下一模块又一条线
  [内容......]

【具体分隔方式（至少用 3 种以上混合）】：
  1. **标题下的短细线**（标题下方一条 1px 细线 = 最常用）
  2. **L 形角装饰**（只在模块的左上角和右下角画个小角）
  3. **单边线**（只在模块左侧画一条竖线 · 或顶部画一条横线）
  4. **纯留白**（完全不画框，靠间距区分）
  5. **微妙的背景色变化**（极细微，几乎看不出）

**严禁**：
  ❌ 每个模块画完整的闭合矩形框
  ❌ 所有模块都用同一种分隔方式
  ❌ 像 PPT 表格那样整齐对齐的方框

━━━━━━━━━━━━━━━━━━━━━━━━
【规则 C · 画面如一张笔记本，不是一堆格子】

想象一本**建筑师的精装手稿本**摊开的一页：
- 有一张大幅实景摄影贴在上半
- 旁边有手写的笔记标题
- 下面有些小图、数据表、流程
- 模块之间用**手画的细线、留白、引线**自然分隔
- **绝对不会**每段都用方框框住
- **整页是一张画**，不是一堆贴纸

━━━━━━━━━━━━━━━━━━━━━━━━

【流动布局关键词】（必须在最终 prompt 里包含）：
FLOWING COMPOSITION with NO hard dividers between hero and info zones,
hero photo transitions organically into info area,
some info modules may overlap/intrude into lower hero area,
module separation uses ONLY: title underlines, corner marks, single edge lines, or whitespace — NEVER closed rectangular frames,
architect's sketchbook aesthetic with organic page-flow,
NOT Excel spreadsheet grid, NOT PowerPoint template, NOT boxed modules,
ONE continuous painterly canvas with soft transitions

━━━━━━━━━━━━━━━━━━━━━━━━
【★★★★★ 铁律 9 · 信息筛选原则（珠宝法则的执行规范）】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 错误：AI 怕数据不够专业，到处塞参数，很多重复、很多过度
✅ 正确：数据像珠宝 · 精选而不堆砌 · 优雅而不暴发

【三原则】：

★ 原则 1 · 无重复 NO REDUNDANCY
  每个数据点在整张图只出现一次
  
  ❌ 错误示例：
    • KEY DATA 里有 "Primary Material: Q460"
    • STEEL STRUCTURE 块里又有 "Steel Grade: Q460"  ← 重复！
    • 引导线标 "Q460 STEEL" 指向钢管  ← 又重复！
    
  ✅ 正确做法：
    • Q460 只出现在 KEY DATA 的 PRIMARY MATERIAL 一次
    • STEEL STRUCTURE 块不再写 Q460，只写独特的 42,000 吨 / 360 公里
    • 引导线只指向部位，不复述已有数据

★ 原则 2 · 无过度 NO OVER-DETAIL
  排除施工级超细节，保留设计级参数
  
  ❌ 过度的施工级细节（不要！）：
    • 焊缝厚度（WELD THROAT 16mm）
    • 螺栓型号（M36 HIGH-STRENGTH BOLTS）
    • 壁厚（WALL THICKNESS 50-100mm）
    • 箱型截面尺寸（BOX SECTION 800×400mm at nodes）
    这些是给施工队看的，不是给信息图观众看的
    
  ✅ 保留的设计级参数：
    • 总建筑面积 / 总造价 / 建筑高度 / 座位数
    • 总用钢量 / 总管长 / 材料等级 / 跨度
    • 建筑师 / 结构工程师 / 竣工年份
    这些有"故事感"和"设计感"，是观众想知道的

★ 原则 3 · 有层次 LAYERED HIERARCHY
  不同位置承载不同类型的信息，不互相重复
  
  KEY DATA 表（主图左上压叠，占 6-8 行）：
    → 基本参数：面积/高度/座位/造价/建筑师/材料等级
  
  左侧中部 OVERLAY：
    → 只放"独特亮点数据"（如 42,000 吨 + 360 公里）
    → 2-3 行，绝不重复 KEY DATA
  
  左侧下部 OVERLAY：
    → 一个关键构件**图示**（不是一堆数据）
    → 只标 1 个核心尺寸（如 Ø800-1200mm）
  
  右侧三层：结构亮点图 + 性能参数 + 节点图示
    → 每一块只做一件事
    → 节点图只标 1 个核心尺寸，不要焊缝/螺栓/板厚

━━━━━━━━━━━━━━━━━━━━━━━━

【珠宝法则的视觉检验】：
想象用户把图发给朋友，朋友会惊呼"好看"，然后
**不会真的一行一行去读数据**。
数据的作用是**营造专业感**，不是让人学习技术。
就像博物馆里贵金属的说明牌——
"Tiffany · 黄金 · 1920" 三个词足够，
不会写"纯度 99.7% · 焊接温度 1064°C"那种。

━━━━━━━━━━━━━━━━━━━━━━━━

【信息筛选关键词】（必须在最终 prompt 里包含）：
curated information, NO redundancy (each data point appears exactly ONCE across the entire poster),
NO construction-level over-detail (no weld sizes, no bolt grades, no wall thicknesses, no nodal plate thicknesses),
preserve only design-level parameters (area, height, capacity, cost, material grade, architects, span),
every data point is unique and purposeful, data serves aesthetic not engineering,
like a luxury museum label — elegant curation not information hoarding,
less is more when each piece is meaningful

═══════════════════════════════════════════
【★ 用户配置】
═══════════════════════════════════════════

- 建筑名: ${building}
${customContext ? '- 用户补充: ' + customContext : ''}
- 视觉基调: ${style.name} — ${style.desc}
- 【★★★ 主色调（最高优先级，决定整张画布的色温）】: ${palette.name}
  ${palette.desc}
- 主图氛围: ${hero}
- 信息密度: ${density.name} — ${density.desc}
- 语言: ${lang}
- 文化属性: ${culture}
- 技术图深度: ${tech}
- 品牌风格: ${brand}

【色调最终裁决】
如果视觉基调和主色调描述有冲突，**以【主色调】为准**。主色调是决定整张画布色温的最高指令，不能违反。
例如：如果主色调选"冷蓝夜空"，则即使主图氛围选了"黄昏"，整张画布背景色也必须是冷蓝调，主图的黄昏只能作为**局部暖色点缀**融入冷蓝大环境中。

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

1. **画布声明**：Generate a STRICT 2:3 portrait architectural infographic poster (1024×1536 or 1200×1800, NEVER 9:16 or more elongated). ${palette.desc} ${style.desc}. The composition uses INTEGRATED OVERLAY layout — **HERO PHOTOGRAPH FILLS ENTIRE UPPER 60% OF CANVAS** (NOT 50%, NOT 45%, MUST BE 60%), with title and small info blocks OVERLAID directly on the photograph. Lower 40% of canvas is a compact modular information area. BALANCED composition: bright sky-dominated hero fills upper portion, dark info modules packed into the bottom 40%.

2. **【0-60% 主图上半部 · 俯视+天空主导】** — ${hero}. ★★★ ABSOLUTE CRITICAL RULES ★★★: (a) The photo extends from top edge of canvas to **60% height** (not 50%!), spanning full width 100%. (b) Within the photo: SKY occupies the upper 50% of the photo = **30% of total canvas height**, with BRIGHT LUMINOUS clouds/lighting creating vibrant visual anchor. Building occupies middle ~37% of the photo = 22% of total canvas, viewed from HIGH ANGLE looking DOWN (showing full form, not just façade). Ground/city/reflection occupies lower ~13% of the photo. (c) NO ground-level upward shots — camera MUST be positioned above the building. The BRIGHT LUMINOUS sky is essential — must be vibrant with detailed cloud structures and atmospheric gradient, NOT muddy or dark. Magazine-cover quality cinematic photography.

3. **【叠加在主图上的 OVERLAY】**:
   - **TITLE OVERLAY** (left 50% of top, 0-12% canvas height): **massive bold sans-serif English title in WHITE directly on the sky portion** — like "NATIONAL STADIUM / BIRD NEST". No background box. Below: smaller Chinese subtitle + year range + GPS coordinates + lead architect name.
   - **LOCATION BLOCK OVERLAY** (middle-top, ~50-72% width, 0-15% height): small rectangular info block drawn in EXTREMELY THIN BRIGHT WHITE PRECISION LINES on the sky — hairline white outline frame (no fill!), containing finely-drawn country map with red dot, crisp white text for city name (bilingual), coordinates, scale bar. NO dark background, NO semi-transparent fill — sky shows through between luminous fine white lines, like Apple technical illustration overlaid.
   - **STRUCTURAL SYSTEM BLOCK OVERLAY** (top-right, ~72-100% width, 0-15% height): EXTREMELY THIN BRIGHT WHITE PRECISION LINE drawing on the sky — hairline white outline frame with no fill, containing 3D isometric wireframe in luminous fine white lines (0.5-1.5px stroke), with delicate white leader lines labeling primary/secondary elements. NO dark backing — laser-sharp precision white lines directly on the photograph's sky, like Swiss engineering illustration.

   ★★★ **【LEFT-SIDE OVERLAY · 主图左侧压叠区 · 三层堆叠】** (left 0-25% width, 15-55% canvas height) ★★★
   The LEFT side of the hero photo has THREE stacked info blocks overlaid as pure white precision line drawings (ALL with leader lines to building):
   
   ★★★★★ Upper-left (15-32% height): **KEY DATA TABLE 关键数据** ← 核心位置！
   The KEY DATA table MUST live HERE on the hero photo, NOT in the lower info zone!
   Contains real architectural parameters (6-9 rows):
     - Gross Floor Area / 总建筑面积
     - Footprint / 占地面积
     - Building Height / 建筑高度
     - Seating Capacity / 座位数
     - Construction Period / 建造周期
     - Construction Cost / 造价
     - Lead Architects / 主建筑师
     - Structural Engineer / 结构工程师
     - Primary Material / 主要材料
   Title "KEY DATA / 关键数据" with thin white underline.
   Two-column bilingual format. All in extremely thin bright white (0.5-1.5px).
   NO background box, NO frame — just text floating on the sky like chalk notes.
   
   Middle-left (32-44% height): **STEEL STRUCTURE HIGHLIGHTS 钢结构亮点**
   Title + only 2 UNIQUE specs NOT already in KEY DATA (e.g., "TOTAL QUANTITY: 42,000 TONNES", "TOTAL LENGTH: ≈360 KM"). 
   ★ Do NOT repeat Q460 or other data that's in KEY DATA ★
   Only unique, signature facts go here.
   
   Lower-left (44-55% height): **KEY COMPONENT DETAIL** — one small isometric wireframe of a key component (e.g., steel tube cross-section), with ONE dimension label only (e.g., "Ø 800-1200mm"). NO wall thickness, NO box section dimensions, NO over-detailed specs — just the signature measurement.
   
   ★★★★★ **CRITICAL: LEADER LINES 引导线（节制使用）** ★★★★★
   Use leader lines SPARINGLY — ONLY 3-4 signature leader lines total across the whole hero photo, NOT one per data row. This prevents visual clutter.
   
   【引导线选择原则】：
   - KEY DATA 表整块 → 选 1-2 条最代表性的（如 HEIGHT → 屋顶， FOOTPRINT → 地面平台）
   - STEEL STRUCTURE HIGHLIGHTS → 选 1 条（如 STEEL QUANTITY → 钢结构网）
   - KEY COMPONENT DETAIL → 1 条（从构件图指向建筑对应部位）
   - 右侧的 ETFE → 1 条（指向屋顶）
   - 右侧的 NODE → 1 条（指向节点）
   
   Total across the whole poster: 4-6 leader lines MAXIMUM.
   
   ❌ NOT every single data row has its own leader line (that's clutter)
   ✅ Only SIGNATURE facts get leader lines — the rest stay as quiet text lists
   
   Lines are 0.5-1px thin white with a small end-dot on the building. Purely visual accents, not repeated annotation.

   ★★★ **【RIGHT-SIDE OVERLAY · 主图右侧压叠区 · 三层堆叠】** (right 75-100% width, 15-55% canvas height) ★★★
   Three stacked blocks on the right side:
   
   Upper-right (15-30% height): **SIGNATURE STRUCTURE DETAIL** (e.g., ETFE CUSHION 3-layer exploded view with labels: OUTER FILM / AIR CUSHION / INNER FILM). Thin white precision drawing with leader line to roof.
   
   Middle-right (30-42% height): **STRUCTURE SPECS 技术参数** (e.g., "ROOF COVERAGE: 42,000 m²", "CUSHION INFLATION: 250-350 Pa", "LIGHT TRANSMISSION: 92%"). 3-4 key numerical specs.
   
   Lower-right (42-55% height): **NODE DETAIL 节点详图** — one small isometric wireframe of a structural node with ONE signature dimension (e.g., "Ø1200 node"). NO weld thickness, NO bolt grade, NO plate thickness — just the one signature measurement. Leader line pointing to a node on the building.
   
   ★ Right-side: ONE leader line from ETFE block to the roof, ONE from NODE block to a visible node. Total 2 leader lines on right side. NO leader lines from every data row.

   **所有 overlay 的视觉统一**：all overlays are drawn as EXTREMELY THIN BRIGHT WHITE PRECISION LINES (0.5-1.5px), NO filled backgrounds, NO semi-transparent panels — pure line-art and text directly on the photograph, like Apple technical illustration. The sky/photo shows through between white lines. Every data/detail has a leader line connecting to its corresponding building element.

   **★★★ KEY DATA 的位置是左上 OVERLAY，不是下部 ★★★**：
   This matches the Bird Nest reference approach — the big data table lives ON the hero photo (left side), NOT stacked below it. This lets the lower info zone stay compact (only CONCEPT + technical drawings + process + footer), preventing the lower zone from becoming too tall.

   ★★★★★ **【HERO EXTENDS DOWNWARD · 主图向下延伸进黑板区】 · 消除硬分割线** ★★★★★
   
   ⚠️ 关键方向：是**主图（亮色）延伸进黑板（暗色）**，
                  NOT 黑板（暗色）侵蚀主图（亮色）！
   
   ❌ 严重错误理解：让主图底部"变暗" → 黑色向上扩张 → 整张图变黑
   ✅ 正确做法：让主图的亮色内容**延续向下** → 亮色渗入黑板 → 整张图保持明亮
   
   具体做法：
   - 主图的**BRIGHT CITY SILHOUETTE / HORIZON / GROUND / REFLECTIONS**
     从 60% 边界**向下延续**到 60-65% 的过渡带
   - 过渡带里：主图的城市剪影和地面反射**依然可见**，只是与黑板慢慢融合
   - 黑板的深色**不要向上蔓延到主图里**！主图的建筑和天空必须**完整保留明亮**
   - 只有 60% 以下的**小小过渡带**（仅 5% 区域）是"亮色渐隐到黑板"
   - 60% 以上的主图区域保持**完全明亮**，没有任何变暗
   
   可以理解为：
   "The hero photo's bright bottom portion 'bleeds' a few pixels 
   DOWN into the chalkboard. The chalkboard's darkness does NOT 
   climb UP into the hero photo. The direction is always 
   LIGHT-FLOWING-DOWNWARD, never DARK-RISING-UPWARD."
   
   NEVER darken the hero photo itself. NEVER let black fog 
   creep into the building or sky. The hero stays BRIGHT 
   throughout its full 60% zone.
   
   These overlay blocks float ON the hero photograph's sky, letting the photo's sky colors show through semi-transparency.

★★★ 下半部 40% 的结构是严格的 3 层 · 不是 4 层 · 不是 2 层 ★★★

★★★★★ CRITICAL · 技术术语不可出现在图上 ★★★★★
以下的 "LAYER 1/2/3" 标签是**给你(AI)的内部结构说明**，用来告诉你分几层。
**绝对不要在生成的图上出现 "LAYER 1" "LAYER 2" "LAYER 3" 或 "Layer 1/2/3" 这些字样！**
图上只显示模块自己的标题（如 "DESIGN CONCEPT"、"CONSTRUCTION PROCESS"），
**不要加 "Layer" 前缀**，也**不要合并模块为 "LAYER 3: KEY FEATURES & FUNCTIONS"** 这种大标题！

4. **【60-80% LAYER 1 · 概念+技术图带 CONCEPT+TECHNICAL BAND（占画布 20%）】** 
   **重要：KEY DATA 已经放在主图左侧压叠区了，不要在这里重复！**
   **图上显示 "DESIGN CONCEPT" 不要 "LAYER 1: DESIGN CONCEPT"！**
   
   这一层只包含 DESIGN CONCEPT + 技术三视图，横向并排：
   
   横向分 2 列（宽度 30% / 70%）：
   - 左列 (0-30% 宽度)：**DESIGN CONCEPT 设计概念演进**
     标题 "DESIGN CONCEPT / 设计概念" + 细下划线
     3-4 个小图示，从上到下，箭头连接
     显示形态演化（例如：蛋 → 编织 → 鞍面 → 最终形态）
     无闭合边框
   
   - 右列 (30-100% 宽度)：**三视图横排并排**
     PLAN (宽 40% 占整列) + SECTION (宽 35%) + ELEVATION (宽 25%)
     每张用细线+标题分隔，没有闭合框
     全部用 0.5-1.5px 极细白色精密线绘制
   
   ★ 因为 KEY DATA 移到上部了，这一层可以更矮（比之前更"瘦"），
     下部整体因此变短，画面更平衡。

5. **【80-90% LAYER 2 · 施工流程 CONSTRUCTION PROCESS（占画布 10%）】**
   **图上显示 "CONSTRUCTION PROCESS / 施工时序"，不是 "LAYER 2: ..."！**
   
   5-6 个小图横向排列，中间用细箭头线连接
   **尺寸差异要明显**（0.7x - 1.3x 范围，不是 0.8-1.2x 的细微差别）
   **形态要有明显区分**：
     - 早期阶段（#1-2）是方形基础/桩基/梁柱状（不是圆环）
     - 中期阶段（#3-4）是局部结构逐渐合龙（半圆或部分圆环）
     - 后期阶段（#5-6）才是完整圆环加膜结构
     
   避免所有 6 个小图都画成"完整圆环 × 6"——那样观众看不出进度差异！
   
   每个小图下方标注年份+阶段名（中英双语）
   整层顶部有 "CONSTRUCTION PROCESS / 施工时序" 小标题 + 细下划线
   **没有闭合边框**，小图们直接漂在黑板上

6. **【90-100% LAYER 3 · 混合底带 FOOTER BAND（占画布 10%）】**
   **不要给这一层一个合并的大标题！各小模块有自己的小标题：**
   **"STEEL NODE / 节点" · "KEY FEATURES / 特征" · "FUNCTIONS / 功能"**
   **绝不要写 "LAYER 3: KEY FEATURES & FUNCTIONS" 这种合并标题！**
   
   横向 4 区：
   - 最左 (0-20%)：STEEL NODE / 节点详图 小 3D 示意
   - 左中 (20-45%)：KEY FEATURES / 特征要点 项目列表（小字 + 短下划线标题）
   - 右中 (45-80%)：FUNCTIONS 功能图标 一排（4-5 个精细线条图标 + 双语标签）
   - 最右 (80-100%)：朱红印章（圆形，中文字）
   
   各区之间用**留白或单条竖线**分隔，不是闭合框
   所有元素直接漂在黑板背景上

**★ 严禁把技术三视图单独做成一层 ★**
**★ 严禁下半部超过 3 层 ★**
**★ 下半部总高度绝不超过画布的 40% ★**
**★ 严禁在图上出现 "LAYER 1/2/3" 或 "Layer 1/2/3" 这种技术术语字样 ★**

8. **整体风格关键词**：BALANCED composition with LIGHT POWDER BLUE sky (NOT deep navy — pale airy #6b9dd4-#8ec5e8 range) and warm-dark-grey chalkboard lower section, HIGH-ANGLE aerial architectural photograph with LIGHT AIRY BLUE sky occupying EXACTLY 30% of canvas height (sky visually LIGHTER than building, weightless atmosphere), sky with rich cloud details, building in full form viewed from above NOT below, HERO PHOTO STAYS FULLY BRIGHT throughout its 60% zone, warm-dark-grey chalkboard background (#2a2520) for lower 40%, INTEGRATED OVERLAY layout with title + top info blocks + **SIDE DATA BLOCKS with KEY DATA in upper-left of hero (NOT in lower zone)** + **SPARING LEADER LINES (4-6 total maximum, not one per data row — just signature connections)**, **HERO'S BRIGHT CONTENT EXTENDS DOWNWARD** into the chalkboard (light-flowing-down, not dark-rising-up), CURATED INFORMATION with NO redundancy and NO construction-level over-detail (no weld/bolt/wall-thickness), design-level parameters only, **NO "LAYER 1/2/3" or "Layer 1/2/3" technical labels ever appear on the poster** — only module titles like "DESIGN CONCEPT", "CONSTRUCTION PROCESS", "KEY FEATURES", "FUNCTIONS", **CONSTRUCTION PROCESS stages have DISTINCT FORMS** (early: square foundation/piles, mid: partial rings, late: complete rings+membrane — not 6 identical rings), strict 2:3 portrait aspect ratio, EXTREMELY THIN BRIGHT WHITE PRECISION LINES (0.5-1.5px, laser-sharp, NO chalk texture), precision drafting quality like Apple product illustration / Swiss engineering, architect's physical design board aesthetic, ONE CONTINUOUS CANVAS, museum-quality presentation, ultra-detailed, 8K resolution.

═══════════════════════════════════════════
【★ 必须避免（根据 v10.1 升级新增 5 大陷阱）】
═══════════════════════════════════════════

❌ 主图没有真实感（必须是震撼的实景摄影或高质量渲染）
❌ 技术图凌乱/无尺寸标注（必须有专业 dimension annotations）
❌ 参数表用假数据（如果是真实建筑，必须用真实数据）
❌ 版式杂乱无章（必须 grid-based 模块化布局）
❌ 中英文混乱（按配置的语言要求执行）
❌ 过度繁琐色彩（主色调应该克制，突出技术感）
❌ 漏掉标志性元素（比如鸟巢一定要有钢结构网、故宫一定要有斗拱屋顶）

❌❌❌ 十大观感杀手（根据艺术指导铁律）：

1. 主图偏小：主图占画面少于 40% → 整张图变成"数据表+小插图"
   ✅ 主图必须占画布上半部 50%（从顶部开始）

2. 贴纸感：主图被硬方框切割，贴在纯黑背景上
   ✅ 主图延伸到顶边缘；信息块压在主图上；下方才是黑板背景

3. 平均主义：所有信息模块大小差不多，没有层级
   ✅ 大（主图）→ 中（数据/概念）→ 小（技术细节）→ 点缀（图标）
   
4. 标题太小：和正文差不多大，没有海报感
   ✅ 英文主标题超大粗体，白色，叠在主图天空部分

5. 工程图太"干净"：像 CAD 电脑图，没有手绘温度
   ✅ 有微妙的粉笔手绘质感，线条微微不完美

6. 分层堆叠布局：顶部信息带独立一条 + 主图独立一层 + 下方信息独立
   ✅ 主图填充上半部作为背景，标题和 Location/Structural 块
      以**纯白粉笔线条**直接叠加在主图上
      （绝对没有半透明黑底 · 没有填充框 · 只有白色轮廓和白字）

7. 画布太长：输出了 9:16 这种瘦长比例
   ✅ 严格 2:3 比例（1024×1536 或 1200×1800），不能更长

8. 背景颜色偏冷蓝或偏棕：不是真实黑板色
   ✅ 真实黑板色是"暖灰深棕"（#2a2520），不是蓝不是棕

9. ★★★ 仰视拍摄：镜头在建筑下方往上看 → 看不到天空
   ✅ 必须 HIGH-ANGLE / AERIAL / BIRD'S-EYE 俯视
      只有俯视才能拍到大片天空入画

10. ★★★ 主图里建筑占满，天空很少
    ✅ 天空必须占主图的 50%（= 画布的 25% 高度）
       这是"画面大气"的关键 —
       明亮天空(25%) + 建筑(20%) + 下方信息(50%) = 平衡构图

11. ★★★★ 注释有半透明黑底 / 带填充的信息框（PPT 贴图感）
    ❌ 错误：LOCATION 块 = [黑色半透明框 + 白字] 贴在主图上
    ✅ 正确：LOCATION 块 = 纯白轮廓线 + 白色线条地图 + 白字
            直接写画在主图上，**没有任何黑色填充底**
            天空从线条之间完全透出
    
    核心：注释层 = 粉笔字在黑板上
          不是 = 便签贴在照片上

12. ★★★★ 把工具当成"信息展示工具"而非"艺术海报"
    ❌ 错误心态："把建筑数据都塞进去才专业"
    ✅ 正确心态："这是艺术品，数据是珠宝（装饰），美学才是主角"
    
    宁可少一两个模块，也要整体画面震撼大气。

13. ★★★★ 所有模块同尺寸 · 均分网格 · 九宫格感
    ❌ 错误：KEY DATA 和小概念图一样大，三视图等宽并排
    ✅ 正确：大块+中块+小块组合，1x/1.5x/2x 对比明显
            错位堆叠、留白节奏、箭头粗细变化
            像建筑师在黑板上的真实手绘布局
            
    核心：画面如爵士乐（强弱切分），不是电子节拍器（均匀敲击）

14. ★★★★★ 主图占比不够 50%（AI 老爱偷工减料到 40-45%）
    ❌ 错误：主图被标题/地图/结构示意挤压
    ✅ 正确：主图铁定 50% 画布高度
            如果模块塞不下，宁可减少模块也不能压主图
            天空决定大气感——天空太小整张图就完蛋

15. ★★★★★ 天空暗沉闷（只有单调橙色或纯黑）
    ❌ 错误：sunset 画成一片暗橙色糊糊
    ❌ 错误：night 画成纯黑
    ✅ 正确：天空必须**明亮、通透、有云层细节、有大气渐变**
            sunset = 从蓝到橙的渐变 + 层次丰富的云彩
            night = 蓝紫色 blue hour（不是漆黑）
            明亮天空是整张图"不黑"的关键

16. ★★★★★ 白线太粗太暗 · 粉笔涂鸦感
    ❌ 错误：AI 理解"chalk texture"画出粗钝毛糙的笔触
    ✅ 正确：**锋利的细线 + 明亮的白色**
            1-2px 细线，不是 3-5px 粗线
            像 Apple 产品线稿 / Swiss 精密工程图
            在深色背景上应该"发光"一样清晰
            手绘温度只是"极微妙的不完美"，不是真的毛糙

17. ★★★★★ 模块用闭合矩形边框（Excel 格子感）
    ❌ 错误：每个信息模块四周都画完整白框，像表格单元格
    ✅ 正确：只用 **细标题下划线 / 角装饰 / 留白** 分隔
            绝对不要画闭合矩形框
            画面要像建筑师的手稿笔记本，不是 Excel 表

18. ★★★★★ 主图和信息区之间硬分界
    ❌ 错误：主图下面画一条水平线，然后下方是独立的信息区
    ✅ 正确：主图自然过渡到信息区
            KEY DATA 等模块的顶部可以**压在主图的地面/城市背景上**
            形成"渗透"效果，不是"切割"

19. ★★★★★ 下半部拆成 4 层（导致信息区过高，主图被压缩）
    ❌ 错误：数据层 + 技术图层（独立）+ 施工层 + 底部层 = 4 层
           每层都有高度 → 总共占 45%+ → 黑色太多
    ✅ 正确：参考图是严格 3 层！
           Layer 1 (20%)：KEY DATA + CONCEPT + 三视图 **全部并排一层**
           Layer 2 (10%)：施工流程
           Layer 3 (10%)：节点+特征+功能+印章
           总共 40%，和主图 60% 平衡
           
    **关键点：技术三视图不单独一层！和 KEY DATA 并排！**

20. ★★★★★ 忽略了主图左右两侧可以压叠数据（漏掉空间）
    ❌ 错误：只在主图顶部和下方放信息，两侧天空空着
    ✅ 正确：主图的左右两侧（15-55% 垂直范围）也要压叠数据块！
    
    左侧：钢结构数据（如 QUANTITY 42,000T, LENGTH 360KM）
          + 构件详图（如 STEEL TUBE 管径/厚度）
    右侧：签名结构详图（如 ETFE CUSHION 三层分解）
          + 次要技术详图
    
    这些数据**直接画在主图两侧的天空/建筑旁**，
    用纯白细线，无背景框，像建筑师在天空旁写的注解。
    
    关键好处：
    • 数据住在主图上，不占下方空间
    • 主图 60% 占比保持
    • 信息总量更多
    • 画面渗透感更强

21. ★★★★★ 天空不够亮（AI 默认画得太暗）
    ❌ 错误：sunset 画成暗红闷调 / night 画成深黑
    ✅ 正确：**天空必须比建筑更亮**（天空是画面的光源）
            用 BRILLIANT / GLOWING / OVEREXPOSED / HIGH-EXPOSURE HDR
            像电影 HDR 高光，接近过曝
            整张画面上半部分要有发光感

22. ★★★★★ 主图和下方之间有明显水平分割线
    ❌ 错误：主图在 60% 处被硬切，下面是黑板区，中间一条线
    ✅ 正确：主图底部 55-65% 是"渐变渗透区"
           • 主图底部逐渐变暗，融入黑板背景
           • 没有清晰的水平切割线
           • 下方模块顶部可以"咬"进主图底部
           • 整张画布是一张连续的画

23. ★★★★★ 压叠数据块没有引导线（disconnected from building）
    ❌ 错误：数据块孤立漂在主图旁，和建筑无关联
    ✅ 正确：每个压叠数据都有 LEADER LINE 引导线
           • 极细白线（0.5-1px）从数据指向建筑对应部位
           • 线末端有小点或箭头
           • 像医学解剖图 / 建筑师 call-out 标注
           • "STEEL TUBE Ø800" → 引导线指向建筑上的钢管
           • "NODE PLATE t=40mm" → 引导线指向节点
           
    没有引导线 = 数据和建筑没关系 = 业余感
    有了引导线 = 数据解释建筑的某个部位 = 专业感

24. ★★★★★ 渗透方向反了（黑色向上侵蚀主图）
    ❌ 严重错误：AI 理解"主图底部变暗"
               → 黑色从下方向上蔓延
               → 主图的建筑被吞没在黑雾里
               → 整张图变黑 · 上部信息被挤小
    
    ✅ 正确方向：**亮色向下延伸，不是暗色向上侵蚀**
               → 主图的城市/地面/反射等**亮色内容**向下延续
               → 进入 60-65% 的过渡带
               → 亮色融入黑板顶部
               → 黑板的黑色**绝不能**向上爬进主图
    
    口诀：
      "LIGHT flows DOWN, DARK stays DOWN"
      "亮色向下延伸，暗色绝不上扬"

25. ★★★★★ KEY DATA 表放在下部而不是主图压叠
    ❌ 错误：KEY DATA 是下部的最大块（6-9 行数据）
           → 下部第一行被拉高 20%+
           → 整张图变得下半部过高
           → 主图 60% 被挤压
    
    ✅ 正确：KEY DATA **必须放在主图左侧压叠区（15-32% 垂直范围）**
           参考图就是这么做的
           下部的 Layer 1 只有 CONCEPT + 三视图
           大大压缩下部高度
    
    左侧三层压叠：
      Upper-left (15-32%): KEY DATA 表 ← 核心
      Middle-left (32-44%): STEEL 结构数据
      Lower-left (44-55%): 构件详图
    
    右侧三层压叠：
      Upper-right: 签名结构（ETFE 分解）
      Middle-right: 技术参数
      Lower-right: 节点详图
    
    这样下部 Layer 1 只剩"CONCEPT + 三视图"，自然变瘦

26. ★★★★★ 天空用橙红主导（视觉重量重 · 压抑）
    ❌ 错误：sunset 做成"整片橙红 + 少许蓝"
           暖色饱和度高 → 视觉重量重
           与下部黑色对比 → 整张图压抑
    
    ✅ 正确：天空必须**蓝色主导，暖色只在地平线**
           upper sky = vibrant blue
           horizon strip (lower 20%) = warm orange
           冷色让画面轻盈、通透
           与黑色下部对比时有"漂浮感"

27. ★★★★★ 天空蓝色太深（变成深海军蓝，又回到压抑）
    ❌ 错误：AI 把 "blue-dominated" 理解成"深蓝 deep navy"
           → 深蓝其实接近黑色
           → 整张图又变暗了
    
    ✅ 正确：**浅蓝 / 淡蓝 / 晨光蓝**（light powder blue）
           • 像 #6b9dd4 或 #8ec5e8 的柔和淡蓝
           • 像春日晴空远景 / 黎明破晓
           • NOT deep navy, NOT midnight blue, NOT dark blue
           • 浅蓝才是真正"发光"的色温
    
    类比：
      深蓝 ≈ 黑色 (视觉上压抑)
      浅蓝 = 通透 (视觉上漂浮)
      就像婴儿蓝/天空蓝/粉蓝才是真正"亮"的蓝

28. ★★★★★ 信息冗余 · 数据重复出现（暴发户感）
    ❌ 错误：怕专业不够，到处重复塞数据
           • KEY DATA 写了 Q460
           • STEEL 块又写 Steel Grade: Q460
           • 引导线又标 Q460 STEEL
           • HEIGHT 在 KEY DATA，又在引导线上写 HEIGHT 69.2m
    
    ✅ 正确：每个数据只出现一次
           • KEY DATA 里已有 → 其他地方不再提
           • 引导线只指向建筑部位，不复述数据
           • 不同块承载不同类型的信息，不重叠
    
    原则：
      珠宝不是越多越好，
      越多越显暴发户，
      精选几件独特的才显优雅。

29. ★★★★★ 信息过度 · 施工级细节（只有工程师会看的）
    ❌ 错误：信息图里写满：
           • 焊缝厚度（WELD THROAT 16mm）
           • 螺栓型号（M36 HIGH-STRENGTH BOLTS）
           • 壁厚（WALL THICKNESS 50-100mm）
           • 箱型截面（BOX SECTION 800×400mm）
           • 节点板厚（NODE PLATE t=40mm）
    
    ✅ 正确：只保留设计级参数（有故事感的）
           • 面积 / 高度 / 座位 / 造价
           • 用钢总量 / 管长 / 材料等级
           • 建筑师 / 竣工年份
           
           排除施工细节（给施工队的）：
           • 焊缝 / 螺栓 / 壁厚 / 节点板厚
    
    口诀：
      博物馆的珠宝说明牌不写"焊接温度 1064°C"
      它只写"Tiffany · 黄金 · 1920"

30. ★★★★★ 每行数据都有引导线（视觉混乱）
    ❌ 错误：KEY DATA 7-8 行，每行都甩一条线到主图
           → 主图被引导线乱涂
           → 看起来像被网捕住
    
    ✅ 正确：全图只有 4-6 条"标志性引导线"
           KEY DATA 选 1-2 条（如 HEIGHT → 屋顶）
           STEEL QUANTITY → 钢网 1 条
           ETFE 块 → 屋顶 1 条
           NODE 块 → 节点 1 条
           其他数据都是纯文字列表，不拉线
    
    原则：引导线是"视觉点缀"，不是"每个数据都要连"。
         过多引导线比没有引导线更糟。

31. ★★★★★ 施工流程 6 张图形态一样（看不出进度差异）
    ❌ 错误：6 张图都是"完整圆环"造型 × 6，观众分不清哪步是哪步
    ✅ 正确：形态有明显区分
           #1-2: 方形基础 / 桩基 / 梁柱（不是圆环）
           #3-4: 半圆 / 部分圆环（逐渐合龙）
           #5-6: 完整圆环 + 膜结构
           尺寸也有 0.7x-1.3x 明显变化

32. ★★★★★ 图上出现 "LAYER 1/2/3" 这种技术术语
    ❌ 错误：AI 把 prompt 里的"LAYER 1"字样当成要渲染的标签
           图上显示 "LAYER 1: DESIGN CONCEPT & TECHNICAL DRAWINGS"
           → 技术痕迹暴露，像开发文档，不是艺术品
    
    ✅ 正确：图上只显示模块的标题
           "DESIGN CONCEPT" · "CONSTRUCTION PROCESS" · "KEY FEATURES"
           绝对不要 "LAYER x:" 前缀
           也不要合并模块为 "LAYER 3: FEATURES & FUNCTIONS"
    
    核心：LAYER 1/2/3 是给 AI 看的结构标签，不是给观众看的。
         观众只看到独立的模块标题，感觉"自然有序"而非"被编号"。
    
    检验方法：
      主图 60% 以上区域必须**完全明亮**，无任何变暗
      60% 以下才有"亮色渐隐到黑板"的过渡（5% 区域）

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
  const text = `=== English ===
${en}

=== 中文 ===
${zh}`;
  const btn = document.querySelector('#tool10 .copy-btn');
  if (window.copyToClipboard) {
    window.copyToClipboard(text, btn);
  } else {
    // Fallback if hub.js didn't load for some reason
    window.prompt('Please copy (Ctrl+C):', text);
  }
}

document.getElementById('t10BuildingInput').addEventListener('keydown', e => { if (e.key === 'Enter') generateTool10(); });
