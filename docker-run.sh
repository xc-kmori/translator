#!/bin/bash

# Docker環境でのアプリケーション起動スクリプト

echo "🚀 コード解説ツールのDocker環境を起動しています..."

# 環境変数ファイルの確認
if [ ! -f .env ]; then
    echo "⚠️  .envファイルが見つかりません。"
    echo "📝 .env.exampleを参考に.envファイルを作成してください。"
    echo ""
    echo "例："
    echo "cp .env.example .env"
    echo "# その後、.envファイル内のN8N_WEBHOOK_URLを正しいURLに変更してください"
    echo ""
    read -p "デフォルト設定で続行しますか？ (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Dockerイメージのビルドと起動
echo "🔨 Dockerイメージをビルドしています..."
docker-compose build

echo "🚀 アプリケーションを起動しています..."
docker-compose up -d

echo ""
echo "✅ アプリケーションが起動しました！"
echo "🌐 ブラウザで http://localhost:3000 にアクセスしてください"
echo ""
echo "📊 ログを確認するには: docker-compose logs -f code-explainer-app"
echo "🛑 停止するには: docker-compose down"