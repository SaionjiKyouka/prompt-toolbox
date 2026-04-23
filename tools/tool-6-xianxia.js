// ============================================
// TOOL 6 — Xianxia Character Poster (仙侠角色海报)
// ============================================

// 人物气质 · 门派/身份
const T6_CHARACTER_MAP = {
  xianjun: { name: "仙君 Immortal Lord", desc: "male immortal cultivator with dignified serene expression, noble ethereal aura, long flowing black hair with elaborate silver/jade crown hair ornament (发冠), wearing pristine white and pale blue Hanfu robes, refined aristocratic features" },
  jianxian: { name: "剑仙 Sword Immortal", desc: "male sword cultivator with cool piercing gaze, confident stance, hair partially tied up with simple crown, wearing blue-gray sword cultivator robes with silver embroidery, ancient sword strapped to back, lean athletic build" },
  mozun: { name: "魔尊 Demon Sovereign", desc: "male demonic cultivator with sharp cold expression, one red/crimson eye and one black eye, long black hair flowing freely, wearing black and deep crimson robes with gold demon motifs, dark aura emanating, fierce beauty" },
  fozi: { name: "佛子 Buddha's Disciple", desc: "male Buddhist cultivator with peaceful compassionate expression, shaved or tied-back hair, wearing layered monk robes in saffron/cream/gold, prayer beads on wrist, golden halo-like energy behind head" },
  yixian: { name: "医仙 Medicine Immortal", desc: "gentle healer immortal with kind caring expression, long hair half-tied with medicinal herb ornaments, wearing soft sage-green and white robes, carrying medicinal gourd or herb basket, warm nurturing aura" },
  qinMo: { name: "琴魔 Qin Demon", desc: "ethereal music cultivator with melancholic beauty, long dark hair partially covering one eye, wearing flowing black and silver robes with musical notation patterns, guqin nearby, mysterious aura" },
  huyao: { name: "狐妖 Fox Spirit", desc: "enchanting fox spirit with nine fluffy tails, beautiful seductive appearance, red/orange fox ears, golden eyes, long red hair with gold ornaments, wearing crimson and gold ceremonial robes, mischievous allure" },
  xianzi: { name: "仙子 Female Immortal", desc: "female immortal goddess with celestial beauty, elegant bun with elaborate crown headpiece (凤冠/珠冠), pearl and jade earrings, wearing translucent white and silver-blue flowing robes with star patterns, serene divine aura" },
  guimei: { name: "鬼魅 Ghost Enchantress", desc: "female ghost cultivator with pale otherworldly beauty, long black hair cascading freely, crimson lips, wearing tattered white funeral robes with blood-red accents, translucent skin, haunting sorrowful gaze" },
  neutral: { name: "中性修士 Androgynous Cultivator", desc: "androgynous cultivator with ethereal beauty transcending gender, long hair with refined jeweled crown, wearing flowing pale silk robes with gradient silver-blue, graceful neutral pose" }
};

// 叙事动作 · Pose & Action
const T6_ACTION_MAP = {
  playMusic: { name: "奏乐 Playing Music", desc: "playing a traditional Chinese instrument (flute/dizi horizontally at the lips, or guqin zither on lap with hands plucking strings, or pipa lute), eyes closed in musical trance, graceful fingering, luminous sound waves emanating from the instrument" },
  swordFlight: { name: "御剑 Sword Riding", desc: "standing confidently atop a flying sword mid-air, long robes and hair billowing dramatically backward, one hand on sword hilt or forming a hand seal, soaring through clouds" },
  meditate: { name: "打坐 Meditation", desc: "seated in lotus position on a stone platform or lotus pedestal, hands forming a meditation mudra (手印), eyes closed in deep concentration, glowing energy circulating around the body" },
  flyAscend: { name: "飞天 Ascending Flight", desc: "flying upward gracefully with arms spread, robes and ribbons billowing dramatically as if caught in divine wind, looking up toward the heavens, half-turned body pose" },
  swordDraw: { name: "执剑 Sword Stance", desc: "holding an ancient sword either vertically in front of the face in a ceremonial pose, or diagonally across the body in a warrior stance, cold determined expression, sword emitting faint glow" },
  holdFlower: { name: "执花 Holding Flower", desc: "elegantly holding a single blossoming flower (peach blossom, plum, or lotus) up toward the face, gazing at it contemplatively with a slight smile, other hand delicately lifted" },
  castSpell: { name: "施法 Casting Spell", desc: "one hand extended forward with fingers forming an intricate spell seal, the other hand raised holding a glowing talisman or formation compass, magical runes floating around the hands" },
  recitSutra: { name: "诵经 Reciting Sutra", desc: "standing or kneeling with hands held together in prayer position, eyes gently closed, lips slightly parted as if whispering sacred text, golden sutra characters floating in the air around them" },
  rideBeast: { name: "驭兽 Riding Beast", desc: "riding atop a mythical creature (celestial crane, nine-tailed fox, dragon, or qilin), one hand gripping its mane or holding reins, cape/robes streaming backward, beast's glowing eyes and luminous form visible" },
  standPose: { name: "静立 Standing Pose", desc: "standing in a graceful contemplative pose with one hand resting on a belt ornament or holding a folding fan, body slightly turned in three-quarter view, gaze directed off-frame" },
  bloodOath: { name: "歃血 Blood Pact", desc: "dramatic pose with blood-stained fingers or sword, cold fierce expression, one hand raised as if completing a dark ritual, red aura swirling, hair partially covering face" },
  floatingPose: { name: "悬浮 Levitating", desc: "floating mid-air in a graceful pose, robes fanning out beneath them like petals, legs slightly crossed or elegantly positioned, one hand raised toward the moon, serene expression" }
};

// 曼陀罗背景 · Mandala Background
const T6_MANDALA_MAP = {
  fullMoon: { name: "满月法阵 Full Moon Array", desc: "giant luminous full moon occupying the upper half of the composition, the moon's surface etched with intricate golden runic formations and celestial patterns, cloudy wisps drifting across its face, forming a sacred halo behind the figure" },
  bloodMoon: { name: "血月 Blood Moon", desc: "massive blood-red crimson moon dominating the upper composition, ominous dark runes burning on its surface, demonic energy radiating outward, creating a dark sinister backdrop" },
  bagua: { name: "八卦阵 Bagua Formation", desc: "intricate circular Bagua (eight trigrams) formation suspended behind the figure like a magical wheel, glowing Daoist symbols and yin-yang patterns, rotating slightly with divine energy" },
  sanskritWheel: { name: "梵文咒轮 Sanskrit Dharma Wheel", desc: "golden Buddhist dharma wheel (法轮) with Sanskrit mantras and lotus petal patterns, glowing serenely behind the figure, emanating compassionate golden light" },
  starMap: { name: "星座图 Constellation Map", desc: "celestial constellation chart with glowing stars connected by silver lines forming mythical zodiac patterns, galaxies and nebulae visible, cosmic backdrop of pure starlight" },
  taichi: { name: "太极图 Taiji Diagram", desc: "giant rotating Taiji (yin-yang) diagram glowing with divine light, black and white halves swirling slowly, classical Daoist mystical backdrop" },
  lotusArray: { name: "莲花法阵 Lotus Formation", desc: "massive blooming lotus flower formation with concentric petals of light, each petal inscribed with sacred symbols, golden Buddhist aura radiating outward" },
  voidVortex: { name: "虚空漩涡 Void Vortex", desc: "mysterious swirling vortex of darkness and starlight behind the figure, galactic energy spiraling inward, cosmic depth effect like a portal to another dimension" }
};

// 场景环境 · Environment
const T6_SCENE_MAP = {
  bambooForest: "mystical bamboo forest at night, tall bamboo stalks on both sides of the frame with moonlight filtering through, mist curling between the bamboo",
  cloudSea: "vast sea of clouds extending to infinity, the figure floating above the clouds, distant mountain peaks piercing through the cloud sea",
  snowMountain: "towering snow-capped mountain peaks in the background, cold wind carrying snowflakes, crystalline ice formations",
  palace: "ancient Chinese immortal palace architecture with soaring eaves and floating pavilions, ethereal palaces hovering in the distance",
  abyss: "dark mystical abyss with red energy veins, ancient stone pillars crumbling into darkness, demonic atmosphere",
  lotusPond: "serene lotus pond with blooming lotuses floating on calm water, reflections mirroring the moon and figure",
  starryField: "vast cosmic starfield with nebulae and distant galaxies, the figure suspended in deep space",
  plumGarden: "enchanted plum blossom garden in bloom, pink and red petals drifting through the scene, twisted ancient plum trees",
  templeRuins: "ancient temple ruins overgrown with spiritual plants, crumbling stone buddhas, incense smoke rising",
  cherryBlossom: "enchanted cherry blossom forest in full bloom, petals cascading through the air, soft pink atmosphere",
  wintersea: "frozen crystalline sea under aurora-like celestial phenomena, ice floes and mystical light pillars"
};

// 能量流形 · Energy Flow
const T6_ENERGY_MAP = {
  starRibbon: "luminous star-filled ribbons of light in silver-blue color wrapping around the figure, sparkling particle trails, translucent and ethereal quality",
  swordQi: "sharp golden sword qi (剑气) streaming from the sword in blade-like energy arcs, cutting through the air with razor precision",
  bloodAura: "ominous crimson blood-red energy tendrils swirling around the figure, dark purple sparks, demonic power manifestation",
  buddhaLight: "warm golden Buddha-light radiating from the figure in soft rays, lotus-shaped energy blossoms, compassionate glow",
  lightning: "arcs of silver-white divine lightning crackling around the figure, electric blue energy sparks, heavenly thunder aura",
  petalFlow: "rain of flower petals (peach/plum/cherry) flowing around the figure carried by divine wind, pink and white spiraling",
  iceShards: "crystalline ice shards and frost particles floating around the figure, cold blue aura, frozen breath visible",
  mistClouds: "ethereal wisps of mountain mist and spirit clouds wrapping around the figure like living silk",
  starFall: "cascading star fragments and cosmic dust falling around the figure, celestial meteor shower effect",
  inkWash: "flowing calligraphic ink wash streams in black and silver, like abstract Chinese calligraphy strokes come alive"
};

// 色调 · Color Tone
const T6_TONE_MAP = {
  moonCyan: { name: "月白青蓝 Moon White & Cyan", desc: "pure moonlight silver-white dominant, deep indigo blue shadows, accent cyan highlights, absolutely zero warm tones, cold ethereal palette" },
  bloodGold: { name: "赤血金 Blood Gold", desc: "deep crimson red and black dominant, molten gold accents, dark and demonic color scheme, dramatic fire-and-blood palette" },
  inkGold: { name: "墨金 Ink & Gold", desc: "deep ink black and silver gray dominant, antique gold accents, classical scholarly palette, muted refined tones" },
  jadeGreen: { name: "青碧 Jade Green", desc: "celadon jade green dominant, soft moonlight silver, touches of pale gold, tranquil nature-inspired palette" },
  snowSilver: { name: "雪白银 Snow Silver", desc: "pure snow white dominant, platinum silver highlights, pale ice-blue accents, pristine cold crystalline palette" },
  twilightPurple: { name: "暮色紫 Twilight Purple", desc: "deep violet and indigo purple dominant, starlit silver accents, pale pink highlights, mystical dusk palette" },
  autumnRed: { name: "秋枫红 Autumn Maple", desc: "warm maple red and amber dominant, golden yellow accents, muted earth tones, autumnal romantic palette" }
};

// 题字风格 · Text Style
const T6_TEXT_MAP = {
  fourChar: "elegant vertical Chinese calligraphy text placed in the upper right or left corner, 4 Chinese characters in refined brush-script style with a small red vermillion seal stamp below (印章), traditional poetic inscription aesthetic",
  poemLine: "vertical column of classical Chinese poetry (1-2 lines from a classical poem) in graceful calligraphy, placed along the edge of the frame, small red seal stamp at the end",
  schoolSigil: "stylized sect or school symbol/emblem (门派徽记) in corner, with small text naming the school, mystical heraldic design",
  noText: "no text overlay, pure visual composition without any calligraphy or characters",
  titleSeal: "large ornamental Chinese title character (single dramatic character like 仙/剑/梦/月) as a design element, with surrounding small annotation text and red seal"
};

function switchT6Tab(n) {
  document.querySelectorAll('#tool6 .tab').forEach((t,i) => t.classList.toggle('active', i===n));
  document.querySelectorAll('#tool6 .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
}

function setT6Preset(character, action, mandala, scene, energy, tone) {
  document.getElementById('t6CharacterSelect').value = character;
  document.getElementById('t6ActionSelect').value = action;
  document.getElementById('t6MandalaSelect').value = mandala;
  document.getElementById('t6SceneSelect').value = scene;
  document.getElementById('t6EnergySelect').value = energy;
  document.getElementById('t6ToneSelect').value = tone;
}

async function generateTool6() {
  const name = document.getElementById('t6NameInput').value.trim();
  const title = document.getElementById('t6TitleInput').value.trim();
  const characterKey = document.getElementById('t6CharacterSelect').value;
  const actionKey = document.getElementById('t6ActionSelect').value;
  const mandalaKey = document.getElementById('t6MandalaSelect').value;
  const sceneKey = document.getElementById('t6SceneSelect').value;
  const energyKey = document.getElementById('t6EnergySelect').value;
  const toneKey = document.getElementById('t6ToneSelect').value;
  const textKey = document.getElementById('t6TextSelect').value;

  const character = T6_CHARACTER_MAP[characterKey];
  const action = T6_ACTION_MAP[actionKey];
  const mandala = T6_MANDALA_MAP[mandalaKey];
  const scene = T6_SCENE_MAP[sceneKey];
  const energy = T6_ENERGY_MAP[energyKey];
  const tone = T6_TONE_MAP[toneKey];
  const text = T6_TEXT_MAP[textKey];

  document.getElementById('t6Output').classList.remove('visible');
  document.getElementById('t6Loading').classList.add('visible');
  document.getElementById('t6GenBtn').disabled = true;

  ['t6s1','t6s2','t6s3','t6s4'].forEach((id, i) => {
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
          content: `你是世界顶级的"东方仙侠"数字艺术总监，专门创作具有强烈月光氛围和法阵符文背景的仙侠角色海报。你必须深谙以下风格核心：

【★ 仙侠角色海报 · 视觉 DNA（不可变的灵魂）】
无论人物做什么动作、什么门派，以下元素必须始终存在，是整个风格的识别标志：

1. **巨型曼陀罗背景** — 人物身后必有一个发光的巨型符文背景（满月/法阵/咒轮等），占画面上半部约 50%，镶嵌繁复符文图案，形成神圣光晕
2. **星辉能量丝带** — 半透明发光的流光丝带环绕身体，带粒子光效
3. **飘逸仙衣** — 多层半透明纱衣，下摆如水流，袖口宽大
4. **繁复冠冕/头饰** — 精致金属工艺头饰，嵌宝石悬珠链
5. **冷调月光氛围** — 以银白、靛蓝、青碧为主，零暖色或极少暖色
6. **2:3 竖版构图** — 永远是竖版人物肖像海报

【★ 用户当前配置】
- 角色名/名号：${name || '（未提供，请自拟一个富有诗意的名号）'}
- 作品副标题：${title || '（未提供）'}

- 人物气质：${character.name}
  形象：${character.desc}

- 叙事动作：${action.name}
  描述：${action.desc}

- 曼陀罗背景：${mandala.name}
  描述：${mandala.desc}

- 场景环境：${scene}

- 能量流形：${energy}

- 色调系统：${tone.name}
  描述：${tone.desc}

- 题字风格：${text}

【★ 学习示范：艺术总监级 prompt 深度】
参考这种深度（这是此风格的标杆）：

"竖版2:3构图仙侠角色海报，一位东方仙君身着月白素色华服，长发如墨，戴繁复银质发冠嵌绿松石宝珠，闭目横笛轻吟；身后巨型满月符文法阵占据画面上半部分，月面上铭刻流光金色符文与星座图案，云雾流绕；人物周身缠绕半透明青蓝色星辉丝带，带银色星尘粒子效果，丝带如音波般从笛身流出；背景两侧墨竹静立，远处隐约可见山中古殿剪影；整体色调以月白、深靛、青碧为主，零暖色，神秘清冷仙气氛围；画面右上角四字竖排毛笔字'踏歌长啸'下加小字'星剑如梦'，配红色朱砂印章；细腻工笔画+数字插画混合技法，超精细，8K，商业级海报质感。"

观察这个标杆：
✓ 明确"竖版2:3构图仙侠角色海报"
✓ 具体到服饰细节（月白华服、银质发冠、绿松石）
✓ 动作描述清晰（闭目横笛）
✓ 曼陀罗精细描述（满月+符文+金色图案+云雾）
✓ 能量丝带细节（青蓝色+银色星尘+如音波般从笛身流出）
✓ 场景层次（墨竹+远处古殿）
✓ 色调规则明确（零暖色）
✓ 题字系统完整（位置+内容+印章）

请严格按以下格式输出，使用 === 分隔符，不要输出JSON：

===EN_PROMPT===
（500-700词的艺术总监级英文提示词，按以下 9 段结构组织：

第1段 OVERALL: vertical 2:3 portrait xianxia character poster, oriental fantasy digital illustration masterpiece.

第2段 CHARACTER: ${character.desc}. ${name ? 'Named "' + name + '"' : ''}

第3段 ACTION: ${action.desc}.

第4段 MANDALA BACKGROUND (signature element): ${mandala.desc}. This is THE visual anchor of the composition, occupying the upper 40-50% of the frame, glowing intensely behind the figure's head and shoulders creating a divine halo effect.

第5段 ATTIRE & ORNAMENTS: layered flowing Hanfu robes with translucent silk outer layers, wide sleeves cascading like water, ornate metalwork hair crown (发冠) with inlaid gems and hanging tassels/beads, delicate jewelry details, multi-layered with intricate embroidery patterns.

第6段 ENERGY FLOW: ${energy}, interweaving with the figure's robes and hair, creating a sense of motion and divine energy. The energy should feel alive — never a static overlay.

第7段 ENVIRONMENT: ${scene}, providing atmospheric depth but subtly — the figure is the hero, environment is supporting context.

第8段 COLOR & LIGHTING: ${tone.desc}. Lighting focuses on: (a) moonlight from above casting silver rim light on the figure, (b) the mandala's internal glow, (c) energy ribbons' luminous particles, (d) subtle highlights on jewelry and fabric. Strong atmospheric depth with mist and particles catching the light.

第9段 TYPOGRAPHY: ${text}. ${name ? 'Include character name "' + name + '" elegantly' : ''} ${title ? 'with subtitle "' + title + '"' : ''}. Typography uses muted gold or moonlight ivory, harmonizing with the cold palette.

第10段 QUALITY: detailed fine-art gongbi illustration merged with digital painting technique, hyperdetailed fabric and hair, volumetric light, particle effects throughout, cinematic depth, 8K museum-quality xianxia art poster, masterpiece.）

===ZH_PROMPT===
（350-500字中文提示词，对应英文版本，按段落组织，达到示范深度）

===ELEMENTS===
（列出 8 个画面核心要素，格式：emoji|要素名称|详细描述
示例：
🌕|曼陀罗背景|巨型满月法阵，镶嵌金色符文
👘|服饰|月白多层纱衣，银质宽袖
👑|头冠|繁复银冠嵌绿松石
💫|能量丝带|青蓝星辉缠绕，带银色粒子
🎵|动作|横笛轻吟，闭目陶醉
🌫️|场景|墨竹林+远处古殿剪影
🎨|色调|月白+深靛+青碧，零暖色
📜|题字|右上角四字毛笔+红印）

===COPY_DECK===
（画面文字建议，格式：label|内容，每行一个：
CHARACTER_NAME|角色名号（4-6字，富有仙侠感，如果用户提供了就用用户的）
MAIN_TITLE|主标题（4字诗意标题，如"踏歌长啸"）
SUBTITLE|副标题（4字，如"星剑如梦"）
SEAL_TEXT|印章内文字（2-4字，常见如"雅集""逍遥""无念"）
POEM_LINE|诗句（可选 · 一句古典诗词）
ENGLISH_TAG|英文标签（可选）
CORNER_NOTE|角落小字）

===USAGE===
（4-6条使用建议，每条"•"开头，包括 AI 工具推荐、宽高比、风格锁定技巧等）

===PLATFORM===
（Midjourney/Flux/可灵/即梦/SD 各一条参数建议）

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
    const copyDeckRaw = extract('COPY_DECK');
    const usage = extract('USAGE');
    const platform = extract('PLATFORM');

    if (!enPrompt) { console.error('Raw:', rawText); throw new Error("解析失败"); }

    const t6SigEn = (typeof window.getSignatureInstruction === 'function') ? window.getSignatureInstruction() : '';
    const t6SigZh = (typeof window.getSignatureInstructionZh === 'function') ? window.getSignatureInstructionZh() : '';
    document.getElementById('t6EnPrompt').textContent = enPrompt + t6SigEn;
    document.getElementById('t6ZhPrompt').textContent = (zhPrompt || enPrompt) + (zhPrompt ? t6SigZh : t6SigEn);
    document.getElementById('t6UsageGuide').textContent = usage;
    document.getElementById('t6PlatformNote').innerHTML = `<strong>◉ PLATFORM PARAMETERS</strong>${platform.replace(/\n/g, '<br>')}`;
    document.getElementById('t6OutputLabel').textContent = `◉ ${character.name.split(' ')[0].toUpperCase()} · ${action.name.split(' ')[0].toUpperCase()}`;

    // Render elements
    const elementsViz = document.getElementById('t6ElementsViz');
    elementsViz.innerHTML = '';
    elementsRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const parts = line.split('|').map(p => p.trim());
      const el = document.createElement('div');
      el.className = 'element-item';
      el.innerHTML = `<div class="element-icon">${parts[0] || '◉'}</div><div class="element-body"><div class="element-name">${parts[1] || ''}</div><div class="element-desc">${parts[2] || ''}</div></div>`;
      elementsViz.appendChild(el);
    });

    // Render copy deck
    const copyDeck = document.getElementById('t6CopyDeck');
    copyDeck.innerHTML = '';
    const copyMap = {};
    copyDeckRaw.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const idx = line.indexOf('|');
      copyMap[line.substring(0, idx).trim()] = line.substring(idx + 1).trim();
    });

    const sections = [
      { title: '名号标题 · NAME & TITLE', items: [
        { label: '角色名号', val: copyMap.CHARACTER_NAME },
        { label: '主标题', val: copyMap.MAIN_TITLE },
        { label: '副标题', val: copyMap.SUBTITLE }
      ]},
      { title: '装饰文字 · DECORATIVE', items: [
        { label: '印章内文字', val: copyMap.SEAL_TEXT },
        { label: '诗句', val: copyMap.POEM_LINE },
        { label: '英文标签', val: copyMap.ENGLISH_TAG },
        { label: '角落小字', val: copyMap.CORNER_NOTE }
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
    document.getElementById('t6EnPrompt').textContent = `❌ 生成失败\n原因: ${err.message}`;
  }

  document.getElementById('t6Loading').classList.remove('visible');
  ['t6s1','t6s2','t6s3','t6s4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('t6Output').classList.add('visible');
  document.getElementById('t6GenBtn').disabled = false;
  switchT6Tab(0);
}

function copyT6() {
  const en = document.getElementById('t6EnPrompt').textContent;
  const zh = document.getElementById('t6ZhPrompt').textContent;
  navigator.clipboard.writeText(`=== English ===\n${en}\n\n=== 中文 ===\n${zh}`).then(() => {
    const btn = document.querySelector('#tool6 .copy-btn');
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = 'Copy All', 2000);
  });
}

document.getElementById('t6NameInput').addEventListener('keydown', e => { if (e.key === 'Enter') generateTool6(); });
