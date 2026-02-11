# 项目规则 (Project Rules)

## 1. 基础规范
- **项目名称**: MacRank
- **语言环境**: 文档与注释统一使用中文 (zh-CN)，代码变量命名使用英文 (CamelCase)。
- **编码格式**: UTF-8 without BOM，换行符使用 LF (Unix style)。
- **版本规范**: 遵循 SemVer 2.0.0 (MAJOR.MINOR.PATCH)。

## 2. 目录结构规范 (OpenSpec)
- `src/`: 禁止创建此目录。项目根目录即为源码目录。
- `openspec/`: 存放所有项目文档、规范、设计稿。
- `components/`: UI 组件，文件名大驼峰 (e.g., `MacTable.tsx`)。
- `lib/`: 核心逻辑、数据、类型定义、工具函数。
- `services/`: 外部 API 集成 (Gemini)。
- `public/`: 静态资源 (Icons, Manifest)。

## 3. 代码规范
- **React**: 使用 React 19+ Hooks 模式。禁止使用 Class Components。
- **TypeScript**: 
  - 严格类型检查 (`strict: true`)。
  - 优先使用 `interface` 定义 Props 和数据模型。
  - 避免使用 `any`，特殊情况需添加 `// TODO: fix type` 注释。
- **Styling**: 
  - 优先使用 Tailwind CSS Utility Classes。
  - 复杂动画或 Webkit 特性使用 `app/style.css`。
- **AI SDK**:
  - 必须使用 `@google/genai`。
  - API Key 必须通过 `process.env.API_KEY` 获取，严禁硬编码。
  - 必须实现离线/错误回退机制。

## 4. Git 工作流
- **分支管理**:
  - `main`: 生产环境分支，永远保持可部署状态。
  - `dev`: 开发主分支。
  - `feature/*`: 新功能分支 (e.g., `feature/add-comparison`).
  - `fix/*`: 问题修复分支 (e.g., `fix/chart-rendering`).
- **提交信息 (Conventional Commits)**:
  - `feat`: 新功能
  - `fix`: 修复 Bug
  - `docs`: 文档变更
  - `style`: 代码格式调整 (不影响逻辑)
  - `refactor`: 代码重构
  - `chore`: 构建过程或辅助工具变动

## 5. 自动化规则 (AI Agent)
- **空闲 1 分钟**: 检查代码中的 `TODO` 或未完善的类型定义并尝试补全。
- **空闲 10 分钟**: 运行 Lint 检查并自动修复格式问题。
- **空闲 60 分钟**: 清理 `dist/` 构建产物和未使用的缓存文件。

## 6. 构建与依赖
- **依赖管理**: 使用 import map (`index.html`) 通过 CDN (esm.sh) 加载运行时依赖，减少 bundle 体积。
- **构建工具**: Vite。确保 `npm run build` 无报错。
