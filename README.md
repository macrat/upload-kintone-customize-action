# Upload kintone customize action

A GitHub Action to upload [kintone](https://www.kintone.com/) customize JS/CSS files.

GitHub Actionで[kintone](https://kintone.cybozu.co.jp/)のカスタマイズ用JS/CSSファイルをアップロードするためのカスタムアクション。


## Basic usage

```yaml
name: Upload kintone customize file
on: [push]

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - name: Upload kintone customize file
        uses: macrat/upload-kintone-customize-action@v1
        with:
          base-url: ${{ secrets.KINTONE_BASE_URL }}
          username: ${{ secrets.KINTONE_USERNAME }}
          password: ${{ secrets.KINTONE_PASSWORD }}
          app-id: ${{ secrets.KINTONE_APP_ID }}
          desktop-js: ./dist/desktop.js
          desktop-css: ./dist/desktop.css
          mobile-js: ./dist/mobile.js
          mobile-css: ./dist/mobile.css
```


## Inputs

### `base-url` (required)

Base-url of your kintone (e.g. `https://example.cybozu.com`)

kintone環境のベースURL (例: `https://example.cybozu.com`)

### `app-id` (required)

kintone App ID.

kintoneアプリID。

### `scope`

Scope to enable customize. One of the following values:
- `ALL`: Enable for all users (default)
- `ADMIN`: Enable for admin users only
- `NONE`: Disable customize

カスタマイズを誰に適用するか。以下のいずれかの値を指定します。

- `ALL`: すべてのユーザーに適用 (デフォルト)
- `ADMIN`: 管理者ユーザーのみに適用
- `NONE`: カスタマイズを無効化

### `desktop-js` / `desktop-css` / `mobile-js` / `mobile-css` (required)

Path to desktop/mobile JS/CSS files. You can specify multiple file paths separated by newlines.
You need to specify at least one of these.

デスクトップ/モバイル用のJS/CSSファイルのパス。複数のファイルパスを改行で区切って指定できます。
少なくともいずれか1つを指定する必要があります。

### `username` / `password`

Login username and password.
These are required if you don't use `oauth-token`.

ログインユーザー名とパスワード。
`oauth-token`を使用しない場合は必須です。

### `oauth-token`

OAuth token.
If you want to use OAuth authentication, you can specify this instead of `username` and `password`.

OAuthトークン。
OAuth認証を使用する場合、`username`と`password`の代わりにこれを指定できます。

### `basic-auth-username` / `basic-auth-password`

Basic Auth username and password.
If your kintone is protected by Basic Auth, you need to specify these.

Basic認証のユーザー名とパスワード。
kintoneがBasic認証で保護されている場合、これらを指定する必要があります。

### `guest-space-id`

Guest space ID.
If omitted, the files will be uploaded to the regular space.

ゲストスペースID。
省略すると通常のスペースにアップロードされます。


## Examples

### Build and upload kintone customize file

```yaml
name: Build and upload kintone customize file
on: [push]

jobs:
  build-and-upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Upload kintone customize file
        uses: macrat/upload-kintone-customize-action@v1
        with:
          base-url: ${{ secrets.KINTONE_BASE_URL }}
          username: ${{ secrets.KINTONE_USERNAME }}
          password: ${{ secrets.KINTONE_PASSWORD }}
          app-id: ${{ secrets.KINTONE_APP_ID }}
          desktop-js: ./dist/desktop.js
          desktop-css: ./dist/desktop.css
          mobile-js: ./dist/mobile.js
          mobile-css: ./dist/mobile.css
```

### Upload multiple files

```yaml
name: Upload kintone customize file
on: [push]

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - name: Upload kintone customize file
        uses: macrat/upload-kintone-customize-action@v1
        with:
          base-url: ${{ secrets.KINTONE_BASE_URL }}
          username: ${{ secrets.KINTONE_USERNAME }}
          password: ${{ secrets.KINTONE_PASSWORD }}
          app-id: ${{ secrets.KINTONE_APP_ID }}
          desktop-js: |
            ./dist/desktop1.js
            ./dist/desktop2.js
          desktop-css: |
            ./dist/desktop1.css
            ./dist/desktop2.css
            ./dist/desktop3.css
`
