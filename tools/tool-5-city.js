// ============================================
// TOOL 5 — City Landmark Poster (城市地标海报)
// ============================================
const T5_STYLE_MAP = {
  goldenight: {
    name: "Golden Night 夜色金线",
    desc: "深黑背景 + 金色霓虹线条勾勒的奢华夜色海报",
    visual: "luxurious nighttime city poster with buildings rendered in intricate golden neon line art against deep pure black background, glowing golden filaments tracing every architectural detail like fireworks, city skyline appearing as constellation of golden light filaments, magical dreamlike atmosphere, cinematic depth",
    palette: "deep pure black (#000) as dominant, molten gold (#D4AF37) and champagne gold for all architectural lines, single accent crimson red (#D4351C) in lower right corner for emotional contrast, ivory (#F5EFDF) for text",
    mood: "mysterious, poetic, dreamlike, intimate, cinematic night"
  },
  guofeng: {
    name: "Guofeng Watercolor 国风工笔",
    desc: "中国传统水彩工笔插画风格，喜庆明快",
    visual: "traditional Chinese watercolor gongbi illustration style, landmarks rendered in delicate ink outline and soft watercolor wash, flowing red silk ribbon weaving through the entire composition connecting all elements, auspicious clouds and landscape, festive spring atmosphere with lanterns and fireworks",
    palette: "warm rice paper ivory background (#F5EFDF), vermilion red (#D4351C) for silk ribbons and focal accents, celadon green and azure blue for landscape, ink black for outlines, soft peach and lotus pink for flowers",
    mood: "festive, auspicious, traditional, celebratory, culturally rich"
  },
  inkwash: {
    name: "Ink Wash 水墨写意",
    desc: "中国水墨画风，留白意境",
    visual: "minimalist Chinese ink wash painting (shui-mo) aesthetic, landmarks suggested through expressive brush strokes, generous negative space on rice paper, misty mountain landscape atmosphere, delicate ink gradations from deep black to pale gray",
    palette: "warm rice paper ivory (#EDE0C8), ink black in varied tones, single red seal stamp as only color accent, extensive white space",
    mood: "zen, contemplative, poetic, minimalist, elegant"
  },
  cyberneon: {
    name: "Cyber Neon 赛博霓虹",
    desc: "赛博朋克夜景，霓虹招牌密集",
    visual: "cyberpunk megacity nightscape with dense neon signage in Chinese characters, rain-slicked streets reflecting holographic advertisements, Blade Runner 2049 aesthetic, layered architectural density, volumetric fog, towering skyscrapers",
    palette: "deep navy black base (#0A0A15), electric magenta (#FF0080) and cyan (#00FFFF) neon, acid yellow accents, chrome silver highlights",
    mood: "futuristic, dystopian, energetic, dense, neon-drenched"
  },
  vintagemg: {
    name: "Vintage Republican 复古民国",
    desc: "民国时期老上海风情，怀旧海报",
    visual: "1930s Republican-era vintage China poster aesthetic, Shanghai calendar girl style, art deco architecture, classic tram and rickshaw street scenes, sepia-toned nostalgia, letterpress printing texture, muted faded color palette",
    palette: "aged paper cream (#E8D9B8), faded crimson red, antique brass gold, dusty teal green, sepia brown",
    mood: "nostalgic, romantic, refined, elegant vintage"
  },
  ukiyoe: {
    name: "Ukiyoe 浮世绘",
    desc: "日式浮世绘风格，东方城市再诠释",
    visual: "Japanese ukiyo-e woodblock print aesthetic applied to Chinese cityscape, Hokusai-style wave and wind lines, flat perspective with decorative patterns, bold outlines, stylized clouds, traditional vantage viewpoint",
    palette: "prussian blue (#1B3B6F), vermilion red, golden ochre, warm ivory, indigo shadows",
    mood: "decorative, patterned, iconic, culturally-fused"
  }
};

const T5_PERSON_MAP = {
  whitehairgirl: { name: "白发少女 White-haired Girl", desc: "long flowing silver-white hair, closed eyes, holding bouquet of colorful flowers, wearing flowing dark robe, dreamy melancholy expression, slight profile view" },
  redrobedancer: { name: "红衣舞者 Red Robe Dancer", desc: "woman in traditional red hanfu with flowing silk sleeves, shown from back turning to face camera, holding billowing red silk ribbon high overhead, celebratory dancing pose, elaborate hair ornament" },
  qipaolady: { name: "旗袍女子 Qipao Lady", desc: "elegant woman in silk embroidered qipao/cheongsam, graceful standing pose, refined Shanghai lady aesthetic, hair in classic bun with pearl ornaments" },
  operaface: { name: "戏曲人物 Opera Figure", desc: "Peking opera character in elaborate painted face makeup, ornate costume with pheasant feathers, dramatic theatrical pose" },
  hanfuscholar: { name: "汉服书生 Hanfu Scholar", desc: "young man in traditional scholar's hanfu, holding folded paper fan or scroll, contemplative pose, flowing robes" },
  modernboy: { name: "现代少年 Modern Youth", desc: "modern stylish young person in contemporary urban clothing, looking toward the cityscape, back view or three-quarter angle" },
  noperson: { name: "无人物 No Figure", desc: "no human figure, pure cityscape composition, landmarks as sole subject" }
};

const T5_FLOW_MAP = {
  goldenriver: "a flowing river of golden light weaving through the entire composition, connecting all landmarks like a luminous dragon, particles of golden sparkles scattered throughout",
  redsilk: "a dramatic flowing red silk ribbon (绸带) cascading through the entire composition, connecting sky to ground, symbolizing auspicious energy and qi",
  cloudmist: "traditional Chinese auspicious clouds (祥云) and morning mist weaving through the landmarks, creating dreamy layered depth",
  starstream: "a stream of stars and celestial light flowing through the composition like the Milky Way, creating cosmic connection between elements",
  flowerpetals: "drifting flower petals and cherry blossoms cascading through the composition, seasonal celebration atmosphere",
  brushstroke: "expressive calligraphic brush strokes of ink sweeping through the composition, gesture marks uniting all elements",
  none: "no dominant flowing element, let the landmarks compose naturally"
};

const T5_TYPO_MAP = {
  minimal: "minimalist sans-serif Chinese city name (宋体) in refined typography at top center, small date line below, artist signature",
  brushcalli: "large expressive brush calligraphy city name in red ink on left side, smaller subtitle with red seal stamp (印章), traditional vertical annotation",
  sealstamp: "refined serif Chinese title with prominent vermilion red seal stamp as signature element, bilingual Chinese-English",
  neonglow: "neon-glowing futuristic sans-serif city name with subtle glow, bilingual with pinyin/English",
  vintage: "1930s Republican-era decorative typography, art deco ornaments, retro Chinese characters in letterpress style",
  woodblock: "woodblock print style traditional Chinese characters with visible texture, bold outlined lettering"
};

// Composition density — 构图密度配置（控制留白）
const T5_DENSITY_MAP = {
  airy: {
    name: "极简留白 Airy & Minimalist",
    desc: "70% 留白 · 东方美学精髓 · 一主一次",
    landmarkCount: "2-3",
    compositionRule: "至少 70% 画面是纯净的留白/背景色。只保留最核心的 2-3 个元素，其他一律舍弃。这就是传统中国画的精神：'笔不到意到'。",
    overall: "extreme minimalism with vast negative space dominating the composition",
    sideChoice: "one clear side — either left or right, decisively",
    whiteSpaceRatio: "70%",
    figurePosition: "to one side of the composition with lots of empty space around",
    styleKeywords: "minimalist composition, vast negative space, Zen aesthetic, Chinese ink painting sparseness"
  },
  balanced: {
    name: "平衡聚焦 Balanced & Focused",
    desc: "50% 留白 · 主次分明 · 推荐",
    landmarkCount: "3-4",
    compositionRule: "约 50% 画面是留白/天空/背景，主体元素聚集在画面的某一侧，形成明确的视觉重心，另一侧留出呼吸空间。",
    overall: "balanced composition with clear visual hierarchy and generous breathing room",
    sideChoice: "left-leaning OR right-leaning (not centered)",
    whiteSpaceRatio: "50%",
    figurePosition: "lower third of the composition with space around",
    styleKeywords: "balanced composition, clear focal point, breathing room, editorial elegance"
  },
  rich: {
    name: "丰富饱满 Rich & Detailed",
    desc: "30% 留白 · 信息充实 · 地标环绕",
    landmarkCount: "4-6",
    compositionRule: "约 30% 画面留白（主要在顶部天空和边角），主体元素较丰富但仍有层次主次，避免均匀平铺。",
    overall: "detail-rich composition with layered depth, but maintaining clear hierarchy",
    sideChoice: "asymmetric with gentle weight distribution",
    whiteSpaceRatio: "30%",
    figurePosition: "lower portion as an anchor, with cityscape wrapping around",
    styleKeywords: "rich detail, layered composition, multiple landmarks, still maintaining hierarchy"
  }
};

// Composition trajectory — 构图轨迹（★ 新增：画面动线）
const T5_COMPOSITION_MAP = {
  diagonal: {
    name: "Diagonal · 对角线构图",
    desc: "从左下到右上（或反向）的对角延伸，画面有强烈方向感",
    prompt: "diagonal composition flowing from one corner to the opposite corner, creating a strong directional visual momentum"
  },
  sShape: {
    name: "S-Curve · S型流动",
    desc: "蜿蜒S型贯穿，视线在画面中游走（最适合有人物+流动元素）",
    prompt: "elegant S-shaped curve composition that meanders through the frame, leading the viewer's eye in a winding journey"
  },
  golden: {
    name: "Golden Spiral · 黄金螺旋",
    desc: "费波纳奇螺旋，主体在螺旋焦点，极高级的构图",
    prompt: "golden ratio spiral composition with the main subject positioned at the focal point of the Fibonacci spiral, other elements arranged along its curve"
  },
  horizontal: {
    name: "Horizontal Split · 水平分割",
    desc: "上下两段式，经典海报构图（如天空/大地）",
    prompt: "horizontal split composition with clear upper and lower zones divided by an implied or visible horizon line, each zone carrying distinct weight"
  },
  triangular: {
    name: "Triangular · 三角稳定",
    desc: "三点支撑的三角构图，稳定庄严（适合纪念性海报）",
    prompt: "stable triangular composition with three key focal points forming a visual triangle, creating a sense of balance and gravitas"
  },
  offCenter: {
    name: "Off-Center Focus · 偏心聚焦",
    desc: "主体集中在画面某一侧1/3处，大量留白",
    prompt: "off-center composition with all weight pushed to one side (left or right third), vast empty space on the opposite side for breathing room and text"
  }
};

// Background treatment — 背景处理（★ 新增：背景不是空白）
const T5_BACKGROUND_MAP = {
  pureWhite: {
    name: "Pure Paper · 纯净宣纸",
    desc: "近乎纯白的宣纸/米色底，极简禅意",
    prompt: "pure aged rice paper ivory background with barely any texture, absolute minimalism, no gradient, no particles"
  },
  stardust: {
    name: "Stardust · 星尘颗粒",
    desc: "深黑/暗红底，撒落细微星尘粒子（广州夜色图那种）",
    prompt: "deep black background gradating to deep wine red, covered with subtle stardust particles and micro light specks scattered throughout, cosmic nebula-like quality"
  },
  gradientGlow: {
    name: "Gradient Halo · 渐变光晕",
    desc: "从深色渐变到亮光，如晨雾或落日光晕",
    prompt: "smooth gradient background transitioning from dark to light, creating an atmospheric halo effect behind the subject, soft volumetric glow"
  },
  cloudmist: {
    name: "Cloud Mist · 云雾朦胧",
    desc: "中国山水画的云雾感，层次丰富",
    prompt: "ethereal cloud and mist background layers, traditional Chinese shan-shui atmospheric perspective, fog creating depth and mystery"
  },
  texturePaper: {
    name: "Textured · 质感底纹",
    desc: "古籍纸张/绢布的细腻纹理",
    prompt: "finely textured ancient paper or silk fabric background with visible fiber details, aged patina, subtle tea-stained edges"
  },
  cosmicStarry: {
    name: "Cosmic Starry · 宇宙星空",
    desc: "深空星海背景，史诗感",
    prompt: "deep cosmic space background with distant stars, nebula clouds, galaxy swirls, profound universe atmosphere"
  }
};

// Rendering technique — 渲染技法（★ 新增：画的质感）
const T5_RENDER_MAP = {
  lineGlow: {
    name: "Line + Glow · 线描+发光体块",
    desc: "精细线描勾勒轮廓，内部金色/霓虹发光（广州夜色图精髓）",
    prompt: "fine line-drawing technique with crisp outlines, interior volumes filled with glowing luminous blocks, luminescent highlights, the combination creates surreal floating quality"
  },
  watercolor: {
    name: "Watercolor Gongbi · 水彩工笔",
    desc: "中国工笔画结合水彩晕染（玉环图风格）",
    prompt: "traditional Chinese gongbi meticulous brushwork combined with soft watercolor washes, delicate color gradations, organic edge bleeds"
  },
  oilPaint: {
    name: "Oil Paint · 油画厚涂",
    desc: "厚重的油画笔触，有肌理感",
    prompt: "oil painting impasto technique with visible brushstrokes, rich textured pigment buildup, dramatic light modeling"
  },
  inkWash: {
    name: "Ink Wash · 水墨晕染",
    desc: "纯水墨浓淡干湿变化",
    prompt: "traditional Chinese ink wash (shui-mo) technique, varied tonality from deep black to pale gray, wet-on-wet bleeding effects, expressive brushwork"
  },
  digitalFlat: {
    name: "Digital Flat · 数字插画",
    desc: "现代扁平插画，颜色纯净",
    prompt: "modern digital flat illustration style, clean vector-like shapes, pure flat colors, subtle gradients, contemporary graphic poster quality"
  },
  hybrid: {
    name: "Hybrid · 混合技法",
    desc: "线描+工笔+淡彩的高级融合",
    prompt: "hybrid rendering technique combining precise line drawing, refined gongbi detail, and light watercolor washes, museum-quality illustration"
  }
};

// Lighting hierarchy — 光影层级（★ 新增：光的结构）
const T5_LIGHTING_MAP = {
  dramatic: {
    name: "Dramatic Contrast · 戏剧对比",
    desc: "强烈明暗对比，聚光灯式照亮主体",
    prompt: "dramatic chiaroscuro lighting with strong contrast between illuminated subjects and deep shadows, spotlight effect isolating the main focus, cinematic intensity"
  },
  volumetric: {
    name: "Volumetric Rays · 体积光束",
    desc: "丁达尔光束穿透雾气（神性感）",
    prompt: "volumetric god rays penetrating through mist, Tyndall effect creating visible light beams, particles floating in the light, divine atmospheric quality"
  },
  particle: {
    name: "Particle Glow · 粒子散射",
    desc: "金色粒子散落发光，梦幻感",
    prompt: "scattered luminous particles and micro-sparkles throughout, soft bokeh-like light dots, magical glowing atmosphere, ambient particle effects"
  },
  gentle: {
    name: "Gentle Even · 柔和均匀",
    desc: "柔光均匀铺满，日系温柔感",
    prompt: "soft even diffused lighting, gentle wrap-around illumination with no harsh shadows, warm ambient glow throughout the composition"
  },
  rim: {
    name: "Rim Light · 轮廓光",
    desc: "主体边缘被金色/红色光勾勒",
    prompt: "strong rim lighting outlining the main subjects in golden or warm light, silhouette separation from background, dimensional edge definition"
  },
  moonlit: {
    name: "Moonlit · 月光冷调",
    desc: "冷色月光，清冷氛围",
    prompt: "cool moonlit atmosphere with blue-silver tones, subtle illumination creating quiet mysterious mood, soft night ambience"
  }
};

// City landmark database — expanded
const T5_CITY_DB = {
  "广州": "Canton Tower (小蛮腰/广州塔), Pearl River (珠江), Chen Clan Ancestral Hall (陈家祠), Shamian Island (沙面), Liede Bridge (猎德大桥), IFC twin towers, Baiyun Mountain (白云山)",
  "深圳": "Ping An Finance Centre, Shenzhen Bay Bridge, Window of the World, OCT East, Dapeng Fortress, Lianhua Mountain, Deng Xiaoping statue, Shekou port",
  "上海": "Oriental Pearl Tower (东方明珠), The Bund (外滩), Jin Mao Tower, Shanghai Tower, Shanghai World Financial Center, Nanpu Bridge, Yu Garden (豫园), Xintiandi",
  "北京": "Forbidden City (紫禁城), Temple of Heaven (天坛), Great Wall (长城), CCTV Tower, Bird's Nest stadium, Water Cube, Tiananmen Square, Summer Palace (颐和园)",
  "成都": "Chengdu giant panda base, Wuhou Shrine, Jinli Street, Kuanzhai Alley, Du Fu Thatched Cottage, Anshun Bridge, 339 TV Tower, Mount Qingcheng",
  "西安": "Big Wild Goose Pagoda (大雁塔), Terracotta Army (兵马俑), City Wall (西安城墙), Bell Tower (钟楼), Drum Tower, Huaqing Palace, Mount Hua in distance",
  "杭州": "West Lake (西湖), Leifeng Pagoda (雷峰塔), Broken Bridge (断桥), Lingyin Temple, Qiantang River, Six Harmonies Pagoda, Hefang Street, Xixi Wetland",
  "重庆": "Hongya Cave (洪崖洞), Jiefangbei, Liberation Monument, Yangtze River, Jialing River junction, Chaotianmen Bridge, cable cars, mountain city terraces",
  "南京": "Confucius Temple (夫子庙), Sun Yat-sen Mausoleum (中山陵), Ming Xiaoling, Yangtze River Bridge, Xuanwu Lake, Purple Mountain (紫金山)",
  "厦门": "Gulangyu Island (鼓浪屿), Nanputuo Temple, Xiamen University, Zengcuoan, Huandao Road, Hulishan Fortress, colonial architecture",
  "苏州": "Humble Administrator's Garden (拙政园), Lion Grove Garden, Tiger Hill (虎丘), Pingjiang Road, Grand Canal, Shantang Street, Jinji Lake",
  "香港": "Victoria Harbour, IFC Tower, Bank of China Tower, Star Ferry, Tsim Sha Tsui skyline, Victoria Peak, Tsing Ma Bridge, neon-lit Kowloon streets",
  "澳门": "Ruins of St. Paul's, Senado Square, Macau Tower, Grand Lisboa, A-Ma Temple, Lotus Bridge",
  "天津": "Tianjin Eye Ferris Wheel, Italian Style Town, Haihe River, Five Great Avenues, Tianjin Railway Station, Porcelain House",
  "武汉": "Yellow Crane Tower (黄鹤楼), Yangtze River Bridge, Wuhan University campus, East Lake, Hubu Alley, Tanhualin",
  "玉环": "Dalu Island (大鹿岛), Yucheng Park (玉城公园), Yuhuan Confucius Temple (玉环文庙), Chumen Ancient Town (楚门古镇), Lumen Bay Bridge (漩门湾大桥), Lumen Bay Wetland Park (漩门湾湿地公园), mountains meet sea coastline, lotus flowers, red-sail fishing boats, traditional Jiangnan architecture",
  "温州": "Jiangxin Islet, Yandang Mountain, Nanji Islands, Wuma Street, Ou River, Taoist architecture",
  "青岛": "Zhanqiao Pier, Badaguan Scenic Area, May Fourth Square, Laoshan Mountain, German colonial architecture, Tsingtao Brewery, seaside promenade",
  "大连": "Xinghai Square, Binhai Road coastline, Russian Street, Dalian Port, Bangchui Island, cherry blossoms",
  "拉萨": "Potala Palace, Jokhang Temple, Barkhor Street, Norbulingka, prayer flags, Himalayan backdrop",
  "丽江": "Lijiang Old Town, Jade Dragon Snow Mountain (玉龙雪山), Black Dragon Pool, Shuhe Ancient Town, Naxi architecture",
  "桂林": "Li River (漓江), Elephant Trunk Hill (象鼻山), karst mountains, Yangshuo, Reed Flute Cave, rice terraces"
};

function switchT5Tab(n) {
  document.querySelectorAll('#tool5 .tab').forEach((t,i) => t.classList.toggle('active', i===n));
  document.querySelectorAll('#tool5 .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
}

function setT5Preset(city, style, person, flow) {
  document.getElementById('t5CityInput').value = city;
  if (style) document.getElementById('t5StyleSelect').value = style;
  if (person) document.getElementById('t5PersonSelect').value = person;
  if (flow) document.getElementById('t5FlowSelect').value = flow;
}

async function generateTool5() {
  const city = document.getElementById('t5CityInput').value.trim();
  if (!city) { document.getElementById('t5CityInput').focus(); return; }

  const date = document.getElementById('t5DateInput').value.trim();
  const signature = document.getElementById('t5SignInput').value.trim();
  const styleKey = document.getElementById('t5StyleSelect').value;
  const personKey = document.getElementById('t5PersonSelect').value;
  const flowKey = document.getElementById('t5FlowSelect').value;
  const typoKey = document.getElementById('t5TypoSelect').value;
  const densityKey = document.getElementById('t5DensitySelect')?.value || 'balanced';
  const compKey = document.getElementById('t5CompSelect')?.value || 'sShape';
  const bgKey = document.getElementById('t5BgSelect')?.value || 'gradientGlow';
  const renderKey = document.getElementById('t5RenderSelect')?.value || 'hybrid';
  const lightKey = document.getElementById('t5LightSelect')?.value || 'rim';

  const style = T5_STYLE_MAP[styleKey];
  const person = T5_PERSON_MAP[personKey];
  const flow = T5_FLOW_MAP[flowKey];
  const typo = T5_TYPO_MAP[typoKey];
  const density = T5_DENSITY_MAP[densityKey];
  const comp = T5_COMPOSITION_MAP[compKey];
  const bg = T5_BACKGROUND_MAP[bgKey];
  const render = T5_RENDER_MAP[renderKey];
  const light = T5_LIGHTING_MAP[lightKey];
  const knownLandmarks = T5_CITY_DB[city] || null;

  document.getElementById('t5Output').classList.remove('visible');
  document.getElementById('t5Loading').classList.add('visible');
  document.getElementById('t5GenBtn').disabled = true;

  ['t5s1','t5s2','t5s3','t5s4'].forEach((id, i) => {
    setTimeout(() => document.getElementById(id).classList.add('visible'), i * 450);
  });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 6000,
        messages: [{
          role: "user",
          content: `你是世界顶级的"东方美学"海报艺术总监，客户请你为中国城市创作高端艺术海报。你需要写出比普通 AI prompt 更深入、更专业、更具体的提示词——精确到构图轨迹、背景处理、渲染技法、光影层级、色彩比例。

【用户输入】
- 城市：${city}
- 副标题/日期：${date || '（未提供，请自拟）'}
- 署名：${signature || '（未提供）'}

【艺术配置】
- 整体风格：${style.name}
  视觉定调：${style.visual}
  色彩系统：${style.palette}
  情绪：${style.mood}
- 人物锚点：${person.name} — ${person.desc}
- 流动元素：${flow}
- 文字排版：${typo}

【★ 核心技术参数（必须精确体现在 prompt 里）】
- 构图轨迹：${comp.name} — ${comp.desc}
  具体描述：${comp.prompt}
- 背景处理：${bg.name} — ${bg.desc}
  具体描述：${bg.prompt}
- 渲染技法：${render.name} — ${render.desc}
  具体描述：${render.prompt}
- 光影层级：${light.name} — ${light.desc}
  具体描述：${light.prompt}
- 构图密度：${density.name}（${density.whiteSpaceRatio} 留白，${density.landmarkCount} 个地标）

${knownLandmarks ? `【${city}真实地标库】${knownLandmarks}\n注意：不要全塞进去！选最有代表性的 ${density.landmarkCount} 个。` : `【注意】基于你对「${city}」的了解，选 ${density.landmarkCount} 个真实地标。`}

============================================
【★ 学习示范：这是艺术总监级的 prompt 深度（你必须达到这个水准）】

范例主题：广州 · 金色星尘夜景
范例输出（摘选）：

"平面插画，东方幻想风格高端城市海报设计，竖版2:3构图，整体采用对角线+S型流动构图，从左下向右上延展，画面以深邃黑色为背景，自上而下渐变至浓烈暗红色，形成强烈冷暖对比与空间纵深，背景带微弱星尘与颗粒质感。画面中央一条金色流动能量线条如火焰般蜿蜒贯穿，自底部向上延伸，具有流体质感、粒子光效与渐变高光，局部带细微能量碎屑与体积光。

金色流光中逐层浮现广州城市地标建筑群：广州塔为视觉核心，比例突出，周围融合珠江新城高楼群、猎德大桥及现代与岭南建筑元素，建筑采用"精细线描 + 金色发光体块"表现，轮廓清晰、细节丰富，在金色光晕映衬下仿佛悬浮于虚空，形成超现实空间层次，远景轻微雾化增强纵深感。

画面底部为一位东方白发女性形象，长发飘逸，如烟似雾，与金色流光自然衔接并逐渐融合，发丝半透明带渐变光感，姿态柔美，双目微闭，神情宁静，怀抱一束多彩鲜花，花间点缀微光粒子与星点效果...

光影集中于金色流线、建筑与人物轮廓，形成强烈明暗对比与视觉聚焦，整体氛围宏大、神秘、具有东方神话意境且略带治愈感。色彩以黑与暗红为基底，高亮鎏金为主视觉强调，金色具备丰富明暗层次，辅以小面积高饱和花束色彩点缀，整体高级克制。"

— 学习这个 prompt 的深度：
✓ 具体到构图轨迹（对角线+S型）
✓ 背景处理有层次（深黑→暗红 + 星尘颗粒）
✓ 每个元素有渲染技法（线描+发光体块）
✓ 光影系统化（流线+建筑+人物轮廓）
✓ 色彩比例明确（黑红底 + 鎏金主调 + 小面积彩色点缀）
✓ 空间感描述（悬浮于虚空、远景雾化纵深感）
============================================

【必须避免的常见陷阱】
❌ 只写"beautiful poster, landmarks, flowing silk"这种空泛描述
❌ 把所有地标平铺展开（像地图）
❌ 每个元素一样精细（没有主次层级）
❌ 忽视背景处理（留白不等于空白）
❌ 流动元素贯穿全图（过于抢眼）

请严格按以下格式输出，使用 === 分隔符：

===EN_PROMPT===
（500-700词的艺术总监级英文提示词，必须按以下精密结构组织，达到上面范例的深度。严格按段落写，不要一段乱塞：

第1段 OVERALL: flat illustration, oriental fantasy style high-end city poster design for ${city}, vertical 2:3 composition. ${comp.prompt}. ${style.visual}.

第2段 BACKGROUND: ${bg.prompt}. This background treatment creates the foundation atmosphere — ${density.whiteSpaceRatio} of canvas dedicated to this, no overcrowding.

第3段 FLOW ELEMENT (central visual spine): ${flow}, rendered as a luminous energy line winding through the composition with fluid quality, particle light effects, gradient highlights, with clear START and END points — does NOT span entire canvas, occupies no more than 30% area. The flow element is the visual qi/energy that guides the viewer's eye.

第4段 HERO LANDMARKS: within or emerging from the flow element, ${city}'s iconic landmarks appear layer by layer. Focus on 1-2 PRIMARY landmarks${knownLandmarks ? ' (choose most iconic from: ' + knownLandmarks + ')' : ''} rendered with full detail and prominence, plus 1-2 SECONDARY landmarks shown smaller, partially hidden, or as silhouettes. ${render.prompt}. Create visual hierarchy — NOT every landmark equally rendered. Buildings appear to float in semi-void with distance haze enhancing depth.

第5段 FIGURE: ${person.desc}, positioned ${density.figurePosition}, integrating naturally with the flow element (hair or robes merging with the luminous flow). The figure feels like they are contemplating/interacting with the cityscape, not crowded into it.

第6段 LIGHTING SYSTEM: ${light.prompt}. Light focuses on: (a) the flow element's luminous core, (b) building outlines and interior glow, (c) figure's silhouette and hair edges, (d) floating particles/micro-sparkles. Creates strong contrast and visual focal points.

第7段 COLOR BREAKDOWN: ${style.palette}. Color hierarchy is critical — dominant base color, secondary accent, and small pops of saturation as garnish. Maintain restraint and sophistication.

第8段 TYPOGRAPHY: ${typo}, city name "${city}" prominently placed in the ${density.whiteSpaceRatio} negative space area (not overlapping main imagery), ${date ? 'date/subtitle "' + date + '"' : ''} ${signature ? 'signed "' + signature + '"' : ''}. Typography uses soft gold or warm ivory harmonizing with the overall light system.

第9段 QUALITY TAGS: cinematic light and shadow, rich volumetric light and particle detail, no noise or artifacts, ultra HD 8K resolution, commercial-grade art poster quality, masterpiece, editorial magazine cover quality, museum-grade.）

===ZH_PROMPT===
（350-450字中文提示词，对应英文版本，同样按段落组织，达到示范深度）

===LANDMARKS===
（只列出 ${density.landmarkCount} 个${city}地标，标注 HERO/SECONDARY 层级，格式：emoji|层级|中文名 English Name|视觉描述
示例：
🗼|HERO|广州塔 Canton Tower|画面主焦点，细节完整，金色发光体块
🌊|SECONDARY|珠江 Pearl River|以雾化远景出现，不完整呈现
...）

===COPY_DECK===
（画面文字排版建议，格式：label|内容，每行一个：
MAIN_TITLE_ZH|主标题中文
MAIN_TITLE_EN|主标题英文
SUBTITLE_ZH|中文副标语（10-15字诗意 slogan）
SUBTITLE_EN|英文副标语
DATE_LINE|日期行
SIGNATURE|署名
SEAL_TEXT|印章内文字
CORNER_TEXT|角落小字）

===USAGE===
（4-6条使用建议，每条"•"开头，包括最佳AI工具、分辨率2:3竖版、如何锁定城市地标、中文文字的处理技巧）

===PLATFORM===
（Midjourney/Flux/可灵/即梦/SD各一条参数建议，针对中国城市艺术海报）

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
    const landmarksRaw = extract('LANDMARKS');
    const copyDeckRaw = extract('COPY_DECK');
    const usage = extract('USAGE');
    const platform = extract('PLATFORM');

    if (!enPrompt) { console.error('Raw:', rawText); throw new Error("解析失败"); }

    const t5SigEn = (typeof window.getSignatureInstruction === 'function') ? window.getSignatureInstruction() : '';
    const t5SigZh = (typeof window.getSignatureInstructionZh === 'function') ? window.getSignatureInstructionZh() : '';
    document.getElementById('t5EnPrompt').textContent = enPrompt + t5SigEn;
    document.getElementById('t5ZhPrompt').textContent = (zhPrompt || enPrompt) + (zhPrompt ? t5SigZh : t5SigEn);
    document.getElementById('t5UsageGuide').textContent = usage;
    document.getElementById('t5PlatformNote').innerHTML = `<strong>◈ PLATFORM PARAMETERS</strong>${platform.replace(/\n/g, '<br>')}`;
    document.getElementById('t5OutputLabel').textContent = `◈ ${city.toUpperCase()} · ${style.name.toUpperCase()}`;

    // Render landmarks
    const landmarksViz = document.getElementById('t5LandmarksViz');
    landmarksViz.innerHTML = '';
    landmarksRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const parts = line.split('|').map(p => p.trim());
      const nameParts = (parts[1] || '').split(/\s+/);
      const zhName = nameParts[0] || '';
      const enName = nameParts.slice(1).join(' ');
      const el = document.createElement('div');
      el.className = 'landmark-item';
      el.innerHTML = `
        <div class="landmark-icon">${parts[0] || '◈'}</div>
        <div class="landmark-body">
          <div class="landmark-name">${zhName}${enName ? `<span class="en">${enName}</span>` : ''}</div>
          <div class="landmark-desc">${parts[2] || ''}</div>
        </div>
      `;
      landmarksViz.appendChild(el);
    });

    // Render copy deck
    const copyDeck = document.getElementById('t5CopyDeck');
    copyDeck.innerHTML = '';
    const copyMap = {};
    copyDeckRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const idx = line.indexOf('|');
      const key = line.substring(0, idx).trim();
      const val = line.substring(idx + 1).trim();
      copyMap[key] = val;
    });

    const sections = [
      { title: '主标题 · MAIN TITLE', items: [
        { label: 'Chinese', val: copyMap.MAIN_TITLE_ZH },
        { label: 'English', val: copyMap.MAIN_TITLE_EN },
      ]},
      { title: '副标语 · SUBTITLE', items: [
        { label: '中文副标', val: copyMap.SUBTITLE_ZH },
        { label: 'English Subtitle', val: copyMap.SUBTITLE_EN },
      ]},
      { title: '装饰文字 · DECORATIVE', items: [
        { label: '日期 Date', val: copyMap.DATE_LINE },
        { label: '署名 Signature', val: copyMap.SIGNATURE },
        { label: '印章 Seal Stamp', val: copyMap.SEAL_TEXT },
        { label: '角落小字 Corner', val: copyMap.CORNER_TEXT },
      ]}
    ];

    sections.forEach(sec => {
      const secEl = document.createElement('div');
      secEl.className = 'copy-section';
      let html = `<div class="copy-section-title">${sec.title}</div>`;
      sec.items.forEach(it => {
        if (it.val && it.val.trim()) {
          html += `<div class="copy-item"><div class="copy-item-label">${it.label}</div><div class="copy-item-value">${it.val}</div></div>`;
        }
      });
      secEl.innerHTML = html;
      copyDeck.appendChild(secEl);
    });

  } catch(err) {
    console.error(err);
    document.getElementById('t5EnPrompt').textContent = `❌ 生成失败\n原因: ${err.message}\n\n请稍后重试，或打开 F12 查看详细日志。`;
  }

  document.getElementById('t5Loading').classList.remove('visible');
  ['t5s1','t5s2','t5s3','t5s4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('t5Output').classList.add('visible');
  document.getElementById('t5GenBtn').disabled = false;
  switchT5Tab(0);
}

function copyT5() {
  const en = document.getElementById('t5EnPrompt').textContent;
  const zh = document.getElementById('t5ZhPrompt').textContent;
  navigator.clipboard.writeText(`=== English ===\n${en}\n\n=== 中文 ===\n${zh}`).then(() => {
    const btn = document.querySelector('#tool5 .copy-btn');
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = 'Copy All', 2000);
  });
}

document.getElementById('t5CityInput').addEventListener('keydown', e => { if (e.key === 'Enter') generateTool5(); });
