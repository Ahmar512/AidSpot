import  {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_SB,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MSID,
    appId: import.meta.env.VITE_FIREBASE_APPID
  };

 export const app = initializeApp(firebaseConfig);