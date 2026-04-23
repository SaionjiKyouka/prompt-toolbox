// ============================================
// TOOL 3 — Cinematic Product Manifesto
// ============================================
const T3_MOVIE_MAP = {
  "2001": { name: "2001: A Space Odyssey (Kubrick)", visual: "symmetrical one-point perspective composition, sterile futuristic interiors, clinical white corridors with hexagonal or octagonal panels, astronaut figure walking away from camera, Kubrick-style precise geometric framing, 2001 A Space Odyssey aesthetic", mood: "mysterious, sacred, clinical, timeless sci-fi", photo: "wide-angle symmetrical shot, 50mm lens, architectural precision" },
  "blade2049": { name: "Blade Runner 2049 (Villeneuve)", visual: "Blade Runner 2049 aesthetic, massive holographic projection of a female face with neon edge glow, cyberpunk city skyline at night, rain-soaked atmosphere, solitary figure silhouette in foreground, towering scale contrast, volumetric neon fog", mood: "dystopian, intimate, melancholic, neon-noir", photo: "cinematic anamorphic wide shot, shallow DOF on silhouette" },
  "her": { name: "Her (Spike Jonze)", visual: "warm intimate interior, sunset-lit room with soft golden glow, introspective man sitting alone at desk or by window, muted vintage color grade inspired by the film Her, soft bokeh city lights outside, melancholic contemplation", mood: "warm, lonely, human, intimate, nostalgic", photo: "medium shot, 85mm lens feel, soft diffused light, shallow depth of field" },
  "interstellar": { name: "Interstellar (Nolan)", visual: "cosmic vastness inspired by Interstellar, distant Earth or alien planet visible through spacecraft window, tiny human silhouette against cosmic scale, wormhole or ringed planet in background, philosophical awe of scale", mood: "epic, contemplative, transcendent, existential", photo: "IMAX-style wide composition, deep focus" },
  "dune": { name: "Dune (Villeneuve)", visual: "Dune 2021 aesthetic, vast desert or alien landscape, monumental architecture silhouettes, single robed figure against epic scale, warm sand-and-dust atmosphere, brutalist monolithic structures", mood: "ancient, epic, mystical, monumental", photo: "anamorphic wide shot, dramatic rim lighting" },
  "anime": { name: "Makoto Shinkai Anime", visual: "Makoto Shinkai style anime illustration, hyperdetailed celestial sky with stars and nebulae, romantic twilight atmosphere, young character silhouette or half-turned portrait, soft volumetric light rays, city lights in soft bokeh below", mood: "dreamy, romantic, transcendent, bittersweet", photo: "illustrated composition, painterly rendering with photorealistic light" },
  "exmachina": { name: "Ex Machina (Garland)", visual: "Ex Machina aesthetic, ultra-minimal white brutalist interior, clean geometric architecture, single cool-toned figure in sharp modernist space, floor-to-ceiling glass, controlled ambient lighting", mood: "cold, clinical, elegant, unsettling intelligence", photo: "architectural photography precision, even cool lighting" },
  "arrival": { name: "Arrival (Villeneuve)", visual: "Arrival aesthetic, mysterious fog-shrouded landscape, monolithic alien object hovering above misty terrain, lone human figure walking toward the unknown, muted desaturated grays and olive tones", mood: "mysterious, awe-struck, contemplative, otherworldly", photo: "wide environmental shot, atmospheric depth, misty diffusion" }
};

const T3_COLOR_MAP = {
  hermes: "Hermes orange (#FF5C1F) as single accent on deep black (#0A0806) background, ivory white (#F5F0E8) for main text, absolutely no other colors — strict two-color-plus-neutral lock",
  cyberorange: "blood orange red (#E8451C) dominant tone over deep charcoal black, warm amber highlights on skin tones, no blue or green whatsoever, claustrophobic monochromatic warmth",
  warmsunset: "warm sunset palette — burnt orange, amber gold, rust brown, cream ivory, with deep espresso shadows, vintage film color grade, absolutely no cool tones",
  purplestar: "deep indigo-purple base (#1A1040) with magenta-pink gradient accents (#B84FBE to #E8A4D4), starry violet night sky, neon dream palette",
  iceblue: "ice blue (#A8C8E0) and silver-gray over deep space black, cold clinical palette with white highlights, no warm tones at all",
  monogreen: "olive green (#6B7F4A) and cream ivory (#F0E8D4) neutral warm palette, organic natural tones, zero saturation beyond these two",
  monored: "deep wine burgundy (#5A1A25) with crimson accents, rich black backgrounds, theatrical and luxurious, no other hues"
};

const T3_SCENE_MAP = {
  corridor: "dramatic symmetrical one-point perspective down a futuristic corridor, astronaut or solitary figure walking away from camera toward distant vanishing point, hexagonal or octagonal wall panels, strong geometric precision",
  rooftop: "solitary figure standing on rooftop edge, back turned to camera, overlooking vast city nightscape, contemplative loneliness, rain-slicked surface below, towering buildings in background",
  study: "intimate warm-lit study or home office interior, thoughtful man or woman seated at desk or by window in profile, stacks of books or vintage objects, sunset light streaming through window, soft ambient lamp glow",
  hologram: "massive translucent holographic projection of a beautiful female face dominating the upper portion of the frame, tiny human silhouette standing before it in awe, neon edge lighting on hologram, rain and volumetric fog",
  space: "interior of a spacecraft or space station with a large observation window, Earth or a distant planet visible outside, single astronaut figure framed by the window, cosmic vastness beyond",
  portrait: "cinematic portrait of a thoughtful person in half-profile or three-quarter turn, eyes cast downward or into the distance, soft rim light defining the face, introspective expression, shallow depth of field blurring the background",
  abstract: "abstract atmospheric composition with no specific human figure, flowing light particles, geometric fog shapes, minimalist suggestive forms evoking emotion without literal subject matter",
  city: "immersive cyberpunk megacity at night, towering skyscrapers with massive neon signage, rain-slicked streets reflecting lights, single small figure walking through the urban vastness, Blade Runner density"
};

const T3_TYPE_MAP = {
  ai: "AI software product",
  hardware: "consumer hardware product",
  saas: "SaaS productivity tool",
  luxury: "luxury or premium brand",
  lifestyle: "lifestyle brand",
  tech: "tech consumer product",
  startup: "startup brand"
};

function setT3(product, slogan, type, movie, color, scene) {
  document.getElementById('t3ProductInput').value = product;
  document.getElementById('t3SloganInput').value = slogan;
  document.getElementById('t3TypeSelect').value = type;
  document.getElementById('t3MovieSelect').value = movie;
  document.getElementById('t3ColorSelect').value = color;
  document.getElementById('t3SceneSelect').value = scene;
}

function switchT3Tab(n) {
  document.querySelectorAll('#tool3 .tab').forEach((t,i) => t.classList.toggle('active', i===n));
  document.querySelectorAll('#tool3 .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
}

async function generateTool3() {
  const product = document.getElementById('t3ProductInput').value.trim();
  if (!product) { document.getElementById('t3ProductInput').focus(); return; }

  const slogan = document.getElementById('t3SloganInput').value.trim();
  const type = T3_TYPE_MAP[document.getElementById('t3TypeSelect').value];
  const movie = T3_MOVIE_MAP[document.getElementById('t3MovieSelect').value];
  const color = T3_COLOR_MAP[document.getElementById('t3ColorSelect').value];
  const scene = T3_SCENE_MAP[document.getElementById('t3SceneSelect').value];

  document.getElementById('t3Output').classList.remove('visible');
  document.getElementById('t3Loading').classList.add('visible');
  document.getElementById('t3GenBtn').disabled = true;

  ['t3s1','t3s2','t3s3','t3s4'].forEach((id, i) => {
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
          content: `你是世界顶级的品牌创意总监，擅长"电影化产品海报"（Cinematic Product Manifesto）设计——这种风格常见于 AI 原生品牌、硬件初创公司的视觉体系。

用户输入：
- 产品名：${product}
- 产品Slogan：${slogan || '（未提供，需要你基于产品名创作一个富有灵魂的宣言）'}
- 产品类型：${type}
- 电影参考美学：${movie.name}
- 色温锁定：${color}
- 叙事场景：${scene}

【这种风格的核心配方】
1. **叙事性电影画面作为主视觉**——不是产品截图，而是有代入感的电影剧照式画面，人物背影或侧脸（绝不直视镜头）
2. **极致的单色温锁定**——全图只有一个主色 + 一个点缀色
3. **英中双语排版**——巨大英文主标题 + 拉开字距的中文副标题
4. **宣言式文案**——不讲功能，讲"灵魂/陪伴/进化/觉醒"这类品牌观
5. **功能卡片描边玻璃化**——半透明描边+右上角label（如 01 / MEMORY）
6. **底部固定CTA**——"JOIN THE EARLY ACCESS 申请内测资格 →"

请严格按以下格式输出，使用 === 分隔符，不要输出JSON：

===EN_PROMPT===
（400-550词完整英文提示词，必须描述以下结构化部分）

OVERALL: A cinematic product manifesto poster for [${product}], portrait 2:3 aspect ratio, editorial magazine poster layout.

HERO VISUAL: ${scene}, ${movie.visual}, evoking ${movie.mood}, ${movie.photo}.

LAYOUT STRUCTURE:
- Top: product logo on left + small English tagline on right (like "BUILT FOR THE AI NATIVE GENERATION")
- Upper third: massive English headline title in bold sans-serif, with single word highlighted in accent color, Chinese subtitle below with wide letter-spacing
- Middle: the cinematic hero visual as dominant element
- Lower third: 3-4 feature cards in minimal outlined glass-morphism style, each with thin icon + bold title + small description
- Bottom: CTA button "JOIN THE EARLY ACCESS 申请内测资格 →" and small QR code bottom-right

COLOR PALETTE: ${color}.

TYPOGRAPHY: bold sans-serif English headline (Helvetica Bold / Druk / Inter Black style), elegant Chinese sans-serif with wide letter-spacing for subtitle, small monospace or serif English labels for micro-copy.

STYLE: cinematic product poster, editorial minimalism, AI-native brand aesthetic, tech startup visual language, hyperdetailed photorealism in hero imagery, meticulous typographic hierarchy, 8K poster quality.

===ZH_PROMPT===
（250-350字中文提示词，对应英文版本）

===COPY_DECK===
（为这张海报撰写完整的品牌文案包，格式为 label|内容，每行一个，必须包含：
EN_HEADLINE|英文主标题（3-8个词，全大写，必须包含强调词）
EN_HEADLINE_HIGHLIGHT|主标题中强调的1-2个词（会变成橙色）
ZH_HEADLINE|中文主标题（10-14个字）
ZH_SUBTITLE|中文副标题（15-25字，宣言感）
EN_TAGLINE|顶部英文小字标语（例如 BUILT FOR THE AI NATIVE GENERATION）
FEATURE_1_EN|功能1英文label（如 01 / MEMORY）
FEATURE_1_ZH|功能1中文标题（4-6字）
FEATURE_1_DESC|功能1描述（15-25字）
FEATURE_2_EN|功能2英文label
FEATURE_2_ZH|功能2中文标题
FEATURE_2_DESC|功能2描述
FEATURE_3_EN|功能3英文label
FEATURE_3_ZH|功能3中文标题
FEATURE_3_DESC|功能3描述
FEATURE_4_EN|功能4英文label
FEATURE_4_ZH|功能4中文标题
FEATURE_4_DESC|功能4描述
CTA_EN|CTA按钮英文（如 JOIN THE EARLY ACCESS）
CTA_ZH|CTA按钮中文（如 申请内测资格）
FOOTER|底部署名（如 你的AI伙伴 · 你的第二大脑）
）

===ELEMENTS===
（6-8个画面要素，格式：emoji|要素名称|详细描述）

===USAGE===
（4-6条使用建议，每条以"•"开头，包括最佳工具、分辨率、排版后期建议等）

===PLATFORM===
（Midjourney/即梦/可灵/SD/Flux 各一条参数建议，针对这种编辑海报风格）

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
    const copyDeckRaw = extract('COPY_DECK');
    const elementsRaw = extract('ELEMENTS');
    const usage = extract('USAGE');
    const platform = extract('PLATFORM');

    if (!enPrompt) { console.error('Raw:', rawText); throw new Error("解析失败"); }

    const t3SigEn = (typeof window.getSignatureInstruction === 'function') ? window.getSignatureInstruction() : '';
    const t3SigZh = (typeof window.getSignatureInstructionZh === 'function') ? window.getSignatureInstructionZh() : '';
    document.getElementById('t3EnPrompt').textContent = enPrompt + t3SigEn;
    document.getElementById('t3ZhPrompt').textContent = (zhPrompt || enPrompt) + (zhPrompt ? t3SigZh : t3SigEn);
    document.getElementById('t3UsageGuide').textContent = usage;
    document.getElementById('t3PlatformNote').innerHTML = `<strong>▸ PLATFORM PARAMETERS</strong>${platform.replace(/\n/g, '<br>')}`;
    document.getElementById('t3OutputLabel').textContent = `▸ ${product.toUpperCase()} · MANIFESTO`;

    // Render copy deck (grouped sections)
    const copyDeck = document.getElementById('t3CopyDeck');
    copyDeck.innerHTML = '';

    const copyMap = {};
    copyDeckRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const idx = line.indexOf('|');
      const key = line.substring(0, idx).trim();
      const val = line.substring(idx + 1).trim();
      copyMap[key] = val;
    });

    const sections = [
      { title: 'HEADLINE · 主标题', items: [
        { label: 'English Headline', val: copyMap.EN_HEADLINE },
        { label: 'Highlight Word (accent color)', val: copyMap.EN_HEADLINE_HIGHLIGHT },
        { label: '中文主标题', val: copyMap.ZH_HEADLINE },
        { label: '中文副标题', val: copyMap.ZH_SUBTITLE },
        { label: 'Top Tagline', val: copyMap.EN_TAGLINE }
      ]},
      { title: 'FEATURES · 功能卡片（四栏）', items: [
        { label: copyMap.FEATURE_1_EN || 'Feature 1', val: `${copyMap.FEATURE_1_ZH || ''} — ${copyMap.FEATURE_1_DESC || ''}` },
        { label: copyMap.FEATURE_2_EN || 'Feature 2', val: `${copyMap.FEATURE_2_ZH || ''} — ${copyMap.FEATURE_2_DESC || ''}` },
        { label: copyMap.FEATURE_3_EN || 'Feature 3', val: `${copyMap.FEATURE_3_ZH || ''} — ${copyMap.FEATURE_3_DESC || ''}` },
        { label: copyMap.FEATURE_4_EN || 'Feature 4', val: `${copyMap.FEATURE_4_ZH || ''} — ${copyMap.FEATURE_4_DESC || ''}` }
      ]},
      { title: 'CTA + FOOTER · 行动层+署名', items: [
        { label: 'EN CTA', val: copyMap.CTA_EN },
        { label: 'ZH CTA', val: copyMap.CTA_ZH },
        { label: 'Footer Signature', val: copyMap.FOOTER }
      ]}
    ];

    sections.forEach(sec => {
      const secEl = document.createElement('div');
      secEl.className = 'copy-section';
      let html = `<div class="copy-section-title">${sec.title}</div>`;
      sec.items.forEach(it => {
        if (it.val && it.val !== ' — ' && it.val.trim()) {
          html += `<div class="copy-item"><div class="copy-item-label">${it.label}</div>${it.val}</div>`;
        }
      });
      secEl.innerHTML = html;
      copyDeck.appendChild(secEl);
    });

    // Render elements
    const viz = document.getElementById('t3ElementsViz');
    viz.innerHTML = '';
    elementsRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const parts = line.split('|').map(p => p.trim());
      const el = document.createElement('div');
      el.className = 'element-item';
      el.innerHTML = `<div class="element-icon">${parts[0] || '▸'}</div><div class="element-body"><div class="element-name">${parts[1] || ''}</div><div class="element-desc">${parts[2] || ''}</div></div>`;
      viz.appendChild(el);
    });
  } catch(err) {
    console.error(err);
    document.getElementById('t3EnPrompt').textContent = `❌ 生成失败\n原因: ${err.message}`;
  }

  document.getElementById('t3Loading').classList.remove('visible');
  ['t3s1','t3s2','t3s3','t3s4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('t3Output').classList.add('visible');
  document.getElementById('t3GenBtn').disabled = false;
  switchT3Tab(0);
}

function copyT3() {
  const en = document.getElementById('t3EnPrompt').textContent;
  const zh = document.getElementById('t3ZhPrompt').textContent;
  navigator.clipboard.writeText(`=== English ===\n${en}\n\n=== 中文 ===\n${zh}`).then(() => {
    const btn = document.querySelector('#tool3 .copy-btn');
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = 'Copy All', 2000);
  });
}

document.getElementById('t3ProductInput').addEventListener('keydown', e => { if (e.key === 'Enter') generateTool3(); });

