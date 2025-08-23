# Upload kintone customize action

Upload kintone customize JS/CSS files from GitHub Actions.

GitHub Actionsを使ってkintoneのカスタマイズJS/CSSファイルをアップロードします。

## Example

```yaml
name: Upload kintone customize file
on: [push]

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Upload kintone customize file
        uses: macrat/upload-kintone-customize-action@v1
        with:
          base-url: ${{ secrets.KINTONE_BASE_URL }}
          username: ${{ secrets.KINTONE_USERNAME }}
          password: ${{ secrets.KINTONE_PASSWORD }}
          app-id: ${{ secrets.KINTONE_APP_ID }}
          desktop-js: |
            ./customize/desktop.js
            ./customize/extra-desktop.js
          desktop-css: |
            ./customize/desktop.css
          mobile-js: |
            ./customize/mobile.js
          mobile-css: |
            ./customize/mobile.css
```

## Inputs (en)

| Name | Description | Required | Default |
|------|-------------|----------|---------|
| base-url | Base-url of your kintone (e.g. `https://example.cybozu.com`) | Yes | - |
| app-id | kintone App ID | Yes | - |
| scope | Scope to enable customize (ALL, ADMIN, or NONE) | No | ALL |
| desktop-js | Path to desktop JS files | No | - |
| desktop-css | Path to desktop CSS files | No | - |
| mobile-js | Path to mobile JS files | No | - |
| mobile-css | Path to mobile CSS files | No | - |
| username | Login username | Yes | - |
| password | User's password | Yes | - |
| oauth-token | OAuth token (if you want to use OAuth authentication) | No | - |
| basic-auth-username | Basic Auth username (if your kintone is protected by Basic Auth) | No | - |
| basic-auth-password | Basic Auth password (if your kintone is protected by Basic Auth) | No | - |
| guest-space-id | Guest space ID (if you want to upload to a guest space) | No | - |

`desktop-js`, `desktop-css`, `mobile-js`, and `mobile-css` can contain multiple file paths separated by newlines.


## Inputs (ja)

| 名前 | 説明 | 必須 | デフォルト |
|------|------|------|-----------|
| base-url | kintone環境のベースURL (例: `https://example.cybozu.com`) | はい | - |
| app-id | kintoneアプリID | はい | - |
| scope | カスタマイズの適用範囲 (ALL, ADMIN, またはNONE) | いいえ | ALL |
| desktop-js | デスクトップ用JSファイルのパス | いいえ | - |
| desktop-css | デスクトップ用CSSファイルのパス | いいえ | - |
| mobile-js | モバイル用JSファイルのパス | いいえ | - |
| mobile-css | モバイル用CSSファイルのパス | いいえ | - |
| username | ログインユーザー名 | はい | - |
| password | ユーザーのパスワード | はい | - |
| oauth-token | OAuthトークン (OAuth認証を使用する場合) | いいえ | - |
| basic-auth-username | Basic認証のユーザー名 (kintoneがBasic認証で保護されている場合) | いいえ | - |
| basic-auth-password | Basic認証のパスワード (kintoneがBasic認証で保護されている場合) | いいえ | - |
| guest-space-id | ゲストスペースID (ゲストスペースにアップロードする場合) | いいえ | - |

`desktop-js`, `desktop-css`, `mobile-js`, `mobile-css`には複数のファイルパスを改行で区切って指定できます。
