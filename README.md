# ブランディング未来創造ラボ FY26 LP

ひろしまCamps × FICC「ブランディング未来創造ラボ FY26」の申込ページ(ランディングページ)です。

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

## GitHubページで公開する手順

1. https://github.com にログイン(ユーザー名: `ray3714jmkagi-debug`)
2. 右上の「+」→「New repository」をクリック
3. Repository name に `branding-lab-lp` など好きな名前を入れて「Create repository」
4. 作成後の画面に出るコマンドは使わず、Claude Codeから以下の要領でアップロードします(この後、担当者と一緒に実施します)
   - このフォルダの中身一式をそのリポジトリにアップロード(push)
   - リポジトリの Settings → Pages → Branch を `main` / `/(root)` に設定
   - 数分後、`https://ray3714jmkagi-debug.github.io/branding-lab-lp/` のようなURLで公開されます

※このステップは実際にpushするタイミングでもう一度サポートします。

## 後で必ずやること(TODO)

- [ ] `index.html` 内の「お問い合わせ」ボタン(ヘッダー右上・右下フローティング・フッター)にある
      `mailto:rei.okamoto@lt-s.jp` を、問い合わせ用GoogleフォームができたらそちらのURLに差し替える
      (`index.html` 内で `TODO` とコメントしている3箇所)
- [ ] 独自ドメインを取得した場合は、`CNAME` というファイルを追加する(取得時にサポートします)

## 使用素材の出典

- ロゴ・講師写真・トップ背景写真: `FICC チラシ.pptx` より
- 「昨年度の様子」の写真5点: `[ブランディング未来創造ラボ]_広島県庁_御木様名和田様ご説明 (2).pdf` に含まれるFICCのワークショップ写真より抽出(個人名・企業名が特定できる情報は含めていません)
- フォント: Noto Sans JP / Noto Serif JP(Google Fonts、無料・商用利用可)
