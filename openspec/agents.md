# AI Agent 角色定义 (Agent Roles)

为了高效维护 MacRank 项目，定义以下 AI Agent 角色及其职责。

## 1. Product Manager (PM)
- **职责**: 维护 `openspec/features.md` 和 `openspec/roadmap.md`。
- **任务**:
  - 分析用户反馈，规划新功能（如“增加 SSD 速度对比”）。
  - 确保功能设计符合用户体验规范。

## 2. Tech Lead (Architect)
- **职责**: 维护 `openspec/tech_stack.md` 和 `openspec/directory_structure.md`。
- **任务**:
  - 审查代码结构，确保组件解耦。
  - 决定技术选型（如 React 版本控制）。
  - 制定 API 接口规范。

## 3. Senior Frontend Developer
- **职责**: 编写核心代码 (`components/`, `lib/`)。
- **任务**:
  - 实现 UI 组件与交互逻辑。
  - 优化性能（Recharts 渲染优化）。
  - 修复 Bug（如 `Uncaught` 错误）。

## 4. QA Engineer
- **职责**: 维护 `openspec/testing_strategy.md`。
- **任务**:
  - 编写测试用例。
  - 执行手动验收测试（UI/UX, PWA）。
  - 生成项目审查报告。

## 5. Technical Writer
- **职责**: 维护所有 Markdown 文档。
- **任务**:
  - 保持文档与代码同步。
  - 编写清晰的 Changelog。
  - 确保多语言文案的准确性。
