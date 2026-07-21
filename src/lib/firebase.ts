// Firebase設定
// 使用するには:
// 1. https://console.firebase.google.com にアクセス
// 2. プロジェクトを作成 → Authentication → Google認証を有効化
// 3. プロジェクト設定 → Webアプリ追加 → 以下の値をコピーして貼り付け
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}
