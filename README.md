# todo-app-sample

## 動作確認手順（Codespaces）
1. ターミナルで以下を実行してサーバーを起動します。
   ```bash
   python3 -m http.server 8000
   ```
2. Codespaces のポート `8000` を `Open in Browser` で開きます。
3. 以下を確認します。
   - Todo を追加できる。
   - Todo テキストをクリックすると「完了/未完了」が切り替わり、完了時は取り消し線になる。
   - フィルタ（`すべて / 未完了 / 完了`）で表示を切り替えられる。
   - 追加・完了状態・削除が `localStorage`（キー: `todos`）へ保存され、リロード後に復元される。
