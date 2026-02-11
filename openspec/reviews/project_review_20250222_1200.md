# 项目审查报告 (Project Review Report)

**日期**: 2025-02-22
**版本**: v0.3.1
**审查人**: Senior Frontend Engineer Agent

## 1. 概览
本次审查针对 MacRank v0.3.1 版本，重点关注代码规范、文档一致性及潜在的运行时错误。

## 2. 发现的问题与修复

### 2.1 依赖版本不一致 (High)
- **问题**: `openspec/tech_stack.md` 和 `specification.md` 之前标注项目使用 React 19，但 `package.json` 和 `index.html` (importmap) 明确指向 React 18.3.1。
- **影响**: 可能导致开发者误用 React 19 的新特性（如 `use` Hook）导致运行时错误，或造成文档误导。
- **修复**: 已将所有文档中的 React 版本修正为 **18.3.1**。

### 2.2 历史记录 API 安全性 (Medium)
- **问题**: 在某些预览环境（如 Blob URL）中调用 `window.history.replaceState` 会抛出 SecurityError，导致应用白屏。
- **修复**: 在 `App.tsx` 中为 `replaceState` 调用添加了 `try-catch` 块，确保在受限环境下应用仍能正常运行。

### 2.3 Import Map 一致性 (Low)
- **问题**: `index.html` 中的 import map 曾指向 React 19 RC 版本。
- **修复**: 已统一修正为指向 `esm.sh/react@18.3.1`。

## 3. 规范合规性检查

| 检查项 | 状态 | 说明 |
| :--- | :--- | :--- |
| **目录结构** | ✅ 通过 | 符合 OpenSpec 规范，无 `src` 目录，组件/逻辑分离。 |
| **文件编码** | ✅ 通过 | UTF-8 LF。 |
| **命名规范** | ✅ 通过 | 组件大驼峰，工具函数小驼峰。 |
| **AI SDK** | ✅ 通过 | 使用 `@google/genai` 且 API Key 通过环境变量注入。 |
| **PWA 配置** | ✅ 通过 | Service Worker 配置正确，Manifest 完整。 |

## 4. 建议
1.  **引入自动化测试**: 目前测试主要依赖手动 QA，建议引入 Vitest 对 `lib/scoring.ts` 进行单元测试。
2.  **数据层优化**: 随着机型增多，`macData` 数组体积变大，未来可考虑按需加载 Intel 历史数据。

## 5. 结论
项目整体结构健康，文档体系已补全并修正。可以继续进行 v0.3.x 阶段的功能开发。
