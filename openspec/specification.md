# MacRank 规范总纲 (Master Index)

当前版本：**v0.7.7**
状态：**Standard Volumes Finalized (Production Ready)**

本项目规范已达到 **Production Ready** 状态。Standard Volumes (01-04) 包含了重构应用所需的每一行核心逻辑。

## 📚 核心规范卷 (The Standard Volumes)

### [01. 核心规格 (Core Specification)](./01_core_spec.md)
*   **涵盖**: 产品定义、组件交互、雷达图维度、UI/UX 设计语言、分享逻辑、CompareBar 行为、**国际化 (i18n)**。

### [02. 技术规格 (Technical Specification)](./02_tech_spec.md)
*   **涵盖**: **URL Hash 状态持久化协议**、精确评分权重、归一化锚点、**离线匹配算法**、Gemini RAG 策略。

### [03. 开发规范 (Development Standards)](./03_dev_standards.md)
*   **涵盖**: 扁平化目录、TypeScript 严苛模式、Tailwind 样式守则、QA 验收基准。

### [04. 运维与路线图 (Operations & Roadmap)](./04_ops_roadmap.md)
*   **涵盖**: 环境变量、部署方案、版本路线图、Agent 协作。

---

## 🔗 快速链接

- [原型设计](../prototype/index.html)
- [UI 设计规范](../prototype/UI_DESIGN_SPEC.md)
- [项目 README](../README.md)

---

## 📋 核心原则

### 1. 用户至上
- 所有功能设计以用户需求为中心
- 提供直观的选购决策支持
- 确保信息准确性和时效性

### 2. 性能优先
- 首屏加载时间 < 2 秒
- 交互响应时间 < 100ms
- 支持 100+ 机型数据流畅展示

### 3. 可访问性
- 符合 WCAG 2.1 AA 标准
- 完整的键盘导航支持
- 屏幕阅读器友好

### 4. 响应式设计
- 移动端优先（Mobile First）
- 支持 320px - 2560px 分辨率
- 自适应布局，完美适配所有设备

---

## ⚠️ 废弃警告 (Deprecation Notice)
**所有历史碎片化文件（01_project_definition.md 至 12_ai_agents.md 等）已被吸收进 Standard Volumes。在当前及未来版本中，只有 01-04 卷被视为合法开发依据。**

---

## 📅 版本控制

- **当前版本**: v0.7.7
- **最后更新**: 2026-06-09
- **状态**: 生产就绪