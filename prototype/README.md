# MacRank 原型设计文档

## 文档版本
- **版本**: v1.1
- **更新日期**: 2026-06-09
- **状态**: 高保真原型已完成
- **对齐状态**: 与代码实现完全一致

---

## 原型文件

### 1. 交互式原型
- **文件**: [index.html](./index.html)
- **描述**: 完整的高保真交互式原型
- **功能**:
  - Hero 组件展示
  - Filter Controls 筛选控制
  - Performance Chart 性能图表
  - MacTable 性能天梯表格（桌面端 + 移动端）
  - Detail Modal 详情弹窗
  - Compare Modal 对比弹窗
  - AI Chat 聊天界面
  - Compare Bar 对比栏
  - Settings Modal 设置面板
  - Footer 页脚

### 2. UI 设计规范
- **文件**: [UI_DESIGN_SPEC.md](./UI_DESIGN_SPEC.md)
- **描述**: 完整的 UI/UX 设计规范文档
- **内容**:
  - 排版系统优化
  - 颜色系统增强（包括 Tier 颜色系统）
  - 动画系统规范
  - 间距系统
  - 阴影系统
  - 组件级优化规范
  - 响应式设计规范
  - 可访问性 (A11y) 规范
  - 状态设计规范

---

## 核心组件规范

### 1. Hero 组件
**设计规范**:
- 多层渐变背景光晕效果
- 响应式字号（text-4xl sm:text-5xl md:text-6xl lg:text-7xl）
- 徽章带呼吸动画（animate-pulse）
- 分享按钮带悬停和点击效果

**实现文件**: [app/components/Hero.tsx](../app/components/Hero.tsx)

### 2. Filter Controls 组件
**设计规范**:
- 搜索栏带图标和焦点状态
- 筛选下拉框带自定义箭头图标
- 场景选择按钮带激活状态
- 响应式布局（移动端堆叠）

**实现文件**: [app/components/FilterControls.tsx](../app/components/FilterControls.tsx)

### 3. Performance Chart 组件
**设计规范**:
- 支持多图表类型切换（综合/单核/多核/Metal）
- 使用 Recharts 库实现
- 带渐变填充和动画效果
- 移动端适配（简化显示）

**实现文件**: [app/components/PerformanceChart.tsx](../app/components/PerformanceChart.tsx)

### 4. MacTable 组件
**设计规范**:
- **桌面端**: 固定表头，sticky 第一列
- **移动端**: 卡片式布局
- Tier 徽章带渐变和阴影
- 性能进度条带动画
- 行悬停效果（translateY + shadow）
- 骨架屏加载状态

**实现文件**: [app/components/MacTable.tsx](../app/components/MacTable.tsx)

### 5. TierBadge 组件
**设计规范**:
```
S+ 级：indigo→purple→pink 渐变 + glow 动画
S 级：purple 渐变 + 阴影
A 级：blue 渐变 + 阴影
B 级：emerald 渐变 + 阴影
C 级：amber 渐变 + 阴影
D 级：gray 渐变 + 阴影
```

**实现文件**: [app/components/TierBadge.tsx](../app/components/TierBadge.tsx)

### 6. 模态框组件
**DetailModal**:
- 顶部渐变栏（blue→purple→pink）
- 三分数网格（单核/多核/Metal）
- 规格列表
- 分享按钮

**CompareModal**:
- VS 对决布局
- 雷达图对比
- 对比条形图
- 分享对比按钮

**实现文件**: 
- [app/components/DetailModal.tsx](../app/components/DetailModal.tsx)
- [app/components/CompareModal.tsx](../app/components/CompareModal.tsx)

### 7. AI Chat 组件
**设计规范**:
- 用户消息气泡（蓝色，右上角圆角）
- AI 消息气泡（灰色，左上角圆角）
- 输入框带发送按钮
- Typing Indicator（三点跳动动画）
- 移动端可收起

**实现文件**: [app/components/AIChat.tsx](../app/components/AIChat.tsx)

### 8. CompareBar 组件
**设计规范**:
- 固定在底部（bottom-6 right-6）
- 毛玻璃背景（backdrop-blur-xl）
- 已选模型预览（重叠头像）
- 对比按钮（2 个模型时激活）

**实现文件**: [app/components/CompareBar.tsx](../app/components/CompareBar.tsx)

### 9. SettingsModal 组件
**设计规范**:
- 主题切换（浅色/深色）
- 语言选择（中文/English）
- 场景权重选择
- 数据重置
- GitHub 链接

**实现文件**: [app/components/SettingsModal.tsx](../app/components/SettingsModal.tsx)

### 10. TradeInView 组件
**设计规范**:
- 以旧换新计算器
- 残值预估
- 净成本计算
- 机型选择器

**实现文件**: [app/components/TradeInView.tsx](../app/components/TradeInView.tsx)

---

## 响应式断点

```css
/* 移动端优先 */
Base: 0-639px (Mobile)
sm: 640px+ (Large Mobile)
md: 768px+ (Tablet)
lg: 1024px+ (Desktop)
xl: 1280px+ (Large Desktop)
2xl: 1536px+ (Extra Large)
```

**主容器宽度**: max-w-[980px]

---

## 动画规范

### 入场动画
```css
.animate-fade-in-up {
  animation: fade-in-up 0.5s var(--ease-default) forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 交错延迟
```css
.stagger-1 { animation-delay: 50ms; }
.stagger-2 { animation-delay: 100ms; }
.stagger-3 { animation-delay: 150ms; }
.stagger-4 { animation-delay: 200ms; }
.stagger-5 { animation-delay: 250ms; }
```

### 骨架屏动画
```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

## 颜色系统

### Tier 颜色
```css
S+: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)
S:  linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)
A:  linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)
B:  linear-gradient(135deg, #22c55e 0%, #4ade80 100%)
C:  linear-gradient(135deg, #eab308 0%, #facc15 100%)
D:  linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)
```

### 主题色
- Primary: #007AFF (Apple Blue)
- Success: #34C759
- Warning: #FF9500
- Error: #FF3B30

---

## 可访问性 (A11y)

### ARIA 标签
所有图标按钮必须包含 `aria-label`
```html
<button aria-label="分享到社交媒体">
  <ShareIcon />
</button>
```

### 键盘导航
- Tab 键顺序合理
- Enter/Space 激活按钮
- Esc 关闭模态框

### 颜色对比度
符合 WCAG 2.1 AA 标准（至少 4.5:1）

---

## 原型验证清单

### ✅ 已完成
- [x] Hero 组件 - 多层背景光晕、响应式排版
- [x] Filter Controls - 搜索栏、筛选器、场景选择
- [x] Performance Chart - 图表切换、渐变填充
- [x] MacTable - 桌面端表格、移动端卡片
- [x] TierBadge - 渐变背景、阴影效果
- [x] DetailModal - 三分数网格、规格列表
- [x] CompareModal - VS 布局、雷达图
- [x] AI Chat - 消息气泡、Typing Indicator
- [x] CompareBar - 毛玻璃、头像预览
- [x] SettingsModal - 主题切换、语言选择
- [x] TradeInView - 残值计算、净成本
- [x] 响应式设计 - 移动端优先
- [x] 动画系统 - 交错入场、骨架屏
- [x] 可访问性 - ARIA 标签、键盘导航

### 🔄 优化中
- [ ] 打印样式优化
- [ ] PWA 离线支持
- [ ] 深色模式细腻调整

---

## 与代码实现对齐

### 已验证对齐的组件
1. ✅ [TierBadge.tsx](../app/components/TierBadge.tsx) - 渐变样式完全一致
2. ✅ [Hero.tsx](../app/components/Hero.tsx) - 背景光晕、响应式排版
3. ✅ [MacTable.tsx](../app/components/MacTable.tsx) - 桌面端/移动端双模式
4. ✅ [FilterControls.tsx](../app/components/FilterControls.tsx) - 筛选器样式
5. ✅ [DetailModal.tsx](../app/components/DetailModal.tsx) - 顶部渐变栏
6. ✅ [CompareModal.tsx](../app/components/CompareModal.tsx) - VS 布局
7. ✅ [AIChat.tsx](../app/components/AIChat.tsx) - 消息气泡样式
8. ✅ [CompareBar.tsx](../app/components/CompareBar.tsx) - 毛玻璃效果
9. ✅ [SettingsModal.tsx](../app/components/SettingsModal.tsx) - 主题切换
10. ✅ [TradeInView.tsx](../app/components/TradeInView.tsx) - 计算器界面

### 已验证对齐的功能
- ✅ 深色模式切换
- ✅ 中英文语言切换
- ✅ 场景权重选择
- ✅ URL 参数同步
- ✅ 分享功能
- ✅ 对比功能
- ✅ AI 聊天（在线/离线模式）

---

## 性能指标

### 已达成
- 首屏加载时间：< 2 秒
- 交互响应时间：< 100ms
- 支持机型数量：100+
- 移动端适配：320px - 2560px

### 目标
- Lighthouse 分数：95+
- Core Web Vitals: 全部绿色
- 可访问性评分：100

---

*本文档与代码实现保持同步更新*
