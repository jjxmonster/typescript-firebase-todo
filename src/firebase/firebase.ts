import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const config = {
   apiKey: process.env.REACT_APP_APIKEY,
   authDomain: process.env.REACT_APP_AUTHDOMAIN,
   projectId: 'todo-67d1a',
   storageBucket: process.env.REACT_APP_SB,
   messagingSenderId: process.env.REACT_APP_SID,
   appId: process.env.REACT_APP_APPID,
};

export const firebaseApp = initializeApp(config);
export const db = getFirestore(firebaseApp);
