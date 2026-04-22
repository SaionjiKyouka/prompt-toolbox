// ============================================
// TOOL 4 — Photography Prompt (Film/Analog)
// ============================================
const T4_FILM_MAP = {
  portra400: "Kodak Portra 400, warm natural skin tones, soft pastel color palette, characteristic Kodak Portra color science with creamy highlights and lifted shadows",
  portra800: "Kodak Portra 800 pushed, warm skin tones with more pronounced grain, perfect for low-light portraiture, slightly desaturated greens",
  gold200: "Kodak Gold 200, nostalgic warm palette, golden yellow cast, vibrant reds and oranges, everyday film aesthetic",
  ektar100: "Kodak Ektar 100, ultra-fine grain, saturated colors, punchy reds and blues, landscape-oriented color science",
  pro400h: "Fuji Pro 400H pushed to ISO 800, cool pink-toned Fujifilm skin, fresh teal-cyan greens, warm peach highlights, violet-blue shadows, low contrast with lifted blacks",
  superia400: "Fuji Superia 400, Japanese cinematic aesthetic, vibrant cool greens, slightly cyan shift in shadows, clean detail retention",
  velvia50: "Fuji Velvia 50, highly saturated landscape film, intense greens and reds, rich contrast, iconic postcard-like colors",
  cinestill800: "CineStill 800T tungsten-balanced film, signature red halation around light sources, cinematic night scene color palette, magenta-teal grade",
  trix400: "Kodak Tri-X 400 black and white, classic reportage contrast, rich gritty grain, deep blacks and glowing whites, timeless documentary feel",
  hp5: "Ilford HP5 Plus 400 black and white, softer tonal gradation, journalistic feel, medium contrast, organic grain structure",
  digital: "clean digital mirrorless capture, subtle grain emulation, sharp modern rendering with slight film-inspired color grading"
};

const T4_CAMERA_MAP = {
  contax: "Contax T2 point-and-shoot, Carl Zeiss T* 38mm f/2.8 lens, compact analog aesthetic with slight vignetting, Japanese street photography feel",
  leicam6: "Leica M6 rangefinder, Summilux 50mm lens, classic 35mm film look with organic rendering, decisive-moment photojournalism quality",
  rolleiflex: "Rolleiflex TLR medium format square 6x6 frame, waist-level perspective, characteristic Zeiss Planar lens rendering with creamy bokeh",
  pentax67: "Pentax 67 medium format 6x7, shallow depth of field, signature medium format micro-contrast and creamy skin rendering, iconic for portraits",
  hasselblad: "Hasselblad 500C/M medium format 6x6, Zeiss Planar lens, legendary portrait rendering, editorial fashion quality, dimensional sharpness with soft falloff",
  mamiya7: "Mamiya 7 II rangefinder medium format 6x7, ultra-sharp 80mm lens, travel and landscape film aesthetic",
  nikonfm2: "Nikon FM2 manual SLR, 35mm film, classic Japanese glass rendering, sturdy reportage feel",
  canonae1: "Canon AE-1 Program, nostalgic 70s-80s film look, slightly warm FD lens rendering",
  disposable: "disposable Fuji QuickSnap camera, heavy grain, low-fidelity lomography aesthetic, party-photo authenticity, direct flash often present"
};

const T4_LENS_MAP = {
  "35f14": "35mm lens at f/1.4, documentary perspective, slight environmental context, natural human-eye field of view, creamy out-of-focus areas",
  "50f12": "50mm lens at f/1.2, classic nifty-fifty focal length, natural perspective matching human vision, ultra-shallow depth of field with smooth bokeh",
  "85f14": "85mm lens at f/1.4, classic portrait focal length, flattering facial compression, silky smooth background separation",
  "28f2": "28mm wide-angle lens at f/2, environmental portrait, strong sense of place, slight edge distortion adding character",
  "135f2": "135mm telephoto at f/2, compressed perspective, maximum background blur, isolated subject from distance",
  "80f28": "80mm f/2.8 medium format standard lens, signature medium format rendering with natural perspective",
  "24f14": "24mm f/1.4 wide-angle, immersive perspective, strong subject presence, environmental storytelling"
};

const T4_LIGHT_MAP = {
  goldenhour: "golden hour backlight, low-angle sun at about 10-15 degrees directly behind subject creating bright golden halo, strong rim light outlining hair and shoulders in warm gold, natural warm lens flare with soft golden streaks entering the frame, subsurface scattering on skin edges",
  bluehour: "blue hour twilight, cool ambient blue sky tones balanced with warm tungsten accent lights, gentle soft diffused light without direct sun, magic hour atmosphere, subtle color temperature contrast",
  window: "soft window light from the side, natural daylight diffused through sheer curtains, gentle wraparound modeling on the face, classic Vermeer painting quality, gradient falloff into shadow side",
  overcast: "overcast sky soft diffused natural light, even illumination with no harsh shadows, gentle color saturation, broad softbox-like quality with subtle cool cast",
  harsh: "harsh noon sunlight, strong directional shadows with hard edges, high contrast between lit and shadow areas, dramatic fashion editorial quality, crisp defined shapes",
  neon: "urban neon night lighting, colored light sources with magenta cyan and amber mixing, reflective wet surfaces, dreamy atmospheric haze, cinematic Blade Runner quality",
  candle: "warm candlelight ambience, low-key intimate lighting, glowing orange-amber tones, deep velvet shadows, soft skin rendering, baroque painting quality",
  flash: "direct on-camera flash, frontal illumination with hard light falloff, fashion editorial feel, stark subject-background separation, Terry Richardson quality",
  studio: "professional studio lighting with large softbox key light, fill card, separation light on hair, even controlled exposure, editorial magazine quality"
};

const T4_MOOD_MAP = {
  dreamy: "dreamy ethereal atmosphere, soft diffused light, lifted shadows, pastel color palette, romantic weightless quality",
  melancholy: "melancholic contemplative mood, muted desaturated palette, quiet introspection, soft gray-blue shadows",
  joyful: "joyful bright and radiant atmosphere, genuine Duchenne smile with eye-crinkling warmth, energetic light, vivid but natural colors",
  intimate: "intimate warm atmosphere, close personal proximity, soft warm light, private moment feel",
  editorial: "high editorial fashion quality, confident styled pose, magazine-worthy composition, refined color palette",
  documentary: "documentary reportage quality, authentic unposed moment, decisive-moment feel, raw natural emotion",
  cinematic: "cinematic film still quality, anamorphic aspect ratio feel, story-driven composition, movie production value",
  nostalgic: "nostalgic vintage atmosphere, faded color palette, warm film grain, memory-like quality evoking past decades",
  serene: "serene peaceful zen atmosphere, quiet stillness, harmonious composition, minimal distraction"
};

const T4_COMP_MAP = {
  halfbody: "half-body framing from waist up, subject occupying center of frame",
  fullbody: "full-body composition showing entire figure with environmental context",
  closeup: "intimate close-up of the face, eyes and expression as primary focus, shallow plane of focus",
  environmental: "environmental portrait showing subject within meaningful surroundings, place as co-subject",
  candid: "candid unposed moment, natural spontaneous gesture, documentary snapshot quality",
  overshoulder: "over-the-shoulder composition, layered foreground-subject-background depth",
  lowangle: "low angle looking up at subject, heroic empowering perspective",
  symmetrical: "perfectly symmetrical composition, subject centered, formal balanced framing"
};

const T4_PHOTOGRAPHER_MAP = {
  "": "",
  hamaya: "in the style of Hideaki Hamaya, Japanese family documentary aesthetic, warm intimate moments, soft natural light",
  kawauchi: "in the style of Rinko Kawauchi, dreamy ethereal Japanese photography, overexposed highlights, poetic fragility",
  leibovitz: "in the style of Annie Leibovitz, dramatic conceptual portraiture, rich saturated colors, narrative depth",
  mccurry: "in the style of Steve McCurry, National Geographic documentary quality, vivid true colors, piercing human connection",
  sorrenti: "in the style of Mario Sorrenti, high fashion film photography, intimate raw beauty, Calvin Klein aesthetic",
  leiter: "in the style of Saul Leiter, poetic street photography with colors as abstraction, layered reflections, painterly composition",
  mikko: "in the style of Mikko Lagerstedt, Nordic cinematic landscapes, moody atmospheric lighting",
  miike: "in the style of Yohji Yamamoto fashion campaigns, stark black and white, avant-garde silhouettes",
  erwitt: "in the style of Elliott Erwitt, witty candid humanism in black and white, decisive humorous moments",
  pingmei: "in the style of contemporary Japanese wedding photography, soft warm golden hour, film grain aesthetic, editorial bridal quality"
};

const T4_GRAIN_MAP = {
  heavy: "prominent visible film grain (0.4-0.5 strength) coating the entire image, especially noticeable in shadow areas, pushed-ISO texture",
  medium: "moderate natural film grain (0.25-0.35), organic texture adding character without overwhelming detail",
  fine: "fine subtle grain (0.15-0.2), clean rendering with gentle analog texture",
  clean: "minimal to no grain, clean modern digital rendering"
};

const T4_PRESETS = {
  wedding: { subject: "A stunning woman in an ivory silk satin wedding dress with thin spaghetti straps and a thigh-high slit, standing in a wildflower meadow during golden hour, turning to look back at camera with a radiant Duchenne smile, cathedral-length veil caught by the wind", film: "pro400h", camera: "nikonfm2", lens: "35f14", light: "goldenhour", mood: "dreamy", comp: "halfbody", photographer: "pingmei", grain: "heavy" },
  cafe: { subject: "A young woman in a cream knit sweater reading a book at a window seat in a quiet café, autumn afternoon light streaming in, steam rising from her coffee cup, soft contemplative expression", film: "portra400", camera: "contax", lens: "35f14", light: "window", mood: "intimate", comp: "environmental", photographer: "hamaya", grain: "medium" },
  street: { subject: "A pedestrian crossing a rain-slicked city street at night, neon signage reflecting in puddles, umbrella silhouette, motion blur in background traffic", film: "cinestill800", camera: "leicam6", lens: "35f14", light: "neon", mood: "cinematic", comp: "environmental", photographer: "leiter", grain: "heavy" },
  family: { subject: "A mother and young daughter laughing together in a sunny kitchen, preparing breakfast, soft domestic moment, pajamas and messy hair", film: "portra400", camera: "pentax67", lens: "80f28", light: "window", mood: "joyful", comp: "candid", photographer: "hamaya", grain: "medium" },
  fashion: { subject: "A high-fashion model in avant-garde black silk dress, confident pose against a minimalist white wall, editorial styling, dramatic makeup", film: "portra800", camera: "hasselblad", lens: "80f28", light: "studio", mood: "editorial", comp: "fullbody", photographer: "sorrenti", grain: "fine" },
  travel: { subject: "A solo traveler with a weathered backpack standing at the edge of a cliff overlooking ocean waves crashing below, Iceland coastal landscape, windswept hair", film: "ektar100", camera: "mamiya7", lens: "28f2", light: "overcast", mood: "serene", comp: "environmental", photographer: "mikko", grain: "fine" },
  bnw: { subject: "A weathered elderly man with deep wrinkles and thoughtful eyes, simple cotton shirt, leaning against a wooden doorframe, direct gaze at camera", film: "trix400", camera: "leicam6", lens: "50f12", light: "window", mood: "documentary", comp: "closeup", photographer: "erwitt", grain: "heavy" },
  neon: { subject: "A young woman in a black leather jacket walking through a Hong Kong night market, steam rising from food stalls, colorful neon signage overhead reflecting on her face", film: "cinestill800", camera: "contax", lens: "35f14", light: "neon", mood: "cinematic", comp: "candid", photographer: "leiter", grain: "heavy" }
};

function setT4Preset(key) {
  const p = T4_PRESETS[key];
  if (!p) return;
  document.getElementById('t4Subject').value = p.subject;
  document.getElementById('t4FilmSelect').value = p.film;
  document.getElementById('t4CameraSelect').value = p.camera;
  document.getElementById('t4LensSelect').value = p.lens;
  document.getElementById('t4LightSelect').value = p.light;
  document.getElementById('t4MoodSelect').value = p.mood;
  document.getElementById('t4CompSelect').value = p.comp;
  document.getElementById('t4PhotographerSelect').value = p.photographer;
  document.getElementById('t4GrainSelect').value = p.grain;
}

function switchT4Tab(n) {
  document.querySelectorAll('#tool4 .tab').forEach((t,i) => t.classList.toggle('active', i===n));
  document.querySelectorAll('#tool4 .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
}

async function generateTool4() {
  const subject = document.getElementById('t4Subject').value.trim();
  if (!subject) { document.getElementById('t4Subject').focus(); return; }

  const filmKey = document.getElementById('t4FilmSelect').value;
  const cameraKey = document.getElementById('t4CameraSelect').value;
  const lensKey = document.getElementById('t4LensSelect').value;
  const lightKey = document.getElementById('t4LightSelect').value;
  const moodKey = document.getElementById('t4MoodSelect').value;
  const compKey = document.getElementById('t4CompSelect').value;
  const photographerKey = document.getElementById('t4PhotographerSelect').value;
  const grainKey = document.getElementById('t4GrainSelect').value;

  const filmDisplay = document.getElementById('t4FilmSelect').options[document.getElementById('t4FilmSelect').selectedIndex].text;
  const cameraDisplay = document.getElementById('t4CameraSelect').options[document.getElementById('t4CameraSelect').selectedIndex].text;
  const lensDisplay = document.getElementById('t4LensSelect').options[document.getElementById('t4LensSelect').selectedIndex].text;

  document.getElementById('t4Output').classList.remove('visible');
  document.getElementById('t4Loading').classList.add('visible');
  document.getElementById('t4GenBtn').disabled = true;

  ['t4s1','t4s2','t4s3','t4s4'].forEach((id, i) => {
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
          content: `你是世界顶级的摄影提示词工程师，擅长写出极其细致的"真实胶片摄影"提示词——精确到胶片型号、光比、肢体姿态、皮肤次表面散射、镜头特性等顶级细节。

用户输入：
- 拍摄对象：${subject}

技术规格：
- 胶片：${T4_FILM_MAP[filmKey]}
- 相机：${T4_CAMERA_MAP[cameraKey]}
- 镜头：${T4_LENS_MAP[lensKey]}
- 光线：${T4_LIGHT_MAP[lightKey]}
- 情绪：${T4_MOOD_MAP[moodKey]}
- 构图：${T4_COMP_MAP[compKey]}
- 大师风格：${T4_PHOTOGRAPHER_MAP[photographerKey] || "无特定参考"}
- 颗粒：${T4_GRAIN_MAP[grainKey]}

【你的任务】
写一条极致专业的摄影提示词，参考以下真实案例的深度（这是典范）：

"Japanese-style film photograph, Fujifilm aesthetic, shot on pushed Fuji Pro 400H at ISO 800 — prominent visible film grain throughout. A woman in ivory silk satin wedding dress, confident body-twist pose — upper body facing the camera, weight shifted to her right hip, left knee slightly bent. Her dress is form-fitting mermaid silhouette with deep V-neckline, ultra-thin spaghetti straps, dramatic open back, thigh-high slit. Single-layer cathedral-length veil caught by the wind billowing upward like a white sail. She looks directly at the camera with radiant genuine Duchenne smile — her eyes crinkle warmly at the corners. The backlight is powerful and golden — the low-angle sun at about 10-15 degrees directly behind her creates: 1. A bright golden halo through her veil 2. Strong rim light outlining her hair and shoulders 3. An angelic ring of light in her wind-blown hair 4. Subtle subsurface scattering on her ear edges 5. The tulle glowing translucent gold 6. Natural warm lens flare. Cool pink-toned Fujifilm skin, greens in fresh teal-cyan, highlights in warm peach-gold, shadows leaning violet-blue. Low contrast, slightly lifted black point. 35mm lens at f/1.4, shallow depth of field with rounded Fujinon bokeh..."

【核心要求】
1. 必须包含**具体身体姿态**（重心/手势/头部角度/表情细节如"眼角鱼尾纹笑"）
2. 必须**拆解光影效果为6个编号点**（第X点光影如何作用于主体的某个部位）
3. 必须包含**皮肤次表面散射、发丝轮廓、织物透光**等高级细节
4. 必须描述**具体色彩科学**（胶片的shadow tone/highlight tone/skin tone各自什么色偏）
5. 必须包含**背景具体处理**（如"dissolved into creamy bokeh"而非只说"blurred"）
6. 必须强调**负面指令**（no artifacts, no studio lighting, no plastic skin等）

请严格按以下格式输出，使用 === 分隔符：

===EN_PROMPT===
（写一段500-700词的极其详细的英文摄影提示词，参考上述案例深度。必须按段落组织：
第1段：整体定调（aspect ratio + film + camera + mood）
第2段：主体描述（详细身体姿态 + 服装 + 表情 + 微表情）
第3段：光影6点拆解（用数字1-6列出backlight/rim light/subsurface scattering等）
第4段：皮肤/头发/织物细节
第5段：背景bokeh处理
第6段：胶片色彩科学（skin/highlight/shadow三个色调）
第7段：镜头特性（焦段/光圈/景深/镜头畸变）
第8段：收尾强调 Masterpiece + negative prompt
${photographerKey ? `确保体现 ${T4_PHOTOGRAPHER_MAP[photographerKey]}` : ''}
）

===ZH_PROMPT===
（对应中文摄影提示词，400-500字，同样按段落组织）

===SPECS===
（技术规格清单，格式：Label|Value，每行一个：
Aspect Ratio|9:16 垂直 / 3:2 横版 / 1:1 方画幅（根据构图判断）
Film Stock|${filmDisplay}
Camera Body|${cameraDisplay}
Lens & Aperture|${lensDisplay}
Lighting Setup|（简短描述）
ISO|（根据胶片给出）
Shutter Speed|（合理估算）
White Balance|（根据光线）
Color Grade|（色彩方向）
Grain Level|（${grainKey}）
Grading LUT|（推荐一个LUT名字如 Kodak 2383）
）

===LIGHTING===
（光影6点拆解，格式：序号|光效名称|详细作用描述
示例：
1|Golden Halo 金色光晕|夕阳从主体身后穿透婚纱，形成一圈金色光晕包裹头部和肩膀
2|Rim Light 轮廓光|强烈金色轮廓光勾勒发丝、裸露肩膀和背部线条
3|Subsurface Scattering 次表面散射|耳朵边缘、手指关节呈现透光的橙粉色
... 共6条）

===USAGE===
（4-6条使用建议，每条"•"开头，包括最佳工具、参数技巧、后期修图建议）

===PLATFORM===
（Midjourney/Flux Pro/SD/即梦/可灵各一条针对真实摄影的具体参数）

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
    const specsRaw = extract('SPECS');
    const lightingRaw = extract('LIGHTING');
    const usage = extract('USAGE');
    const platform = extract('PLATFORM');

    if (!enPrompt) { console.error('Raw:', rawText); throw new Error("解析失败"); }

    document.getElementById('t4EnPrompt').textContent = enPrompt;
    document.getElementById('t4ZhPrompt').textContent = zhPrompt || enPrompt;
    document.getElementById('t4UsageGuide').textContent = usage;
    document.getElementById('t4PlatformNote').innerHTML = `<strong>◉ PLATFORM PARAMETERS</strong>${platform.replace(/\n/g, '<br>')}`;
    document.getElementById('t4OutputLabel').textContent = `◉ ${filmDisplay.split('（')[0].toUpperCase()} · ${cameraDisplay.split('（')[0].toUpperCase()}`;

    // Render spec sheet
    const specSheet = document.getElementById('t4SpecSheet');
    specSheet.innerHTML = '';
    specsRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const idx = line.indexOf('|');
      const label = line.substring(0, idx).trim();
      const value = line.substring(idx + 1).trim();
      const item = document.createElement('div');
      item.className = 'spec-item';
      item.innerHTML = `<div class="spec-label">${label}</div><div class="spec-value">${value}</div>`;
      specSheet.appendChild(item);
    });

    // Render lighting breakdown
    const lightViz = document.getElementById('t4LightingViz');
    lightViz.innerHTML = '';
    lightingRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const parts = line.split('|').map(p => p.trim());
      const el = document.createElement('div');
      el.className = 'light-item';
      el.innerHTML = `<div class="light-num">${parts[0] || '◉'}</div><div class="light-body"><div class="light-name">${parts[1] || ''}</div><div class="light-desc">${parts[2] || ''}</div></div>`;
      lightViz.appendChild(el);
    });
  } catch(err) {
    console.error(err);
    document.getElementById('t4EnPrompt').textContent = `❌ 生成失败\n原因: ${err.message}`;
  }

  document.getElementById('t4Loading').classList.remove('visible');
  ['t4s1','t4s2','t4s3','t4s4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('t4Output').classList.add('visible');
  document.getElementById('t4GenBtn').disabled = false;
  switchT4Tab(0);
}

function copyT4() {
  const en = document.getElementById('t4EnPrompt').textContent;
  const zh = document.getElementById('t4ZhPrompt').textContent;
  navigator.clipboard.writeText(`=== English ===\n${en}\n\n=== 中文 ===\n${zh}`).then(() => {
    const btn = document.querySelector('#tool4 .copy-btn');
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = 'Copy All', 2000);
  });
}
