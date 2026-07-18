# MacRank 规范总纲 (Master Index)

当前版本：**v0.8.0**
状态：**Standard Volumes Finalized (Production Ready)**

本项目规范已达到 **Production Ready** 状态。Standard Volumes (01-04) 包含了重构应用所需的每一行核心逻辑。

## 🎨 v0.8.0 UI/UX 重大改版

v0.8.0 完成了全面的 UI/UX 改版，确立 shadcn/ui 设计系统：

- **设计系统**: 基于 shadcn/ui (radix-nova) + Tailwind CSS v4，采用 oklch 色彩令牌实现 Apple 极简美学，支持浅色/深色模式与 `prefers-reduced-motion`。
- **组件迁移**: 全部 14 个组件从原生 HTML 迁移至 shadcn/ui (Button, Dialog, Input, Select, Badge, Card, Tooltip, Switch)。
- **字体**: 通过 next/font 引入 Inter (sans) 与 JetBrains Mono (mono)。
- **安全**: 新增 HTTP 安全响应头 (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS)。
- **无障碍**: 修正 aria-checked → aria-pressed，为图标按钮补充 aria-label，装饰性图标添加 aria-hidden。
- **基础设施**: 修正路径别名 (@/* → ./app/*)，安装 radix-ui/clsx/tailwind-merge/class-variance-authority/remark-gfm。

详细设计规范见 [prototype/UI_DESIGN_SPEC.md](../prototype/UI_DESIGN_SPEC.md)。

## 📚 核心规范卷 (The Standard Volumes)

### [01. 核心规格 (Core Specification)](./01_core_spec.md)
*   **涵盖**: 产品定义、组件交互、雷达图维度、UI/UX 设计语言、分享逻辑、CompareBar 行为、**国际化 (i18n)**。

### [02. 技术规格 (Technical Specification)](./02_tech_spec.md)
*   **涵盖**: **URL Hash 状态持久化协议**、精确评分权重、归一化锚点、**离线匹配算法**、Gemini RAG 策略。

### [03. 开发标准 (Development Standards)](./03_dev_standards.md)
*   **涵盖**: 扁平化目录、TypeScript 严苛模式、Tailwind 样式守则、QA 验收基准。

### [04. 运维与展望 (Operations & Roadmap)](./04_ops_roadmap.md)
*   **涵盖**: 环境变量、部署方案、版本路线图、Agent 协作。

---

## ⚠️ 废弃警告 (Deprecation Notice)
**所有历史碎片化文件（01_project_definition.md 至 12_ai_agents.md 等）已被吸收进 Standard Volumes。在当前及未来版本中，只有 01-04 卷被视为合法开发依据。**