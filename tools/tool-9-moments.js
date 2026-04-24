// ============================================
// TOOL 9 — 历史人物朋友圈 (Historical Moments)
// v2.0 · 一个 prompt 出一张完整截图
// ============================================

const T9_UNIVERSE_MAP = {
  historical: {
    name: "📜 真实历史 Historical",
    rule: "Fact-check strictly by REAL historical records — actual birth/death years, documented relationships, real events. Example: if subject is Su Shi in 1082, verify who was alive that year (Huang Tingjian✓, Foyin✓) vs. dead (Ouyang Xiu, died 1072) or unborn (Li Qingzhao, born 1084)."
  },
  shuihu: {
    name: "📖 《水浒传》",
    rule: "Based on novel《水浒传》. Timeline: late Northern Song Huizong era (~1100-1120). Characters: 108 Liangshan heroes + imperial officials (Gao Qiu, Cai Jing) + related figures. Use novel events."
  },
  sanguo: {
    name: "📖 《三国演义》",
    rule: "Based on novel《三国演义》(NOT 三国志 history). Timeline: 184-280 AD. Novel portrayal (Zhuge Liang omniscient). Use novel events: 桃园结义, 三顾茅庐, 赤壁之战."
  },
  hongloumeng: {
    name: "📖 《红楼梦》",
    rule: "Based on《红楼梦》. Mid-Qing setting. Characters from 贾/史/王/薛 households + servants. Track plot (before/after 黛玉入府, 黛玉之死, 贾府抄家)."
  },
  xiyouji: {
    name: "📖 《西游记》",
    rule: "Based on《西游记》. Two timelines: 大闹天宫 (500+ years before) vs 取经路上 (Tang Zhenguan era 627-649 AD). Pilgrimage team + deities + demons. Follow novel canon."
  },
  fengshen: {
    name: "📖 《封神演义》",
    rule: "Based on《封神演义》. Late Shang to early Zhou (~1046 BC). Characters: 姜子牙, 哪吒, 杨戬, 申公豹, 纣王, 妲己, 阐/截教 deities."
  },
  liaozhai: {
    name: "📖 《聊斋志异》",
    rule: "Based on《聊斋志异》short stories. Each tale independent. Late-Ming/early-Qing. If user specifies a tale (聂小倩/画皮/婴宁), use that tale's characters only."
  },
  mythology: {
    name: "🏛️ 中国神话",
    rule: "Chinese mythology: 盘古, 女娲, 三皇五帝, 玉帝, 王母, 嫦娥, 后羿, 牛郎织女, 龙王. Mythic timeline. Don't mix with novels (西游/封神 have own rules)."
  },
  jinyong: {
    name: "🗡️ 金庸武侠",
    rule: "Jin Yong wuxia. Each novel has own timeline: 射雕/神雕/倚天(南宋-元末) vs 天龙(北宋) vs 笑傲(明朝) vs 鹿鼎(清初). Confirm which novel first. No cross-novel mixing."
  },
  gulong: {
    name: "🗡️ 古龙武侠",
    rule: "Gu Long wuxia. Series: 楚留香, 陆小凤, 小李飞刀, 绝代双骄, 七种武器. Abstract 'wulin' era."
  },
  folk: {
    name: "🎨 民间传说",
    rule: "Chinese folk legends: 白蛇传, 梁祝, 孟姜女, 牛郎织女, 七仙女. Each legend has its characters. Don't mix."
  },
  other: {
    name: "🌐 其他作品",
    rule: "User specifies work in custom context."
  }
};

const T9_PHASE_MAP = {
  youth: "年少意气风发，初出茅庐",
  rising: "功成名就的巅峰期",
  exile: "被贬谪、流放或失意落魄",
  retreat: "晚年归隐或解甲归田",
  imprison: "牢狱之灾或软禁时期",
  journey: "远行途中、漂泊他乡",
  mourning: "丧亲、失恋、怀人低潮",
  triumph: "刚获得重大成就",
  everyday: "日常平淡的一天",
  ending: "临终前或故事结局"
};

const T9_EVENT_MAP = {
  writePoetry: "写诗作词，分享作品",
  beDemoted: "被贬谪抒发心情",
  banquet: "参加宴会/诗会/雅集",
  missSomeone: "怀念亲友、思念故人",
  climbMount: "登山、游览名胜",
  moonView: "月下独酌、望月怀远",
  drinkWine: "饮酒作乐或借酒浇愁",
  zenMoment: "参禅悟道",
  dailyLife: "日常琐事",
  argueDebate: "与人争论、政见冲突",
  reviewLife: "人生感慨、回忆往事",
  celebrateFood: "分享美食",
  springOuting: "春游踏青",
  sickBed: "病中抒怀",
  sendOff: "送别友人"
};

const T9_IMG_STYLE_MAP = {
  realisticPhoto: "photorealistic cinematic photograph style, modern camera capture, strict historical costume accuracy, natural lighting, documentary quality — NOT painting",
  songPainting: "Song Dynasty gongbi meticulous painting, delicate line-drawing with soft watercolor wash, silk scroll background",
  tangSilk: "Tang Dynasty silk painting, heavy mineral pigments (azurite, malachite, vermilion, gold), opulent court painting",
  mingQingInk: "Ming-Qing ink wash painting, expressive brushwork, extensive negative space, literati quality",
  vintageRepub: "1920s-40s Republican China sepia vintage photograph, silver halide grain, aged quality",
  illustStyle: "modern Chinese-style digital illustration, culturally authentic, clean painterly look",
  comicManga: "Chinese manhua illustration, stylized traditional characters, expressive lines"
};

const T9_UI_MAP = {
  wechat: "WeChat Moments (微信朋友圈) interface screenshot: clean white background, iOS status bar at top, user avatar (rounded square) with blue name, post text, image(s) below, gray timestamp and location, like heart icon, comment section with blue usernames at end",
  xiaohongshu: "Xiaohongshu (小红书) post screenshot: large hero image at top, title below in bold, body text, red theme, like/comment/favorite/share icons at bottom, #hashtags, comment section",
  weibo: "Weibo (微博) post screenshot: red/orange theme timeline card, forward/comment/like counts, #topic tags, username in orange",
  douyin: "Douyin (抖音) style: dark vertical full-screen layout, large bold text overlay, heart/comment/share sidebar icons on right"
};

const T9_MEME_MAP = {
  purePast: "Content language is PURE period-appropriate (classical Chinese or era-matching vernacular). ZERO modern slang or internet memes. Only the UI format is modern — content feels authentically historical.",
  lightMeme: "Content stays period-appropriate, but UI elements may include playful anachronisms like carrier name (大宋移动 5G, 大唐 WiFi), status bar humor, minor label jokes. Character's words remain authentic to era.",
  mediumMeme: "Main character MAY use light modern phrasing for humor, but other commenting figures stay period-authentic. Balance historical flavor with modern relatability.",
  heavyMeme: "Everyone speaks modern Chinese internet slang freely. BUT historical facts, character relationships, timeline MUST be accurate. Humor from juxtaposition."
};

const T9_INTERACTION_MAP = {
  light: "include 3-5 commenting characters with short pithy comments",
  rich: "include 8-12 rich comments with back-and-forth interactions",
  none: "no comments visible, just the main post with likes"
};

function switchT9Tab(n) {
  document.querySelectorAll('#tool9 .tab').forEach((t,i) => t.classList.toggle('active', i===n));
  document.querySelectorAll('#tool9 .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
}

function setT9Preset(person, universe, phase, event, imgStyle, ui, meme, interaction) {
  document.getElementById('t9PersonInput').value = person;
  if (universe) document.getElementById('t9UniverseSelect').value = universe;
  document.getElementById('t9PhaseSelect').value = phase;
  document.getElementById('t9EventSelect').value = event;
  document.getElementById('t9ImgStyleSelect').value = imgStyle;
  document.getElementById('t9UISelect').value = ui;
  document.getElementById('t9MemeSelect').value = meme;
  document.getElementById('t9InteractionSelect').value = interaction;
}

async function generateTool9() {
  const person = document.getElementById('t9PersonInput').value.trim();
  if (!person) { document.getElementById('t9PersonInput').focus(); return; }

  const customContext = document.getElementById('t9ContextInput').value.trim();
  const universeKey = document.getElementById('t9UniverseSelect').value;
  const phaseKey = document.getElementById('t9PhaseSelect').value;
  const eventKey = document.getElementById('t9EventSelect').value;
  const imgStyleKey = document.getElementById('t9ImgStyleSelect').value;
  const uiKey = document.getElementById('t9UISelect').value;
  const memeKey = document.getElementById('t9MemeSelect').value;
  const interactionKey = document.getElementById('t9InteractionSelect').value;

  const universe = T9_UNIVERSE_MAP[universeKey];
  const phase = T9_PHASE_MAP[phaseKey];
  const event = T9_EVENT_MAP[eventKey];
  const imgStyle = T9_IMG_STYLE_MAP[imgStyleKey];
  const ui = T9_UI_MAP[uiKey];
  const meme = T9_MEME_MAP[memeKey];
  const interaction = T9_INTERACTION_MAP[interactionKey];

  document.getElementById('t9Output').classList.remove('visible');
  document.getElementById('t9Loading').classList.add('visible');
  document.getElementById('t9GenBtn').disabled = true;

  ['t9s1','t9s2','t9s3','t9s4'].forEach((id, i) => {
    setTimeout(() => document.getElementById(id).classList.add('visible'), i * 450);
  });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 6500,
        messages: [{
          role: "user",
          content: `你是"穿越朋友圈"超级专家。你的输出是**一次性给图像生成 AI（GPT-4o / Nano Banana / Gemini 2.0 Flash / Flux）的完整长 prompt**——粘贴一下就能出整张朋友圈截图（包含 UI + 人物配图 + 文字 + 评论 + 状态栏）。

【★ 核心理念】
本工具输出的是**一个可直接使用的图像生成 prompt**，不是分步骤的流程。所有历史考证结果都**固化在 prompt 里的具体文字**（直接写"评论：黄庭坚：xxx"而不是另外列人物清单）。

【★ 世界观考证（AI 内部执行，不暴露）】
世界观: ${universe.name}
${universe.rule}

内心先完成考证：
- 主角此时的准确时间点
- 此时在世的可互动人物（6-12 人）
- 排除已死/未出现/跨作品的人物
- 校对诗文归属

考证结果**直接固化到 prompt 里的具体内容**。

【★ 用户配置】
- 主角: ${person}
- 阶段: ${phase}
- 事件: ${event}
${customContext ? '- 补充: ' + customContext : ''}
- 配图风格: ${imgStyle}
- UI 平台: ${ui}
- 梗风格: ${meme}
- 互动深度: ${interaction}

【★ 一个完整"整图 prompt"必须包含】

在一段连贯长文描述中（不分段列表）完整包含：

1. 截图类型声明（iPhone-style / Android-style）
2. 顶部状态栏：运营商（玩梗版如"大宋移动 5G"）+ 日期（年号+公历月日+时辰）+ 月亮/太阳图标 + 电量 88%
3. 顶部导航栏文字（"朋友圈" / 英文副标题如 SONG DYNASTY SOCIAL MEDIA FEED）
4. 用户信息区：头像画风描述 + 主角中文名 + 身份标签（如"文坛顶流"）+ 定位（古地名·具体地点）+ 时间戳（"5分钟前"）
5. 发帖正文：完整文字（按梗风格）
6. 配图区详细描述（${imgStyle}），1-9 图
7. 点赞行：具体列出 5-8 个点赞者姓名（同世界观在世人物）
8. 评论区：${interaction}，格式"姓名：具体内容"（已通过考证）
9. 底部导航（如有）
10. 风格关键词：iPhone interface realism, high-fidelity UI mockup, 9:16 portrait

【★ 梗风格详细说明】
${meme}

【★ 必须避免】
❌ UI 和内容分开（必须一体描述）
❌ 已死/未生人物评论
❌ 跨作品/跨朝代同框
❌ 引用主角尚未创作的诗
❌ 贬官定位京城
❌ 违反梗风格（选了纯古风却出现"家人们"）
❌ UI 描述过简（AI 会出糟糕假 UI）

【★ 最重要！出戏杀手 · 绝对禁止的"假 UI 注解"】

真实微信/小红书/微博**不会**在内容旁添加这种旁白式系统标注。
这种注解会让读者瞬间出戏，知道是段子而非真截图。

❌❌❌ 严禁生成以下任何一种"假 UI 元梗"：
  • 唐婉（已被拉黑）
  • 右相已讀，不予置評
  • XX撤回了一条消息
  • XX拍了拍XX
  • 对方已开启好友验证
  • 系统提示：您已添加好友
  • 该用户已注销
  • XX正在输入...
  • XX 发起了好友申请
  • 任何形式的（括号系统注解）在人物名字后面
  • "XX 已读不回" "XX 未读"这种状态标注
  • 任何模仿微信产品机制但用于搞笑的假文案

【梗必须在内容层，不在 UI 层】

✅ 正确的玩梗方式：让人物自己说话
  例如：王安石评论"呵呵"（符合两人政见不合的真实关系，梗在评论内容）
  例如：苏轼正文写"被贬了但心情还行"（梗在主角自己的语气）
  例如：佛印回复"东坡居士，吃肉不？"（梗在人物之间的真实机锋）
  
❌ 错误的玩梗方式：在 UI 上添加旁白
  例如：唐婉（已被拉黑）发表评论  ← 这是 UI 层的假注解，出戏
  例如：右相已讀，不予置評          ← 这是 UI 层的假状态，出戏

真实朋友圈只会显示：用户名 + 评论内容 + 时间。不会有任何
"已读/未读/拉黑/撤回/拍一拍/好友验证"之类的附加注解。
所有幽默、讽刺、历史关系都必须通过人物自己的"评论文字"表达。

如果人物之间有矛盾（如陆游和唐婉的悲剧、王安石和苏轼的政敌），
应该通过人物的言语/不出现/评论冷淡来表达，而不是用"已拉黑"这种标注。

═══════════════════════════════════════════
【★★★ 第三重考证：社交潜规则（极度重要）】
═══════════════════════════════════════════

历史时间线对了、人物都活着，**不代表他们真的会在朋友圈互动**。
必须过**社交礼制关**。否则即使考证准确，也会让懂行的读者觉得荒唐。

━━━━━━━━━━━━━━━━━━━━━━━━
【规则 A · 皇帝/最高权威不以真名现身】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 错误：评论区出现"李隆基：xxx"、"朱元璋：xxx"、"武则天：xxx"
✅ 正确：用**尊号/年号/称谓**代替真名

皇帝在朋友圈里的正确呈现方式：
  • 如果要出现，账号名用："三郎（李隆基昵称）"、"圣人"、"上"
  • 唐代皇帝：三郎/圣人/上
  • 宋代皇帝：官家/陛下
  • 明清皇帝：万岁爷/主子
  • 其自称：朕 / 孤（王侯）

最佳做法：**皇帝根本不亲自评论**。皇帝通过身边人间接表态：
  ✅ "高力士：圣人听闻将军舞技，龙颜大悦"（高力士代传话）
  ✅ "宣读圣旨"这种事，朋友圈里根本不会以皇帝本人账号发生

同理：所有绝对权威（佛祖、玉帝、至高神）都不会以真名点赞或评论。

━━━━━━━━━━━━━━━━━━━━━━━━
【规则 B · 下级绝不公开骂上级】
━━━━━━━━━━━━━━━━━━━━━━━━

❌ 致命错误：
  主角（节度使）正文：
  "宰相杨国忠处处钉死我的路！那厮……"
  下面杨国忠（宰相）评论：
  "将军多保重。"

这完全违反真实官场逻辑。真实情况：
  • 公开骂上级 = 政治自杀
  • 被骂的上级不会和颜悦色出现
  • 被骂的上级即使出现，也是**阴阳怪气**或**警告**

✅ 正确做法：
  • 主角正文要**含蓄**："某腹背受敌，朝中多小人"（不点名）
  • 或者**只用暗号**："某公知吾苦"
  • 评论区：上级要么**不出现**，要么**点赞但不评论**，要么**冷嘲热讽**

━━━━━━━━━━━━━━━━━━━━━━━━
【规则 C · 点赞顺序符合权力学】
━━━━━━━━━━━━━━━━━━━━━━━━

真实朋友圈点赞顺序是**权力结构的镜像**：

✅ 正确的点赞顺序（从先到后）：
  1. 第一批：**马屁精/下属/亲信**（最快点赞，显忠心）
     例：高力士、陈玄礼的手下、同僚中的小人物
  2. 第二批：**同级/同僚**（一般性互动）
     例：同级节度使、同年进士
  3. 第三批：**德高望重的平辈**（谨慎点赞）
  4. 几乎不出现：**上级领导/皇帝**（如果出现就是最后 or 专门批示）

❌ 绝对错误：
  • 第一个点赞是皇帝
  • 第一个点赞是主角的死敌
  • 第一个点赞是辈分比主角高得多的人

点赞列表构造建议：
  「（亲信/下属名字）、（同僚A）、（同僚B）、... 等 XX 人觉得很赞」
  而不是：「（皇帝/上级）、（亲信）... 等 XX 人觉得很赞」

━━━━━━━━━━━━━━━━━━━━━━━━
【规则 D · 敏感身份有自我审查】
━━━━━━━━━━━━━━━━━━━━━━━━

受朝堂监控/身居高位/处境敏感的人物，朋友圈不会说禁忌话：
  • 异族节度使不会公开说"我是胡人" / "想造反"
  • 贬官不会直接骂皇帝
  • 太监不会自称"咱家" 大骂权臣
  • 僧道不会公开说破戒事

他们通过**暗喻、隐语、酒话**表达：
  ✅ 安禄山："夜深饮酒，思及往事，终不免有为人下之叹"
  ❌ 安禄山："杨国忠那厮要害我！"

━━━━━━━━━━━━━━━━━━━━━━━━
【规则 E · 评论内容符合角色身份】
━━━━━━━━━━━━━━━━━━━━━━━━

评论的人物语气必须符合其**身份与性格**：
  ✅ 李逵（粗人）："哥哥说得对！"
  ✅ 诸葛亮（智者）："此事需从长计议"
  ✅ 王熙凤（泼辣）："呦，这是闹哪出？"
  ❌ 诸葛亮："卧槽牛批"

结合本次主角「${person}」和所在世界观「${universe.name}」，
必须让所有互动人物的语气、称谓、措辞都符合其身份。

═══════════════════════════════════════════
【总结：三重考证缺一不可】
═══════════════════════════════════════════

1️⃣ 时间线关：此时此刻这人活着吗？
2️⃣ 世界观关：同一作品/时代内吗？
3️⃣ 社交礼制关：他/她真的会这样说吗？权力逻辑对吗？

【★ 输出格式】使用 === 分隔符：

===EN_PROMPT===
（700-900 词完整英文长 prompt。一段连贯描述，不用 Markdown 列表。所有具体文字/姓名/日期都写出来，不留 [placeholder]。结尾加风格标签。）

===ZH_PROMPT===
（400-600 字对应中文版，同样一段连贯，适合可灵/即梦。）

===FACT_CHECK===
（简短考证备注，给用户看的透明度报告，格式：
时间点|具体年份或时期
主角当时|年龄、身份、地点
可互动|评论/点赞里用到的人物名（逗号分隔）
已排除|因时间线问题排除的人及原因（1-2 条）
事实校验|是否引用未创作作品等
）

===USAGE===
（4-6 条"•"开头的建议：推荐 GPT-4o/Nano Banana/Gemini/Flux；2:3 或 9:16 比例；iOS-style 关键词；文字长时分两次生成；文字识别可能出错建议 PS 修正等）

===PLATFORM===
（GPT-4o / Nano Banana / Gemini 2.0 / Flux / Midjourney 各一条参数建议）

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
    const factCheck = extract('FACT_CHECK');
    const usage = extract('USAGE');
    const platform = extract('PLATFORM');

    if (!enPrompt) { console.error('Raw:', rawText); throw new Error("解析失败"); }

    const sigEn = (typeof window.getSignatureInstruction === 'function') ? window.getSignatureInstruction() : '';
    const sigZh = (typeof window.getSignatureInstructionZh === 'function') ? window.getSignatureInstructionZh() : '';

    document.getElementById('t9EnPrompt').textContent = enPrompt + sigEn;
    document.getElementById('t9ZhPrompt').textContent = (zhPrompt || enPrompt) + (zhPrompt ? sigZh : sigEn);
    document.getElementById('t9UsageGuide').textContent = usage;
    document.getElementById('t9PlatformNote').innerHTML = `<strong>◎ PLATFORM PARAMETERS</strong>${platform.replace(/\n/g, '<br>')}`;
    document.getElementById('t9OutputLabel').textContent = `◎ ${person.toUpperCase()} · MOMENTS`;

    // Render fact check
    const factEl = document.getElementById('t9FactCheck');
    factEl.innerHTML = '';
    const factMap = {};
    factCheck.split('\n').map(l => l.trim()).filter(l => l && l.includes('|')).forEach(line => {
      const idx = line.indexOf('|');
      factMap[line.substring(0, idx).trim()] = line.substring(idx + 1).trim();
    });

    const factFields = [
      { label: '📅 时间点', key: '时间点' },
      { label: '👤 主角当时', key: '主角当时' },
      { label: '✅ 可互动人物', key: '可互动' },
      { label: '❌ 已排除', key: '已排除' },
      { label: '📖 事实校验', key: '事实校验' }
    ];

    const verifyDiv = document.createElement('div');
    verifyDiv.className = 'verify-section';
    let verifyHtml = '';
    factFields.forEach(f => {
      if (factMap[f.key]) {
        verifyHtml += `<div class="verify-item"><div><strong>${f.label}:</strong> ${factMap[f.key]}</div></div>`;
      }
    });
    verifyDiv.innerHTML = verifyHtml;
    factEl.appendChild(verifyDiv);

  } catch(err) {
    console.error(err);
    document.getElementById('t9EnPrompt').textContent = `❌ 生成失败\n原因: ${err.message}`;
  }

  document.getElementById('t9Loading').classList.remove('visible');
  ['t9s1','t9s2','t9s3','t9s4'].forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('t9Output').classList.add('visible');
  document.getElementById('t9GenBtn').disabled = false;
  switchT9Tab(0);
}

function copyT9() {
  const en = document.getElementById('t9EnPrompt').textContent;
  const zh = document.getElementById('t9ZhPrompt').textContent;
  navigator.clipboard.writeText(`=== English ===\n${en}\n\n=== 中文 ===\n${zh}`).then(() => {
    const btn = document.querySelector('#tool9 .copy-btn');
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = 'Copy All', 2000);
  });
}

document.getElementById('t9PersonInput').addEventListener('keydown', e => { if (e.key === 'Enter') generateTool9(); });
