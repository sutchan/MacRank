# 04. 运维与展望 (Operations & Roadmap) v0.6.1

## 1. 部署与环境配置 (Deployment)
### 1.1 静态托管
- 默认部署于 Vercel/Cloudflare Pages。
- 构建命令: `npm run build` | 输出目录: `dist`。

### 1.2 环境变量
- `API_KEY`: 必须在构建侧注入，客户端通过 `process.env.API_KEY` 访问。建议开启域名 Referrer 限制以保障安全。

## 2. 项目演进路线 (Roadmap)
### 2.1 已达成里程碑
- [x] v0.5.12: 完成最终项目文件清理。
- [x] v0.6.0: 架构重构，将状态逻辑提取至自定义 Hooks。
- [x] v0.6.1: 为所有 UI 容器添加语义化 ID。

### 2.2 未来规划 (v0.6+)
- [ ] **性能长图一键生成**: 支持将对比结果导出为 macOS 风格的社交分享海报。
- [ ] **内存带宽可视化**: 增加对比图表，展示 LPDDR5/5x 的真实吞吐差距。

## 3. AI Agent 协作协议 (Agent Rules)
### 3.1 角色定义
- **Architect**: 负责维护卷 02/03。
- **DataMiner**: 负责维护 `app/data/` 数据的准确性与时效性。
- **Specialist**: 实现卷 01 的视觉设计。

### 3.2 更新协议
- 每次 Patch 级更新后，必须同步更新 `CHANGELOG.md` 并递增 `App.tsx` 中的版本常量。