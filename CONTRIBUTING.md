# 🧰 添加新工具的指南

这份文档教你如何在工具箱中添加一个全新的提示词生成器。整个流程大约 15 分钟。

---

## 📋 添加流程 · 5 步

### 1. 确定工具信息

先想清楚：

- **工具编号**（下一个可用的数字，如 `05`）
- **ID**（如 `tool5`）
- **图标**（emoji，如 `🎨`）
- **中英名称**
- **主题色**（一个 hex 颜色，如 `#6b7fff`）
- **标签**（2-3 个）

---

### 2. 创建 CSS 文件

在 `styles/` 目录创建 `tool-N.css`（N 替换成编号）。

**关键规则**：所有 CSS 变量和选择器必须用 `--tN-*` 前缀 和 `.tool-screen-N` 作用域包裹，避免和其他工具冲突。

模板骨架：

```css
/* ============================================
   TOOL N — 你的工具名 (主题描述)
   ============================================ */
.tool-screen-N {
  --tN-bg: #0a0a0a;
  --tN-surface: #121212;
  --tN-border: #2a2a2a;
  --tN-accent: #你的主题色;
  --tN-text: #e8e8e8;
  --tN-muted: #6a6a6a;
  background: var(--tN-bg);
  color: var(--tN-text);
}

.tool-screen-N .header { /* ... */ }
.tool-screen-N .container { /* ... */ }
.tool-screen-N .input-section { /* ... */ }
.tool-screen-N .generate-btn { /* ... */ }
.tool-screen-N .output-section { /* ... */ }
/* ... 以此类推 */
```

💡 建议：直接复制 `tool-1.css`，把里面的 `--t1-*` 全部替换成 `--tN-*`，`.tool-screen-1` 替换成 `.tool-screen-N`，然后修改主题色。

---

### 3. 添加工具 HTML 结构

在 `index.html` 中，在最后一个 `<!-- TOOL X -->` 注释后添加新工具的 HTML。

模板结构：

```html
<!-- TOOL N · 你的工具名 -->
<div class="tool-screen tool-screen-N" id="toolN">
  <button class="back-btn" onclick="goHome()">
    <span class="back-btn-arrow">←</span> BACK
  </button>

  <div class="header">
    <!-- 工具头部装饰和标题 -->
  </div>

  <div class="container">
    <!-- 输入区 -->
    <div class="input-section">
      <div class="section-label">Input · 输入参数</div>
      <input id="tNMainInput" type="text" placeholder="输入主题..." />
      <button id="tNGenBtn" onclick="generateToolN()">生成</button>
      <!-- 其他参数选项 -->
    </div>

    <!-- 加载动画 -->
    <div class="loading" id="tNLoading">
      <div class="spinner"></div>
      <div class="loading-text">GENERATING</div>
    </div>

    <!-- 输出区 -->
    <div class="output-section" id="tNOutput">
      <!-- 标签页 + 内容 -->
    </div>
  </div>
</div>
```

⚠️ **避坑提醒**：textarea 的 `placeholder` 属性**不要放多行文本或引号**，否则 HTML 解析器会把属性当成提前关闭，导致整个后续文档解析失败！使用单行纯文本即可。

---

### 4. 创建 JS 文件

在 `tools/` 目录创建 `tool-N-xxx.js`。

模板结构：

```javascript
// ============================================
// TOOL N — 你的工具名
// ============================================
const TN_STYLE_MAP = {
  style1: { /* 样式配置 */ },
  // ...
};

function switchTNTab(n) {
  document.querySelectorAll('#toolN .tab').forEach((t,i) => 
    t.classList.toggle('active', i===n));
  document.querySelectorAll('#toolN .tab-content').forEach((c,i) => 
    c.classList.toggle('active', i===n));
}

async function generateToolN() {
  const input = document.getElementById('tNMainInput').value.trim();
  if (!input) return;

  document.getElementById('tNOutput').classList.remove('visible');
  document.getElementById('tNLoading').classList.add('visible');
  document.getElementById('tNGenBtn').disabled = true;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 6000,
        messages: [{
          role: "user",
          content: `你的提示词模板...`
        }]
      })
    });

    if (!response.ok) throw new Error(`API请求失败 (${response.status})`);

    const data = await response.json();
    const rawText = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n').trim();

    // 使用 === SECTION === 分隔符解析
    const extract = (section) => {
      const regex = new RegExp(
        `===${section}===\\s*([\\s\\S]*?)(?====[A-Z_]+===|$)`, 'i');
      const match = rawText.match(regex);
      return match ? match[1].trim() : '';
    };

    const enPrompt = extract('EN_PROMPT');
    // ... 处理输出

  } catch(err) {
    console.error(err);
    document.getElementById('tNEnPrompt').textContent = `❌ 失败: ${err.message}`;
  }

  document.getElementById('tNLoading').classList.remove('visible');
  document.getElementById('tNOutput').classList.add('visible');
  document.getElementById('tNGenBtn').disabled = false;
}
```

💡 **关键技巧**：
- **不要让 AI 返回 JSON**，使用 `===SECTION===` 分隔符。JSON 对 AI 的格式要求太严格，容易因为字符串里的引号断掉。
- **max_tokens 给足**：复杂 prompt 至少 6000，避免被截断。
- **错误处理**：`console.error` + 用户友好提示。

---

### 5. 注册 & 引入

**5.1 注册到 Hub**

打开 `tools/hub.js`，在 `TOOLS` 数组末尾添加：

```javascript
{
  id: 'toolN',
  number: '0N',
  icon: '🎨',
  title: '你的工具名',
  en: 'Tool English Name',
  desc: '简短描述，一句话说清用途和特色',
  tags: ['标签1', '标签2', '标签3'],
  accent: '#你的主题色',
  status: 'active'
}
```

**5.2 在 index.html 引入**

在 `<head>` 添加 CSS：

```html
<link rel="stylesheet" href="styles/tool-N.css">
```

在 `</body>` 前添加 JS：

```html
<script src="tools/tool-N-xxx.js"></script>
```

---

## ✅ 测试清单

添加完成后，检查：

- [ ] 打开 index.html，主页出现新卡片
- [ ] 点击新卡片能进入工具界面
- [ ] 填写内容并点击生成按钮有反应
- [ ] API 调用成功、输出区显示内容
- [ ] 标签页切换正常
- [ ] Copy 按钮能复制
- [ ] BACK 按钮能返回主页
- [ ] 刷新浏览器后样式正常
- [ ] 移动端（< 640px）布局不崩

---

## 🐛 常见踩坑

### 1. `typeof openTool is not defined`

**原因**：HTML 里有属性值里的引号未转义，导致整段 HTML 提前关闭。

**排查**：检查所有 `placeholder=""`、`title=""` 等属性里**不能有双引号**。如果必须，用 `&quot;` 代替。

### 2. `生成失败 · JSON 解析错误`

**原因**：让 AI 返回 JSON 格式，AI 写长文本时容易在引号/换行/特殊字符上出错。

**解决**：改用 `===SECTION===` 纯文本分隔符，这是目前最稳健的方案。

### 3. 样式串了，影响到其他工具

**原因**：CSS 选择器没加 `.tool-screen-N` 前缀。

**排查**：所有新写的 CSS 规则都必须写成 `.tool-screen-N .xxx { }`，不要直接写 `.xxx { }`。

### 4. `max_tokens` 不够，输出被截断

**症状**：生成的 JSON 或分隔符结构不完整。

**解决**：把 `max_tokens` 提到 6000-8000。

---

## 📦 提交 PR

如果你想把新工具贡献到主仓库：

```bash
git checkout -b feat/tool-N-xxx
git add .
git commit -m "feat: add Tool N · xxx generator"
git push origin feat/tool-N-xxx
```

然后在 GitHub 发起 Pull Request。

---

**◈ Happy prompting**
