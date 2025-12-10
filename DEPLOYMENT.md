# 独自ドメインでの公開手順

このプロジェクトを独自ドメインで公開する手順を説明します。

## 前提条件

- 独自ドメインを取得済み
- GitHubアカウント（推奨）
- ホスティングサービスのアカウント

## 方法1: Netlify（推奨・最も簡単）

### 1. プロジェクトをGitHubにプッシュ

```bash
# Gitリポジトリを初期化（まだの場合）
git init
git add .
git commit -m "Initial commit"

# GitHubにリポジトリを作成後、以下を実行
git remote add origin https://github.com/your-username/hajimari-design.git
git branch -M main
git push -u origin main
```

### 2. Netlifyでデプロイ

1. [Netlify](https://www.netlify.com/)にアクセスしてアカウント作成
2. 「Add new site」→「Import an existing project」を選択
3. GitHubを選択してリポジトリを接続
4. ビルド設定：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. 「Deploy site」をクリック

### 3. 独自ドメインの設定

1. Netlifyダッシュボードで「Domain settings」を開く
2. 「Add custom domain」をクリック
3. 取得済みのドメインを入力（例: `hajmari-design.com`）
4. DNS設定：
   - **Aレコード**: Netlifyが提供するIPアドレスを設定
   - **CNAMEレコード**: `www`サブドメインをNetlifyのドメインに設定
5. DNSの反映を待つ（通常数分〜24時間）

### 4. HTTPSの有効化

- Netlifyは自動的にLet's EncryptでSSL証明書を発行します
- 数分で自動的に有効化されます

---

## 方法2: Vercel

### 1. GitHubにプッシュ（方法1と同じ）

### 2. Vercelでデプロイ

1. [Vercel](https://vercel.com/)にアクセスしてアカウント作成
2. 「Add New Project」をクリック
3. GitHubリポジトリを選択
4. ビルド設定：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 「Deploy」をクリック

### 3. 独自ドメインの設定

1. プロジェクトの「Settings」→「Domains」を開く
2. ドメインを追加
3. DNS設定：
   - Vercelが提供するDNS設定に従って設定
4. DNSの反映を待つ

---

## 方法3: Cloudflare Pages

### 1. GitHubにプッシュ（方法1と同じ）

### 2. Cloudflare Pagesでデプロイ

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. 「Pages」→「Create a project」を選択
3. GitHubリポジトリを接続
4. ビルド設定：
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 「Save and Deploy」をクリック

### 3. 独自ドメインの設定

1. Cloudflareでドメインを管理している場合：
   - 「Custom domains」でドメインを追加
   - DNS設定は自動的に行われます

2. 他のDNSプロバイダーを使用している場合：
   - CNAMEレコードを設定してCloudflare Pagesのドメインを指す

---

## 方法4: 従来のサーバー（VPS/共有サーバー）

### 1. ビルド

```bash
npm run build
```

### 2. ファイルをアップロード

`dist`フォルダ内のファイルをサーバーの公開ディレクトリ（例: `/public_html`）にアップロード

### 3. サーバー設定

#### Apacheの場合（`.htaccess`ファイルを作成）

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginxの場合

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 4. SSL証明書の設定

Let's Encryptを使用してSSL証明書を取得：

```bash
# Certbotを使用
sudo certbot --apache  # Apacheの場合
sudo certbot --nginx   # Nginxの場合
```

---

## ビルド前の確認事項

### 1. 環境変数の確認

`.env`ファイルに必要な環境変数がある場合、ホスティングサービスの環境変数設定で追加してください。

### 2. ビルドテスト

```bash
npm run build
npm run preview
```

ローカルでビルドが正常に動作することを確認してください。

### 3. パスの確認

HashRouterを使用しているため、サーバー側の特別な設定は不要です。

---

## トラブルシューティング

### 404エラーが発生する場合

- HashRouterを使用しているため、通常は発生しません
- サーバー側で`index.html`へのフォールバック設定が必要な場合があります

### 画像が表示されない場合

- 画像のパスが相対パスになっているか確認
- CDNを使用している場合は、CORS設定を確認

### ビルドエラーが発生する場合

```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 推奨設定

### 1. カスタム404ページ（オプション）

`public/404.html`を作成してカスタム404ページを設定できます。

### 2. パフォーマンス最適化

- 画像の最適化（WebP形式への変換）
- コード分割の確認
- キャッシュ設定

### 3. SEO設定

`index.html`のメタタグを適切に設定してください。

---

## 各サービスの比較

| サービス | 無料プラン | 設定の簡単さ | カスタムドメイン | SSL |
|---------|-----------|------------|----------------|-----|
| Netlify | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| Vercel | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| Cloudflare Pages | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ |
| VPS/共有サーバー | ❌ | ⭐⭐ | ✅ | 要設定 |

**推奨**: NetlifyまたはVercelが最も簡単で、無料プランでも十分に機能します。

