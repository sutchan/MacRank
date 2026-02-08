# 数据字典与算法定义 (Data Dictionary)

## 1. 文件组织
数据层采用静态文件存储，分为三个主要文件：
*   `lib/data-silicon.ts`: 存储 M1, M2, M3, M4 系列机型。
*   `lib/data-intel.ts`: 存储 2010-2020 年 Intel Core i5/i7/i9/Xeon 机型。
*   `lib/data.ts`: 聚合上述两个文件，导出统一的 `macData` 数组。

## 2. 数据模型 (MacModel)

| 字段名 | 类型 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| `id` | `string` | 唯一标识符 (手动定义，slug格式) | `"m4-max-16-16-40"` |
| `name` | `string` | 显示名称 | `"MacBook Pro 16" (Late 2024)"` |
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

## 3. 枚举定义

### ChipFamily
- `M1`, `M2`, `M3`, `M4`
- `Intel`

### DeviceType
- `Laptop` (笔记本)
- `Desktop` (台式机)
- `Tablet` (平板/iPad)

## 4. 评分算法 (Tier Scoring)
算法位于 `lib/scoring.ts`。

### 综合评分 (Composite Score)
为了将不同维度的性能压缩为一个可排名的数值，采用加权归一化算法：

$$
Score = ( \frac{SingleCore}{4000} \times 35 ) + ( \frac{MultiCore}{25000} \times 45 ) + ( \frac{Metal}{200000} \times 20 )
$$

*注：分母 (4000, 25000, 200000) 为当前世代的大致最大值，用于归一化。*

### 段位划分 (Tier Levels)

| 段位 | 综合分阈值 | 颜色标识 (Tailwind) | 描述 |
| :--- | :--- | :--- | :--- |
| **S+** | ≥ 90 | Purple-600 (Gradient) | 幻神级 (God Tier) |
| **S** | ≥ 80 | Purple-500 | 顶级 (Top Tier) |
| **A+** | ≥ 70 | Blue-600 | 次顶级 (High-End) |
| **A** | ≥ 60 | Blue-500 | 优秀 (Excellent) |
| **B** | ≥ 45 | Green-500 | 良好 (Good) |
| **C** | ≥ 30 | Yellow-500 | 入门 (Entry) |
| **D** | < 30 | Gray-500 | 淘汰/过时 (Legacy) |
