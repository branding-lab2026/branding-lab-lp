# ブランディング未来創造ラボ FY26 LP

ひろしまCamps × FICC「ブランディング未来創造ラボ FY26」の申込ページ(ランディングページ)です。

**公開URL**: https://branding-lab2026.github.io/branding-lab-lp/
**リポジトリ**: https://github.com/branding-lab2026/branding-lab-lp

## フォルダの中身

```
LP/
├─ index.html          ← ページ本体
├─ css/style.css        ← デザイン(色・レイアウト)
├─ js/main.js           ← スマホメニューの開閉など
├─ assets/img/          ← 写真・ロゴ
├─ serve.ps1            ← 手元で確認するための簡易サーバー(公開には使いません)
└─ README.md            ← このファイル
```

## 手元での確認方法(Windows)

1. このフォルダで PowerShell を開く
2. 以下を実行する

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

3. ブラウザで `http://localhost:8080/` を開く
4. 確認が終わったら、PowerShellの画面で `Ctrl + C` を押して停止する

## 修正を公開に反映する手順

このフォルダで修正した後、以下を実行すると数分後に公開ページに反映されます。

```bash
git add -A
git commit -m "変更内容のメモ"
git push
```

## 後で必ずやること(TODO)

- [ ] 独自ドメインを取得した場合は、`CNAME` というファイルを追加する(取得時にサポートします)

## 使用素材の出典

- ロゴ・講師写真・トップ背景写真: `FICC チラシ.pptx` より
- 「昨年度の様子」の写真5点: `[ブランディング未来創造ラボ]_広島県庁_御木様名和田様ご説明 (2).pdf` に含まれるFICCのワークショップ写真より抽出(個人名・企業名が特定できる情報は含めていません)
- フォント: Noto Sans JP / Noto Serif JP(Google Fonts、無料・商用利用可)
