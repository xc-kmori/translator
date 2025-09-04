# Node.js 18のアルパイン版を使用
FROM node:18-alpine AS base

# 依存関係のインストール用ステージ
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./
RUN npm ci --only=production

# ビルド用ステージ
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.jsアプリをビルド
RUN npm run build

# 本番実行用ステージ
FROM base AS runner
WORKDIR /app

# 必要な環境変数を設定
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# nextjsユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 必要なファイルをコピー
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# nextjsユーザーに切り替え
USER nextjs

# ポート3000を公開
EXPOSE 3000

# 環境変数でポートを設定
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# アプリケーションを起動
CMD ["node", "server.js"]