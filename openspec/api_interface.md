# API 接口定义与服务规范

## 1. 概述
本项目主要作为客户端单页应用 (SPA) 运行，不依赖自建后端数据库。主要的外部交互为 Google Gemini API，用于提供智能导购建议。

## 2. 外部服务：Google Gemini Service

### 2.1 服务定义
- **文件路径**: `services/geminiService.ts`
- **SDK**: `@google/genai`
- **模型**: `gemini-3-flash-preview` (低延迟优先)

### 2.2 核心方法：`getMacAdvice`

#### 输入参数
| 参数名 | 类型 | 必填 | 描述 |
| :--- | :--- | :--- | :--- |
| `query` | `string` | 是 | 用户输入的自然语言问题。 |
| `contextData` | `MacModel[]` | 是 | 当前筛选后的机型列表（通常取 Top 40）。 |
| `language` | `Language` | 否 | 目标回复语言代码 (默认 'en')。 |

#### 输出结果
- **类型**: `Promise<string>`
- **内容**: 格式化后的 Markdown 字符串，包含对用户问题的回答及机型推荐。

#### 上下文注入策略 (RAG-Lite)
为了在无向量数据库的情况下实现上下文感知，系统将 `contextData` 序列化为以下文本格式注入 System Prompt：
```text
- MacBook Pro 16" (M4 Max, 2024): Single-Core 4060, Multi-Core 26800, GPU 192000, Price ~$3999
...
```

### 2.3 错误处理与离线回退
- **触发条件**: 网络断开 (`navigator.onLine === false`) 或 API 调用抛出异常。
- **回退逻辑**: 调用 `getOfflineAdvice` 函数。
  1. **关键词匹配**: 解析用户 Query 中的关键词 (如 "coding", "M3", "budget")。
  2. **本地搜索**: 在 `macData` 中过滤匹配的机型。
  3. **模板生成**: 返回预定义的静态回答模板。

## 3. 内部数据接口 (Data Access)

### 3.1 数据源
所有数据均为静态 TypeScript 常量，编译时打包。
- `macData`: `MacModel[]` (聚合了 Silicon 和 Intel 数据)
- `refData`: `MacModel[]` (PC 参考数据)

### 3.2 类型定义 (MacModel)
详见 `openspec/data_dictionary.md`。
