// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgWpgX1ZH527i6of5xMuq14dhAhuq2jAE",
  authDomain: "my-app-b3d38.firebaseapp.com",
  projectId: "my-app-b3d38",
  storageBucket: "my-app-b3d38.appspot.com",
  messagingSenderId: "632265378110",
  appId: "1:632265378110:web:ba0ee2f5b2efba882fc46f",
  measurementId: "G-JBDK2CXLX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app); 

export { app, db, storage };