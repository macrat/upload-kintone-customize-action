# Upload kintone cutsomize action

Upload kintone customize JS/CSS files from GitHub Actions.

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
