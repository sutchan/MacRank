# 数据字典与算法定义 (Data Dictionary)

## 1. 文件组织
数据层采用静态文件存储，分为三个主要文件：
*   `lib/data-silicon.ts`: 存储 M1, M2, M3, M4 系列机型。
*   `lib/data-intel.ts`: 存储 2010-2020 年 Intel Core i5/i7/i9/Xeon 机型。
*   `lib/data-reference.ts`: 存储 PC/GPU 参考硬件 (如 RTX 4090, i9-14900K)。
*   `lib/data.ts`: 聚合上述文件，导出统一的 `macData` 和 `refData` 数组。

## 2. 数据模型 (MacModel)

| 字段名 | 类型 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| `id` | `string` | 唯一标识符 (手动定义，slug格式) | `"m4-max-16-16-40"` |
| `name` | `string` | 显示名称 | `"MacBook Pro 16\" (Late 2024)"` |
| `type` | `DeviceType` | 设备类型枚举 | `DeviceType.Laptop` |
| `chip` | `string` | 芯片完整名称 | `"M4 Max"` |
| `family` | `ChipFamily` | 芯片家族枚举 | `ChipFamily.M4` |
| `cores_cpu` | `string` | CPU核心描述 | `"16 (12P+4E)"` |
| `cores_gpu` | `number` | GPU核心数量 | `40` |
| `memory` | `string` | 统一内存范围描述 | `"48GB - 128GB"` |
| `releaseYear` | `number` | 发布年份 | `2024` |
| `singleCoreScore` | `number` | Geekbench 6 单核预估分 | `4060` |
| `multiCoreScore` | `number` | Geekbench 6 多核预估分 | `26800` |
| `metalScore` | `number` | Geekbench Metal GPU 预估分 | `192000` |
| `basePriceUSD` | `number` | 基础发售价 (USD) | `3999` |
| `description` | `string` | 机型简评 (1-2句) | `"The absolute pinnacle..."` |
| `isReference` | `boolean` | 标记是否为 PC/参考硬件 | `true` |

## 3. 枚举定义

### ChipFamily
- `M1`, `M2`, `M3`, `M4`
- `Intel`
- `Reference` (用于 PC 硬件)

### DeviceType
- `Laptop` (笔记本)
- `Desktop` (台式机)
- `Tablet` (平板/iPad)
- `GPU` (独立显卡)
- `CPU` (独立处理器)

### RankingScenario
- `balanced` (平衡模式，默认)
- `developer` (开发者模式，侧重多核)
- `creative` (创意模式，侧重 GPU)
- `daily` (日常模式，侧重单核)

## 4. 评分算法 (Tier Scoring)
算法位于 `lib/scoring.ts`。

### 归一化常量
- `MAX_SC = 4200` (单核最大值)
- `MAX_MC = 28000` (多核最大值)
- `MAX_MT = 200000` (Metal 最大值)

### 场景权重 (Scenario Weights)

| 场景 | 单核权重 | 多核权重 | Metal 权重 | 适用场景 |
| :--- | :---: | :---: | :---: | :--- |
| **balanced** | 35% | 45% | 20% | 通用平衡模式 (默认) |
| **developer** | 20% | 65% | 15% | 开发、编译、虚拟化 |
| **creative** | 15% | 30% | 55% | 设计、渲染、3D 创作 |
| **daily** | 70% | 20% | 10% | 日常办公、网页浏览 |

### 综合评分 (Composite Score)
为了将不同维度的性能压缩为一个可排名的数值，采用加权归一化算法，并乘以 100 以获得 4-5 位数的直观分数：

$$
Score = \left[ ( \frac{SingleCore}{MAX\_SC} \times SC\_Weight ) + ( \frac{MultiCore}{MAX\_MC} \times MC\_Weight ) + ( \frac{Metal}{MAX\_MT} \times MT\_Weight ) \right] \times 100
$$

### 段位划分 (Tier Levels)

| 段位 | 综合分阈值 | 颜色标识 (Tailwind) | 描述 |
| :--- | :--- | :--- | :--- |
| **S+** | ≥ 9000 | Purple-600 | 幻神级 (God Tier) |
| **S** | ≥ 8000 | Purple-500 | 顶级 (Top Tier) |
| **A+** | ≥ 7000 | Blue-600 | 次顶级 (High-End) |
| **A** | ≥ 6000 | Blue-500 | 优秀 (Excellent) |
| **B** | ≥ 4500 | Green-500 | 良好 (Good) |
| **C** | ≥ 3000 | Yellow-500 | 入门 (Entry) |
| **D** | < 3000 | Gray-500 | 淘汰/过时 (Legacy) |

## 5. URL 参数同步
App.tsx 中实现了完整的 URL 参数同步机制，支持以下参数：

| 参数 | 说明 | 示例值 |
| :--- | :--- | :--- |
| `search` | 搜索关键词 | `macbook` |
| `type` | 设备类型 | `Laptop`, `Desktop`, `Tablet` |
| `family` | 芯片家族 | `M4`, `M3`, `Intel` |
| `sort` | 排序方式 | `score`, `price`, `year` |
| `scenario` | 评分场景 | `balanced`, `developer`, `creative`, `daily` |
| `ref` | 显示参照系 | `true` |
| `compare` | 对比机型 ID (逗号分隔) | `m4-max,m3-ultra` |

## 6. AI 上下文策略
AI 服务位于 `services/geminiService.ts`，采用以下优化策略：
- **上下文修剪**: 只注入 Top 40 最相关机型 (按年份和多核评分排序)
- **延迟优化**: 设置 `thinkingBudget: 0` 关闭思维链
- **离线降级**: 网络不可用时使用本地关键词匹配逻辑
