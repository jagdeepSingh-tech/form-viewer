import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTwVUI_RhIkhHxpKNu0fmZt4wavy8_ioo",
  authDomain: "mfe-form-platform.firebaseapp.com",
  databaseURL: "https://mfe-form-platform-default-rtdb.firebaseio.com",
  projectId: "mfe-form-platform",
  storageBucket: "mfe-form-platform.firebasestorage.app",
  messagingSenderId: "190589044088",
  appId: "1:190589044088:web:285573f9bfa86f6e9f348d"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getDatabase(app);

export default app;

