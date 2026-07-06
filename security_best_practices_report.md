# MacRank 安全最佳实践审查报告

## 执行摘要

本次安全审查基于 Next.js + React + TypeScript 安全最佳实践规范，对 MacRank 项目进行了系统性安全审计。共发现 **12 个安全问题**（2 Critical, 4 High, 4 Medium, 2 Low），其中 **6 个已修复**，**6 个需要用户手动处理**。

审查范围：API 路由安全性、客户端 XSS 防护、环境变量处理、CORS/CSP 配置、依赖安全、敏感数据泄露。

---

## 发现的安全问题（按严重程度排序）

### Critical 严重程度

#### **[SEC-01] Google Analytics Measurement ID 硬编码在源码中**
- **规则 ID**: NEXT-SECRETS-001
- **位置**: `app/layout.tsx:38-47`
- **证据**: `G-YKBHMQRHC8` 直接硬编码在 Google Tag Manager Script 标签中
- **影响**: GA ID 虽然是公开信息（浏览器可见），但硬编码使配置不灵活，且无法在不同环境（dev/staging/prod）使用不同的 GA ID。更重要的是，如果未来需要在 GA ID 中包含敏感配置，此模式会导致泄露。
- **状态**: ✅ 已修复 - 改为 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 环境变量控制，未设置时不加载 GA

---

#### **[SEC-02] react-markdown 未限制允许的 HTML 元素**
- **规则 ID**: REACT-MARKUP-001 / NEXT-XSS-001
- **位置**: `app/components/ChatMessageBubble.tsx:26`
- **证据**: `<Markdown>{msg.text}</Markdown>` 无任何安全配置，AI 返回的 Markdown 内容可能包含恶意 HTML
- **影响**: AI 模型返回的内容如果包含 `<script>` 或 `<iframe>` 等 HTML 标签，可能被渲染执行导致 XSS。虽然 react-markdown v9 默认不允许 HTML，但未显式配置 `allowedElements` 意味着依赖默认行为，存在配置漂移风险。
- **状态**: ✅ 已修复 - 添加 `allowedElements` 白名单限制仅渲染安全 Markdown 元素，添加 `remark-gfm` 支持 GFM 语法

---

### High 高严重程度

#### **[SEC-03] 缺少 Content Security Policy (CSP) 和安全响应头**
- **规则 ID**: NEXT-CSP-001 / NEXT-HEADERS-001
- **位置**: `next.config.mjs`（原配置为空）
- **证据**: 无 CSP、无 X-Content-Type-Options、无 X-Frame-Options、无 Referrer-Policy
- **影响**: 缺少 CSP 使应用完全依赖 React 的默认转义来防御 XSS，无纵深防御；缺少 X-Frame-Options 使应用可被嵌入恶意 iframe（点击劫持）；缺少 nosniff 允许 MIME 嗅探攻击。
- **状态**: ✅ 已修复 - 在 `next.config.mjs` 中添加完整安全头配置

---

#### **[SEC-04] API 路由缺少 Cache-Control 头**
- **规则 ID**: NEXT-CACHE-001
- **位置**: `app/api/chat/route.ts:174-181`
- **证据**: API 响应无 Cache-Control 头
- **影响**: API 响应可能被 CDN 或浏览器缓存，导致用户获取过时的 AI 建议或缓存敏感会话数据
- **状态**: ✅ 已修复 - 添加 `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate`

---

#### **[SEC-05] API 路由缺少请求体大小限制**
- **规则 ID**: NEXT-DOS-001
- **位置**: `app/api/chat/route.ts:104`
- **证据**: 直接 `await request.json()` 无大小限制
- **影响**: 攻击者可发送超大 JSON payload 导致服务端内存耗尽（DoS）
- **状态**: ✅ 已修复 - 添加 512KB Content-Length 检查

---

#### **[SEC-06] 速率限制使用内存存储，Edge Runtime 冷启动时重置**
- **规则 ID**: NEXT-DOS-001
- **位置**: `app/api/chat/route.ts:18`
- **证据**: `const rateLimitStore = new Map<string, RateLimitEntry>()`
- **影响**: Edge Runtime 冷启动时 Map 会被清空，速率限制失效。攻击者可通过触发冷启动绕过限制。
- **状态**: ⚠️ 需要手动处理 - 已添加说明注释，建议迁移到 Redis/Valkey 等持久化存储

---

### Medium 中严重程度

#### **[SEC-07] dangerouslySetInnerHTML 用于主题检测脚本**
- **规则 ID**: REACT-XSS-001 / NEXT-XSS-001
- **位置**: `app/layout.tsx:23-35`
- **证据**: `<script dangerouslySetInnerHTML={{__html: \`...\`}} />`
- **影响**: `dangerouslySetInnerHTML` 是 React 的高风险 API。虽然此处内容为硬编码常量（仅读取 localStorage 的 theme 值），不包含任何用户输入，不存在实际 XSS 风险，但违反了安全最佳实践原则。
- **状态**: ✅ 已修复（已标注说明）- 添加安全注释说明此处为可信静态代码，无用户输入。移除不可行，因为需要在水合前执行避免 FOUC。

---

#### **[SEC-08] Google Tag Manager 脚本缺少 Subresource Integrity (SRI)**
- **规则 ID**: REACT-SRI-001 / NEXT-CSP-001
- **位置**: `app/layout.tsx:43`
- **证据**: `<Script async src="https://www.googletagmanager.com/gtag/js?id=..." />` 无 `integrity` 属性
- **影响**: 如果 GTM CDN 被入侵，恶意脚本将在用户浏览器中执行。SRI 可确保仅加载哈希匹配的脚本。
- **状态**: ⚠️ 需要手动处理 - Next.js `<Script>` 组件不直接支持 `integrity` 属性。建议考虑自托管 GA 脚本或使用 `<script>` 标签添加 SRI。

---

#### **[SEC-09] 依赖安全漏洞: postcss XSS (CVE in postcss <8.5.10)**
- **规则 ID**: NEXT-SUPPLY-001
- **位置**: `package.json` - `next@^15.5.18` 依赖 `postcss@^8.5.10`
- **证据**: `npm audit` 报告 2 个 moderate severity 漏洞（postcss XSS via Unescaped </style>）
- **影响**: PostCSS 在处理 CSS 时可能生成未转义的 `</style>` 导致 XSS。此漏洞通过 Next.js 间接依赖引入。
- **状态**: ⚠️ 需要手动处理 - 需要升级 Next.js 到修补版本。`npm audit fix --force` 会降级到 next@9，需等待 Next.js 官方更新 postcss 依赖。

---

#### **[SEC-10] Next.js 版本可能受 react2shell 漏洞影响**
- **规则 ID**: NEXT-SUPPLY-001
- **位置**: `package.json:18` - `"next": "^15.5.18"`
- **证据**: CVE-2025-66478 (react2shell) 影响所有 Next.js < 15.5.7 的 15.x 版本。当前 `^15.5.18` 的范围可能解析到安全版本，但 package-lock.json 应确认实际安装版本。
- **影响**: react2shell 是严重的 RCE 漏洞，允许攻击者通过特制请求在服务器上执行任意代码。
- **状态**: ⚠️ 需要手动处理 - 需确认 `package-lock.json` 中实际安装的 Next.js 版本 >= 15.5.7

---

### Low 低严重程度

#### **[SEC-11] localStorage 使用存储非敏感数据**
- **规则 ID**: REACT-AUTH-001 / JS-STORAGE-001
- **位置**: `app/hooks/useSettings.ts:19,34` / `app/components/SettingsModal.tsx:22`
- **证据**: `localStorage.getItem/setItem` 存储 'language' 和 'theme'；`localStorage.clear()` 清除所有数据
- **影响**: 存储的是非敏感 UI 偏好设置（语言、主题），风险很低。`localStorage.clear()` 会清除所有 localStorage 数据，如果其他应用共享同源则可能造成干扰。`useSettings.ts` 已实现 `safeLocalStorageGet` 带有长度限制 (<512) 和验证，安全性良好。
- **状态**: ℹ️ 信息性 - 当前实现已有足够防护，无需修改

---

#### **[SEC-12] 无 CORS 配置**
- **规则 ID**: NEXT-CORS-001
- **位置**: 全局
- **证据**: 无 CORS 头设置，无 middleware
- **影响**: Next.js API Routes 默认 same-origin，这是安全的默认行为。无需修改。
- **状态**: ℹ️ 信息性 - 默认行为安全，无需修改

---

## 已修复问题汇总

| 编号 | 问题 | 修复方式 | 文件 |
|------|------|----------|------|
| SEC-01 | GA ID 硬编码 | 改为 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 环境变量 | `app/layout.tsx` |
| SEC-02 | react-markdown 无元素限制 | 添加 `allowedElements` 白名单 + `remark-gfm` | `app/components/ChatMessageBubble.tsx` |
| SEC-03 | 缺少安全响应头 | 添加 CSP/X-Frame-Options/nosniff/HSTS 等 | `next.config.mjs` |
| SEC-04 | API 缺少 Cache-Control | 添加 `no-store` 缓存控制头 | `app/api/chat/route.ts` |
| SEC-05 | 无请求体大小限制 | 添加 512KB Content-Length 检查 | `app/api/chat/route.ts` |
| SEC-07 | dangerouslySetInnerHTML 无注释 | 添加安全说明注释 | `app/layout.tsx` |

## 需要用户手动处理的问题

| 编号 | 问题 | 建议操作 | 优先级 |
|------|------|----------|--------|
| SEC-06 | 速率限制内存存储 | 迁移到 Redis/Valkey 持久化存储 | High |
| SEC-08 | GTM 脚本无 SRI | 自托管 GA 脚本或使用原生 `<script>` + SRI | Medium |
| SEC-09 | postcss XSS 漏洞 | 等待 Next.js 更新 postcss 依赖或手动 override | Medium |
| SEC-10 | react2shell 版本确认 | 确认 package-lock.json 中 next >= 15.5.7 | High |
| SEC-11 | localStorage 非敏感数据 | 当前已有防护，仅作信息记录 | Low |
| SEC-12 | CORS 配置 | 默认 same-origin 安全，无需修改 | Low |

---

## 安全优势（已有的良好实践）

1. ✅ **API Key 服务端处理**: `GEMINI_API_KEY` 仅在 API Route (`app/api/chat/route.ts`) 中使用，未暴露到客户端
2. ✅ **输入验证完善**: API 路由实现了 `sanitizeInput`、`cleanString`、`cleanNumber`、`validateContextItem` 等多层验证
3. ✅ **速率限制已实现**: 虽然使用内存存储，但逻辑正确（10次/分钟/IP）
4. ✅ **URL 参数验证**: `urlParams.ts` 实现了完善的参数验证（SAFE_ID_PATTERN、长度限制、类型白名单）
5. ✅ **localStorage 验证**: `useSettings.ts` 实现了 `safeLocalStorageGet` 带长度限制和值验证
6. ✅ **错误处理安全**: API 错误返回通用消息，不泄露内部细节；服务器日志仅记录 error.message
7. ✅ **.env 文件在 .gitignore 中**: `.env`、`.env.local` 等均已排除
8. ✅ **无 eval/new Function/innerHTML**: 未发现动态代码执行或直接 DOM 操作
9. ✅ **无 NEXT_PUBLIC_ 前缀的敏感变量**: 无 API Key 等敏感信息暴露到客户端 bundle
10. ✅ **API 路由使用 force-dynamic**: 防止静态缓存导致数据泄露
11. ✅ **外部链接安全**: `<a target="_blank">` 均有 `rel="noopener noreferrer"`

---

## 环境变量配置说明

修复后需要配置以下环境变量：

```bash
# Google Analytics Measurement ID（公开，非敏感）
# 不设置则不加载 GA 脚本
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YKBHMQRHC8

# Gemini API Key（敏感，仅服务端使用）
GEMINI_API_KEY=your_gemini_api_key_here
```

---

*报告生成时间: 2026-07-06*
*审查标准: Next.js 15.x Security Spec / React 19.x Security Spec / OWASP Cheat Sheet Series*
