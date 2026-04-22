// ============================================
// TOOL 2 — Cosplay Poster
// ============================================
const T2_MOOD_MAP = {
  baroque: { name: "Baroque Dark Fantasy", lighting: "Cinematic studio lighting with dramatic rim light, warm candlelit ambience, volumetric god rays piercing through darkness, Baroque chiaroscuro contrast", palette: "deep crimson, obsidian black, molten gold foil accents, ivory highlights, muted desaturated shadows", mood_desc: "巴洛克暗黑奇幻氛围，戏剧化光影" },
  divine: { name: "Divine Ethereal", lighting: "Soft divine backlight, ethereal glow, floating light particles, dreamy bokeh, heavenly atmosphere with mist", palette: "pearl white, champagne gold, sky blue, lavender, luminous pastel palette", mood_desc: "神性空灵氛围，仙气缭绕的光感" },
  gothic: { name: "Victorian Gothic", lighting: "Gas-lamp golden glow, deep shadowed corners, stained glass light fragments, moody vintage tungsten warmth", palette: "wine burgundy, antique brass, midnight velvet, dusty rose, aged sepia", mood_desc: "维多利亚哥特风，古典油画质感" },
  oriental: { name: "Oriental Elegance", lighting: "Soft paper-lantern diffused lighting, gentle golden hour glow, delicate shadows like traditional ink wash", palette: "celadon green, vermillion red, rice-paper ivory, ink black, cherry blossom pink, muted jade", mood_desc: "东方古典雅致，水墨与工笔的光影" },
  cyberpunk: { name: "Cyberpunk Neon", lighting: "Neon signage reflections, magenta and cyan rim lighting, rain-slicked surfaces with light refractions, holographic glitch effects", palette: "electric magenta, cyan blue, acid yellow, deep black, chrome silver", mood_desc: "赛博朋克霓虹，镜面反光的未来感" },
  cinematic: { name: "Hollywood Cinematic", lighting: "Three-point studio lighting, anamorphic lens flares, teal and orange color grading, blockbuster film quality", palette: "teal shadows, orange skin tones, silver highlights, deep contrast", mood_desc: "好莱坞大片质感，电影级调色" },
  vintage: { name: "Vintage Film Poster", lighting: "Faded film print aesthetic, warm nostalgic glow, grainy light leaks, muted 70s color palette", palette: "mustard yellow, faded red, cream ivory, olive green, paper-aged beige", mood_desc: "复古电影海报，胶片颗粒质感" }
};

const T2_COMP_MAP = {
  portrait: "vertical portrait poster composition, 2:3 aspect ratio",
  halfbody: "half-body close-up composition, dramatic portrait framing",
  fullbody: "full-body epic composition with heroic stance, tall vertical framing",
  dualshot: "dual-character composition with main subject prominent, companion figure balancing",
  bust: "classical bust portrait composition, shoulders-up framing"
};

const T2_BG_MAP = {
  charparty: "background features secondary characters from the same series, arranged in 2D anime illustration style with flat stylized coloring",
  landscape: "background is a 2D anime illustration style landscape or setting, clearly distinct flat artwork aesthetic from the photorealistic foreground",
  symbolic: "background features symbolic heraldry, emblems, magical circles or iconic motifs in 2D graphic illustration style",
  minimal: "background is a minimal solid color or subtle gradient, focusing all attention on the foreground subject",
  mixed: "background combines 2D anime illustrated elements with secondary characters and symbolic motifs in a layered composition"
};

function setT2Char(name, title) {
  document.getElementById('t2CharInput').value = name;
  document.getElementById('t2TitleInput').value = title;
}

function switchT2Tab(n) {
  document.querySelectorAll('#tool2 .tab').forEach((t,i) => t.classList.toggle('active', i===n));
  document.querySelectorAll('#tool2 .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
}

async function generateTool2() {
  const char = document.getElementById('t2CharInput').value.trim();
  if (!char) { document.getElementById('t2CharInput').focus(); return; }

  const title = document.getElementById('t2TitleInput').value.trim() || char.toUpperCase();
  const mood = T2_MOOD_MAP[document.getElementById('t2MoodSelect').value];
  const comp = T2_COMP_MAP[document.getElementById('t2CompSelect').value];
  const bg = T2_BG_MAP[document.getElementById('t2BgSelect').value];

  document.getElementById('t2Output').classList.remove('visible');
  document.getElementById('t2Loading').classList.add('visible');
  document.getElementById('t2GenBtn').disabled = true;

  ['t2s1','t2s2','t2s3','t2s4'].forEach((id, i) => {
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
          content: `你是世界顶级的AI图像提示词工程师，专门创作"真人Cosplay + 2D动漫插画混合风格海报"的提示词。

用户输入：
- 角色：${char}
- 作品标题：${title}
- 氛围风格：${mood.name} - ${mood.mood_desc}
- 构图：${comp}
- 背景：${bg}

【核心技法】三大核心技法：
1. 空间分层：前景真人cosplay，背景2D动漫插画
2. 字体材质：标题文字用引号包裹+指定材质（elegant serif typography, gold foil texture）
3. 光影中和：用 Cinematic/Baroque/Editorial 等电影感词汇

【角色知识】根据「${char}」描述：标志性服装/特征/姿态/相关角色/世界观

请严格按以下格式输出，使用 === 分隔符：

===EN_PROMPT===
（400-550词完整英文提示词，包含 FOREGROUND/BACKGROUND/LIGHTING/TYPOGRAPHY/COLOR PALETTE/STYLE 结构化部分）

FOREGROUND: Main subject [${char} English name] in hyperrealistic cosplay style, [pose], wearing [详细服装], [标志特征], photorealistic skin texture, professional portrait photography quality.
BACKGROUND: [${bg}] featuring [相关角色/场景] in 2D anime illustration style, flat stylized coloring, clearly distinct from foreground.
LIGHTING: ${mood.lighting}.
TYPOGRAPHY: Large title "${title}" in elegant serif typography with gold foil texture, smaller subtitle "${char}" in refined calligraphy.
COLOR PALETTE: ${mood.palette}.
STYLE: ${comp}, movie poster composition, editorial magazine quality, ultra-detailed 8K cinematic rendering, hybrid live-action cosplay and anime illustration aesthetic.

===ZH_PROMPT===
（250-350字中文提示词）

===ELEMENTS===
（6-8个画面要素，格式：emoji|要素名称|详细描述
示例：👤|主体角色|真人cos风格的雅儿贝德，黑色翅膀）

===USAGE===
（4-6条使用建议，每条"•"开头）

===PLATFORM===
（Midjourney/可灵/即梦/SD/Flux各一条参数建议）

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
    const elementsRaw = extract('ELEMENTS');
    const usage = extract('USAGE');
    const platform = extract('PLATFORM');

    if (!enPrompt) { console.error('Raw:', rawText); throw new Error("解析失败"); }

    document.getElementById('t2EnPrompt').textContent = enPrompt;
    document.getElementById('t2ZhPrompt').textContent = zhPrompt || enPrompt;
    document.getElementById('t2UsageGuide').textContent = usage;
    document.getElementById('t2PlatformNote').innerHTML = `<strong>◆ PLATFORM PARAMETERS</strong>${platform.replace(/\n/g, '<br>')}`;
    document.getElementById('t2OutputLabel').textContent = `✦ ${char.toUpperCase()} · ${mood.name.toUpperCase()}`;

    const viz = document.getElementById('t2ElementsViz');
    viz.innerHTML = '';
    elementsRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const parts = line.split('|').map(p => p.trim());
      const el = document.createElement('div');
      el.className = 'element-item';
      el.innerHTML = `<div class="element-icon">${parts[0] || '✦'}</div><div class="element-body"><div class="element-name">${parts[1] || ''}</div><div class="element-desc">${parts[2] || ''}</div></div>`;
      viz.appendChild(el);
    });
  } catch(err) {
    console.error(err);
    document.getElementById('t2EnPrompt').textContent = `❌ 生成失败\n原因: ${err.message}`;
  }

  document.getElementById('t2Loading').classList.remove('visible');
  ['t2s1','t2s2','t2s3','t2s4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('t2Output').classList.add('visible');
  document.getElementById('t2GenBtn').disabled = false;
  switchT2Tab(0);
}

function copyT2() {
  const en = document.getElementById('t2EnPrompt').textContent;
  const zh = document.getElementById('t2ZhPrompt').textContent;
  navigator.clipboard.writeText(`=== English ===\n${en}\n\n=== 中文 ===\n${zh}`).then(() => {
    const btn = document.querySelector('#tool2 .copy-btn');
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  });
}

document.getElementById('t2CharInput').addEventListener('keydown', e => { if (e.key === 'Enter') generateTool2(); });

