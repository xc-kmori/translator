# コード解説ツール

プログラミング初学者がソースコードを学習するためのWebアプリケーションです。ユーザーがアップロードしたコードに対し、AIによる解説を行番号と連携させて表示します。

## 🚀 仮想環境セットアップ

### 方法1: nvm（推奨）

```bash
# nvmがインストールされていることを確認
nvm --version

# プロジェクトディレクトリに移動
cd translator

# 自動セットアップスクリプトを実行
./setup-env.sh

# または手動セットアップ
nvm use          # .nvmrcに基づいてNode.jsバージョンを使用
npm install      # 依存関係をインストール
npm run dev      # 開発サーバーを起動
```

### 方法2: Docker

```bash
# 開発環境で起動
docker-compose up translator-dev

# または本番環境で起動
docker-compose up translator-app

# Dockerで単体起動
docker build -t translator .
docker run -p 3000:3000 translator
```

## 🎯 機能

### 主要機能
- 📁 **ファイルアップロード**: ドラッグ&ドロップ対応
- 🔄 **API通信**: n8nとの連携（1回のみの通信）
- 🎨 **シンタックスハイライト**: 複数言語対応
- 👆 **行番号クリック**: インタラクティブな解説表示
- ⚡ **ローディング表示**: 処理中の視覚的フィードバック

### 対応ファイル形式
- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- Python (.py)
- Java (.java)
- C/C++ (.c, .cpp)
- C# (.cs)
- PHP (.php)
- Ruby (.rb)
- Go (.go)
- Rust (.rs)
- HTML (.html)
- CSS (.css)
- SQL (.sql)

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 14
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **シンタックスハイライト**: react-syntax-highlighter
- **仮想環境**: nvm + Docker

## 📝 API仕様

### n8n Webhook エンドポイント

```
POST https://YOUR_N8N_WEBHOOK_URL
Content-Type: application/json

{
  "code": "ここにファイル内容の文字列"
}
```

### レスポンス形式

```json
[
  { "line": 1, "code": "コードの1行目", "explanation": "1行目の解説文" },
  { "line": 2, "code": "コードの2行目", "explanation": "2行目の解説文" },
  ...
]
```

## 🔧 設定

`src/app/page.tsx`の以下の部分でn8nのWebhook URLを設定してください：

```typescript
const response = await fetch('https://YOUR_N8N_WEBHOOK_URL', {
```

## 🏃‍♂️ 開発コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # コードチェック
```

## 📁 プロジェクト構成

```
translator/
├── src/
│   ├── app/
│   │   ├── page.tsx          # メインページ
│   │   ├── layout.tsx        # レイアウト
│   │   └── globals.css       # グローバルスタイル
│   └── components/
│       ├── FileUpload.tsx    # ファイルアップロードコンポーネント
│       └── CodeExplainer.tsx # コード解説表示コンポーネント
├── .nvmrc                    # Node.jsバージョン指定
├── Dockerfile               # 本番用Docker設定
├── Dockerfile.dev           # 開発用Docker設定
└── docker-compose.yml       # Docker Compose設定
```