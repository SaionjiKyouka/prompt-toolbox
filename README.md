# ◈ Prompt Toolbox · 提示词工具箱

> 精心调校的 AI 图像提示词生成器合集，为每种风格量身定制

一个模块化、可持续扩展的 AI 图像提示词工程工具箱。每个工具都针对特定视觉风格深度调校，内置专业知识库，输出媲美人工撰写的高质量 prompt。

[![GitHub Pages](https://img.shields.io/badge/Live-Demo-blue)](https://YOUR_USERNAME.github.io/prompt-toolbox/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🛠 当前工具

| # | 工具 | 用途 | 风格 |
|---|------|------|------|
| 01 | 🔬 **剖面图生成器** | 生成百科级信息图提示词（树木/相机/手机内部结构） | 博物志/赛博/WIRED 等 7 种 |
| 02 | 👘 **真人Cos海报** | 真人Cos前景 + 2D动漫背景的混合海报 | 巴洛克/赛博朋克等 7 种氛围 |
| 03 | 📣 **电影化产品海报** | 科幻叙事风格的产品宣言海报 | 2001太空漫游/Her/银翼杀手等 8 种电影美学 |
| 04 | 📷 **真实摄影提示词** | 专业级胶片摄影 prompt | 11 种胶片型号 × 9 种相机 × 10 位大师风格 |
| 05 | 🏯 **城市地标海报** | 中国城市艺术海报（广州/深圳/上海等 15+ 城市） | 夜色金线/国风工笔/水墨/赛博等 6 种风格 |

---

## 📁 项目结构

```
prompt-toolbox/
├── index.html                      # 主入口（Hub + 所有工具界面）
├── styles/
│   ├── hub.css                     # 主页样式
│   ├── tool-1.css                  # 剖面图（科技蓝主题）
│   ├── tool-2.css                  # Cos海报（巴洛克金主题）
│   ├── tool-3.css                  # 产品海报（爱马仕橙主题）
│   └── tool-4.css                  # 摄影（暖棕胶片主题）
├── tools/
│   ├── hub.js                      # 工具注册表 + 路由
│   ├── tool-1-crosssection.js      # 剖面图逻辑
│   ├── tool-2-cosplay.js           # Cos海报逻辑
│   ├── tool-3-manifesto.js         # 产品海报逻辑
│   └── tool-4-photography.js       # 摄影逻辑
├── docs/
│   └── screenshots/                # 截图
├── CONTRIBUTING.md                 # 添加新工具的指南
├── LICENSE
└── README.md
```

**关键设计**：
- 每个工具的样式、HTML、JS 独立隔离
- 主题色变量命名空间化（`--t1-*`、`--t2-*`...）
- 添加新工具只需新增 3 个文件 + 在 `index.html` 引入即可

---

## 🚀 快速开始

### 本地运行

本项目需要通过 HTTP server 运行（因为使用了模块化的外部 JS/CSS 文件）：

```bash
# 方式 1: Python
cd prompt-toolbox
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000

# 方式 2: Node
npx http-server -p 8000

# 方式 3: VSCode Live Server 插件
# 右键 index.html → Open with Live Server
```

> ⚠️ **注意**：直接双击 `index.html` 用 `file://` 协议打开会失败，因为浏览器会阻止跨文件加载 JS 模块。必须用 HTTP server。

### 在 Claude.ai 使用

本工具箱依赖 Claude API 生成 prompt。在 Claude.ai 的 Artifacts 环境运行时会自动处理认证，无需 API Key。

---

## 🎯 使用方式

1. 打开 Hub 主页，点击任一工具卡片进入
2. 按工具提示填写主题 / 角色 / 产品名等参数
3. 选择风格选项（每个工具都有丰富的预设）
4. 点击生成按钮，等待 2-5 秒
5. 在输出区查看 4-5 个标签页：
   - 英文 Prompt
   - 中文 Prompt
   - 技术规格 / 画面要素
   - 使用指南 + 平台参数

每个工具都提供快速预设模板，点击即可一键填充。

---

## 🔧 扩展 · 添加新工具

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

简要流程：

1. 在 `styles/` 创建 `tool-N.css`（复制现有的作为模板，修改主题色变量）
2. 在 `tools/` 创建 `tool-N-xxx.js`
3. 在 `tools/hub.js` 的 `TOOLS` 数组注册新卡片
4. 在 `index.html` 添加 `<link>` 和 `<script>` 引用，并补充工具 HTML 结构

---

## 📜 License

MIT License — 详见 [LICENSE](LICENSE)

---

## 🙏 致谢

工具箱中每个模板的风格定义都来自社区优秀作品和公开分享的 prompt 工程经验。

---

**◈ Crafted with care**
