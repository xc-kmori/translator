#!/bin/bash

echo "コード解説ツール - 仮想環境セットアップ"
echo "========================================"

# Node.jsバージョンを確認
if command -v nvm &> /dev/null; then
    echo "✅ nvmが利用可能です"
    
    # .nvmrcファイルに基づいてNode.jsバージョンを使用
    if [ -f ".nvmrc" ]; then
        echo "📋 .nvmrcに基づいてNode.js $(cat .nvmrc)を使用します"
        nvm use
        nvm install
    fi
else
    echo "⚠️  nvmが見つかりません。手動でNode.js 22.16.0をインストールしてください"
fi

# 依存関係のクリーンインストール
echo "📦 依存関係をクリーンインストール中..."
rm -rf node_modules package-lock.json
npm install

echo ""
echo "🎉 セットアップが完了しました！"
echo ""
echo "以下のコマンドで開発サーバーを起動できます："
echo "  npm run dev"
echo ""
echo "Dockerを使用する場合："
echo "  docker-compose up translator-dev"
echo ""