# 🐳 Docker運用ガイド

このドキュメントでは、コード解説ツールをDocker環境で運用する手順を説明します。

## 📋 前提条件

- Docker および Docker Compose がインストールされていること
- n8nのWebhook URLが取得済みであること

## 🚀 起動手順

### 1. 環境変数の設定

```bash
# .envファイルを作成
cp .env.example .env

# .envファイルを編集してN8N_WEBHOOK_URLを設定
# 例: N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/code-analysis
```

### 2. 簡単起動（推奨）

```bash
# 自動起動スクリプトを使用
./docker-run.sh
```

### 3. 手動起動

```bash
# イメージのビルド
docker-compose build

# コンテナの起動
docker-compose up -d

# ログの確認
docker-compose logs -f code-explainer-app
```

## 🌐 アクセス

- **アプリケーション**: http://localhost:3000
- ブラウザでアクセスして、コードファイルをアップロードしてください

## 🔧 運用コマンド

```bash
# コンテナの状況確認
docker-compose ps

# ログの表示
docker-compose logs -f

# コンテナの停止
docker-compose down

# コンテナとイメージの削除
docker-compose down --rmi all
```

## 🔗 n8n連携について

### Webhook URL設定

1. n8nでWebhookノードを作成
2. 受信データ形式: `{ "code": "コードの文字列" }`
3. 返却データ形式:
   ```json
   [
     { "line": 1, "code": "コードの1行目", "explanation": "1行目の解説文" },
     { "line": 2, "code": "コードの2行目", "explanation": "2行目の解説文" }
   ]
   ```

### ネットワーク設定

- Docker Composeのネットワーク設定により、n8nとの通信が可能
- 本番環境では適切なセキュリティ設定を行ってください

## 🛠 トラブルシューティング

### ポートが使用中の場合

```bash
# docker-compose.ymlの ports を変更
- "3001:3000"  # 3001ポートでアクセス
```

### ビルドエラーの場合

```bash
# キャッシュを無視してビルド
docker-compose build --no-cache
```

### n8n接続エラーの場合

1. `.env`のN8N_WEBHOOK_URLが正しいか確認
2. n8nサービスが起動しているか確認
3. ネットワーク設定を確認