# Node.js 22.16.0を使用した仮想環境
FROM node:22.16.0-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci --only=production

# ソースコードをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN npm run build

# 3000番ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]