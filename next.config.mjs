/** @type {import('next').NextConfig} */
const securityHeaders = [
  // 防止 MIME 类型嗅探 (NEXT-HEADERS-001)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // 防止点击劫持 (NEXT-HEADERS-001)
  { key: 'X-Frame-Options', value: 'DENY' },
  // 控制 Referer 信息泄露 (NEXT-HEADERS-001)
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // 限制浏览器功能权限 (NEXT-HEADERS-001)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // CSP: 限制脚本来源，防止 XSS (NEXT-CSP-001)
  // 注意: 'unsafe-inline' 和 'unsafe-eval' 应尽量避免
  // 当前因 Google Tag Manager 内联脚本需保留 unsafe-inline，后续应迁移到 nonce 方案
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://generativelanguage.googleapis.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
  // 防止降级协议攻击
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
