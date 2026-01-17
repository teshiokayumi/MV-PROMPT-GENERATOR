<div align="center">

</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1MSu1AINXkOHdZTZBErUcz2AJgM-Nh9aW

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

 ## アップデート内容
- Firestoreを利用したデータの永続化（保存機能）を実装しました。
- アプリをリロードしても、入力した歌詞やプロンプトが保持されます。

## 💡 重要な注意点
- データベースの制限により、画像・音楽ファイルは1MB以下に圧縮して使用してください。
- 1MBを超えると保存エラーが発生します。
- 起動には別途Firebaseの設定が必要です。詳細はREADMEをご覧ください。
