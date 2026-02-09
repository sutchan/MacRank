# UI 设计规范 (Design System)

## 1. 设计理念
MacRank 遵循 **Apple Human Interface Guidelines** 的核心原则，强调清晰的内容呈现、层级分明的信息架构以及细腻的交互反馈。界面风格尽可能接近原生 macOS/iOS 应用体验。

## 2. 字体排印 (Typography)
采用系统原生字体栈，确保在各平台上获得最佳渲染效果。

*   **Font Family**:
    ```css
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
    ```
*   **字重**:
    *   **Regular (400)**: 正文内容。
    *   **Medium (500)**: 表头、按钮、次级强调。
    *   **Semibold (600)**: 标题、重要数值、Ranking 分数。

## 3. 色彩系统 (Color Palette)

### 3.1 基础色 (Neutral)
适配深色模式的灰度色阶：
*   **Background**: `bg-gray-50` (#F5F5F7) / Dark: `bg-black` (#000000)
*   **Surface**: `bg-white` (#FFFFFF) / Dark: `bg-gray-800` (#161617)
*   **Text Primary**: `text-gray-900` (#111827) / Dark: `text-white` (#FFFFFF)
*   **Text Secondary**: `text-gray-500` (#6B7280) / Dark: `text-gray-400` (#9CA3AF)

### 3.2 品牌色 (Brand)
*   **Apple Blue**: `#0071E3` (Light) / `#0077ED` (Dark)
    *   用途: 链接、主按钮、选中状态、A级段位。

### 3.3 段位颜色 (Tier Badges)
用于区分性能等级，采用低饱和度背景 + 高饱和度文字的组合。

| 段位 | 颜色系列 | Tailwind 类 (Light/Dark) | 视觉意象 |
| :--- | :--- | :--- | :--- |
| **S+** | Purple Gradient | `from-indigo-500 via-purple-500 to-pink-500` | 幻彩/极致 |
| **S** | Purple | `bg-purple-100 text-purple-700` / `bg-purple-900/30 text-purple-300` | 旗舰/专业 |
| **A+/A** | Blue | `bg-blue-100 text-blue-700` / `bg-blue-900/30 text-blue-300` | 高端/主流 |
| **B** | Green | `bg-green-100 text-green-700` / `bg-green-900/30 text-green-300` | 良好/够用 |
| **C** | Yellow | `bg-yellow-100 text-yellow-700` / `bg-yellow-900/30 text-yellow-300` | 入门/基础 |
| **D** | Gray | `bg-gray-100 text-gray-600` / `bg-gray-800 text-gray-400` | 过时/淘汰 |

## 4. 组件规范

### 4.1 玻璃拟态 (Glassmorphism)
用于吸顶导航栏 (`Header`) 和控制栏 (`Controls`)。
*   **CSS**: `backdrop-blur-md` + `bg-opacity-80`
*   **Border**: 1px solid `border-gray-200` (Light) / `border-gray-800` (Dark)

### 4.2 模态框 (Modals)
*   **阴影**: `shadow-2xl`
*   **圆角**: `rounded-2xl`
*   **动效**: `animate-in fade-in zoom-in-95` (进入), `duration-200`

### 4.3 表格 (Data Table)
*   **行高**: `py-4` (Mobile) / `py-6` (Desktop)
*   **分割线**: `border-b border-gray-200`
*   **交互**:
    *   Hover: `bg-gray-50` (Light) / `bg-gray-900` (Dark)
    *   Selected: `bg-blue-50` (Light) / `bg-blue-900/10` (Dark)

### 4.4 滚动条 (Scrollbar)
自定义 Webkit 样式，模拟 macOS 行为。
*   **轨道**: 透明。
*   **滑块**: 
    *   Light: `rgba(0, 0, 0, 0.2)`
    *   Dark: `rgba(255, 255, 255, 0.2)`
    *   圆角: `10px`
    *   宽度: `12px`

## 5. 响应式策略 (Responsiveness)
*   **Breakpoint**: `md` (768px)
*   **Mobile View**:
    *   隐藏次要列 (CPU/GPU/Price)。
    *   图表转为紧凑模式。
    *   AI 聊天窗口全屏或底部 Sheet 样式。
*   **Desktop View**:
    *   展示完整数据列。
    *   图表展示完整图例。
    *   AI 聊天为右下角悬浮窗。