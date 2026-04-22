// ============================================
// TOOL 1 — Cross-section Infographic
// ============================================
const T1_STYLE_MAP = {
  technical: { name: "Cyberpunk Technical", colors: "electric blue (#00BFFF), amber (#FF8C00), cyan (#00FFFF), purple (#8B5CF6), hot magenta (#FF1493)", bg: "deep space black background with subtle holographic grid and light particles", effect: "glowing neon lines, translucent layered circuits, holographic HUD overlays, exploded-view component separation with glowing leader lines", typography: "bold Chinese ink-wash calligraphy title + technical monospace annotations + digital readout numerals" },
  organic: { name: "Natural Scientific Illustration", colors: "forest green (#2D6A4F), earth brown (#8B5E3C), amber yellow (#F9C74F), sky blue (#74C0FC), warm sepia (#D4A574)", bg: "aged parchment paper background with subtle texture and vignette, watercolor wash edges", effect: "meticulous hand-painted watercolor and ink botanical/zoological illustration, DK Encyclopedia style, fine hatching and stippling detail", typography: "traditional Chinese brush calligraphy title (like seal script or running script) + elegant serif body text + handwritten-style annotations" },
  vintage: { name: "Steampunk Vintage Blueprint", colors: "brass gold (#B8860B), aged copper (#AD6F3B), dark sepia (#704214), ivory (#FFFFF0), blueprint cyan (#2F7A8F)", bg: "aged blueprint paper or technical manual page, with coffee stains and edge wear, mechanical grid background", effect: "19th-century engraving style cross-hatching, detailed mechanical gears, copper pipe details, weathered patina, Da Vinci codex aesthetic", typography: "Victorian ornate serif display title + typewriter-style body text + handwritten engineer's notes" },
  minimal: { name: "Editorial Minimal", colors: "pure black (#000), accent red (#E63946), charcoal (#333), single accent color pop", bg: "pure white or warm off-white paper, generous negative space, strict modular grid", effect: "Swiss design precision, ultra-clean vector lines, flat geometric abstraction, Kinfolk magazine aesthetic", typography: "ultra-thin geometric sans-serif display + refined serif body + precise numerical data" },
  cinematic: { name: "Cinematic Dark Editorial", colors: "deep navy (#0D1117), blood red (#8B0000), molten gold (#FFD700), void black (#000), silver highlights", bg: "dramatic cinematic darkness with volumetric lighting, smoke and atmosphere, moody chiaroscuro", effect: "film grain overlay, high contrast dramatic lighting, National Geographic cover aesthetic, museum exhibit quality", typography: "epic display serif with dramatic weight contrast, elegant Chinese calligraphy accents" },
  encyclopedia: { name: "Ancient Manuscript Encyclopedia", colors: "aged ivory (#EDE0C8), umber brown (#6F4E37), faded crimson (#8B3A3A), ochre (#CC7722), ink black", bg: "ancient vellum or rice paper texture with subtle aging, tea-stained edges, silk fiber visible", effect: "traditional Chinese gongbi painting meets Audubon-style natural history illustration, ultra-detailed scientific rendering, hand-drawn taxonomic specimens", typography: "large brush-painted Chinese title with red seal stamp + classical serif body + traditional vertical annotation strips" },
  magazine: { name: "WIRED Magazine Tech", colors: "pure white (#FFF), electric red (#FF003C), deep black (#111), neon yellow accent (#F0FF00)", bg: "crisp white or subtle gradient, modern editorial layout with bold modular blocks", effect: "high-tech editorial photography meets infographic, bold geometric callouts, energetic angular compositions", typography: "heavy sans-serif display (Druk-style) + clean helvetica body + oversized numbers as design elements" }
};

const T1_VIEW_MAP = {
  isometric: "isometric 3D cross-section cutaway at 30-45 degree angle, floating in space showing all internal layers simultaneously",
  vertical: "vertical top-down layered diagram, each stratum clearly separated with precise measurement markers",
  exploded: "exploded axonometric view with all components separated and spread outward from center, connected by dotted leader lines",
  cross: "direct frontal cross-section cut, like slicing the subject in half, showing internal structure in full detail",
  timeline: "horizontal timeline process diagram showing transformation stages from left to right with connecting flow arrows"
};

function setT1Topic(t) {
  document.getElementById('t1TopicInput').value = t;
  document.getElementById('t1TopicInput').focus();
}

function switchT1Tab(n) {
  document.querySelectorAll('#tool1 .tab').forEach((t,i) => t.classList.toggle('active', i===n));
  document.querySelectorAll('#tool1 .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
}

async function generateTool1() {
  const topic = document.getElementById('t1TopicInput').value.trim();
  if (!topic) { document.getElementById('t1TopicInput').focus(); return; }

  const style = T1_STYLE_MAP[document.getElementById('t1StyleSelect').value];
  const view = T1_VIEW_MAP[document.getElementById('t1ViewSelect').value];

  document.getElementById('t1Output').classList.remove('visible');
  document.getElementById('t1Loading').classList.add('visible');
  document.getElementById('t1GenBtn').disabled = true;

  ['t1s1','t1s2','t1s3','t1s4'].forEach((id, i) => {
    setTimeout(() => document.getElementById(id).classList.add('visible'), i * 400);
  });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        messages: [{
          role: "user",
          content: `你是世界顶级的信息图设计师和AI图像提示词工程师，专门创作"百科级深度信息图海报"——类似《国家地理》《DK百科全书》《WIRED》杂志风格的高密度信息图。

用户主题：「${topic}」
视觉风格：${style.name}
展示角度：${view}

【核心要求】
生成的不是简单剖面图，而是一张**高信息密度的专题百科海报**。必须包含：
- 中央主体图（大）
- 8-12个信息板块环绕布局
- 每个板块都有独立的小图 + 文字标注 + 数据
- 专业数据表、性能参数、时间线、流程图、分布图等
- 显微细节放大、关联生态、应用场景
- 艺术化的标题排版（毛笔字/衬线字/霓虹字等）

请严格按以下格式输出，使用 === 分隔符，不要输出JSON，不要有任何额外说明：

===EN_PROMPT===
（写一段450-600词的详细英文提示词，必须描述：poster-format infographic, magazine-style editorial layout, dominant hero illustration of [主题] in ${view}, 8-12 surrounding information modules/cards with mini-illustrations labels callouts and data, 具体列出至少8个模块名称, 视觉风格: ${style.effect}, 色彩: ${style.colors}, 背景: ${style.bg}, 排版: ${style.typography}, bilingual Chinese-English labels throughout, ultra-detailed museum-quality scientific illustration, encyclopedic density of information, hyperdetailed 8K poster）

===ZH_PROMPT===
（写一段300-400字中文提示词，对应英文版本）

===LAYERS===
（列出10-12个信息板块，每行一个，格式：板块编号|板块名称（中英双语）|详细内容描述|主题色
示例：01|外部形态 External Morphology|头部/胸部/腹部解剖|#8B5E3C）

===USAGE===
（用中文写4-6条专业使用建议，每条以"•"开头）

===PLATFORM===
（针对Midjourney/DALL-E/Stable Diffusion/可灵/即梦的具体参数，每个平台一行）

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
    const layersRaw = extract('LAYERS');
    const usage = extract('USAGE');
    const platform = extract('PLATFORM');

    if (!enPrompt) { console.error('Raw:', rawText); throw new Error("解析失败"); }

    const layers = layersRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).map(l => {
      const parts = l.split('|').map(p => p.trim());
      return { depth: parts[0] || '', name: parts[1] || '', desc: parts[2] || '', color: parts[3] || '#3b82f6' };
    });

    document.getElementById('t1EnPrompt').textContent = enPrompt;
    document.getElementById('t1ZhPrompt').textContent = zhPrompt || enPrompt;
    document.getElementById('t1UsageGuide').textContent = usage;
    document.getElementById('t1UsageNote').innerHTML = `<strong>平台参数建议：</strong><br>${platform.replace(/\n/g, '<br>')}`;
    document.getElementById('t1OutputLabel').textContent = `// OUTPUT: ${topic.toUpperCase()}`;

    const viz = document.getElementById('t1LayerViz');
    viz.innerHTML = '';
    layers.forEach(layer => {
      const el = document.createElement('div');
      el.className = 'layer-item';
      el.style.borderLeftColor = layer.color || '#3b82f6';
      el.innerHTML = `<span class="layer-depth">${layer.depth}</span><span class="layer-name">${layer.name}</span><span class="layer-desc">${layer.desc}</span>`;
      viz.appendChild(el);
    });
  } catch(err) {
    console.error(err);
    document.getElementById('t1EnPrompt').textContent = `❌ 生成失败\n原因: ${err.message}`;
  }

  document.getElementById('t1Loading').classList.remove('visible');
  ['t1s1','t1s2','t1s3','t1s4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('t1Output').classList.add('visible');
  document.getElementById('t1GenBtn').disabled = false;
  switchT1Tab(0);
}

function copyT1() {
  const en = document.getElementById('t1EnPrompt').textContent;
  const zh = document.getElementById('t1ZhPrompt').textContent;
  navigator.clipboard.writeText(`=== English ===\n${en}\n\n=== 中文 ===\n${zh}`).then(() => {
    const btn = document.querySelector('#tool1 .copy-btn');
    btn.textContent = '✓ COPIED';
    setTimeout(() => btn.textContent = 'COPY ALL', 2000);
  });
}

document.getElementById('t1TopicInput').addEventListener('keydown', e => { if (e.key === 'Enter') generateTool1(); });

