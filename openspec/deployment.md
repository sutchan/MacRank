# 部署指南 (Deployment Guide)

## 1. 构建环境要求
- **Node.js**: v18.0.0 或更高版本。
- **包管理器**: npm 或 bun。

## 2. 环境变量配置
在部署前，必须配置以下环境变量：

| 变量名 | 描述 | 示例 |
| :--- | :--- | :--- |
| `API_KEY` | Google Gemini API 密钥 (必填) | `AIzaSy...` |

*注意：由于是纯前端项目，API_KEY 会在构建时被注入到客户端代码中。请确保使用限制了 Referrer 的 API Key 以保证安全。*

## 3. 本地构建与预览

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

## 4. 部署策略

### 4.1 静态托管 (推荐)
本项目构建产物为纯静态文件 (`dist/` 目录)，可部署至任何静态网站托管服务。

#### Vercel / Netlify / Cloudflare Pages
1. 连接 GitHub 仓库。
2. 设置构建命令: `npm run build`
3. 设置输出目录: `dist`
4. 在平台后台设置 `API_KEY` 环境变量。

### 4.2 Docker 部署 (Nginx)
如果需要容器化部署：

```dockerfile
# Build Stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG API_KEY
ENV API_KEY=$API_KEY
RUN npm run build

# Serve Stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 5. 发布清单
每次发布新版本前，请检查：
1. `package.json` 中的 `version` 是否更新。
2. `App.tsx` 中的 `APP_VERSION` 常量是否同步。
3. `CHANGELOG.md` 是否记录了变更。
4. PWA Service Worker 是否正常更新 (由 `vite-plugin-pwa` 自动处理版本 Hash)。
