/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker用の最適化設定
  output: 'standalone',
  
  // 画像最適化（Dockerでの安定性向上）
  images: {
    unoptimized: true
  },

  // n8n連携のためのCORS設定
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },

  // 環境変数の設定
  env: {
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  }
}

module.exports = nextConfig
