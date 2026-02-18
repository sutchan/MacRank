# 02. 技术规格 (Technical Specification) v0.6.1

## 1. 评分算法 (Normalization Algorithm)
### 1.1 性能锚点 (Anchors)
为确保得分区间稳定，天梯归一化锚点预设为：
- `MAX_SC`: 5000 (单核)
- `MAX_MC`: 35000 (多核)
- `MAX_MT`: 250000 (图形/Metal)

### 1.2 场景权重矩阵 (Scenario Weights)
| 场景 (Scenario) | 单核 (SC) | 多核 (MC) | 图形 (MT) |
| :--- | :--- | :--- | :--- |
| **Balanced (均衡)** | 35% | 45% | 20% |
| **Developer (开发)** | 20% | 65% | 15% |
| **Creative (创作)** | 15% | 30% | 55% |
| **Daily (日常)** | 70% | 20% | 10% |

## 2. 状态持久化协议 (URL Hash Schema)
应用状态必须通过 `URLSearchParams` 序列化并存入 `window.location.hash`：
- `search`: 搜索关键词字符串。
- `type`: 设备类型 (Laptop/Desktop/Tablet/All)。
- `family`: 芯片家族 (M4/M3.../All)。
- `sort`: 排序键 (score/price/year/name)。
- `dir`: 排序方向 (asc/desc)。
- `scenario`: 当前评分权重场景名。
- `compare`: 以逗号分隔的机型 ID 列表。
- `ref`: 是否开启参考数据 (true/false)。
- `model`: 当前展开详情的机型 ID。

## 3. AI 架构与离线回退 (RAG Strategy)
### 3.1 离线匹配算法 (Offline Matching)
当 `navigator.onLine === false` 时执行：
1. **分词**: 将用户 Query 按空格分割成多个关键词。
2. **子串匹配**: 在 `macData` 数据集中，遍历每个机型的 `name`, `chip`, `type` 字段，检查是否包含任意一个关键词。
3. **排序与输出**: 返回所有匹配机型中的前 3 名（按年份和多核性能降序排列），并格式化为预设的 Markdown 模板。

### 3.2 在线 Context 裁剪
发送至 Gemini 的 Context 必须经过排序并截取 Top 45，以防超出 Token 限制且保证推荐的相关性。

## 4. 前端架构
- **React 19**: 利用并发渲染优化长列表。
- **Zero-Bundle**: 依赖 `importmap` 指向 `esm.sh` 锁定版本。
- **Custom Hooks**: 状态逻辑通过 `useSettings`, `useMacData`, `useInteraction` 进行封装，实现关注点分离。