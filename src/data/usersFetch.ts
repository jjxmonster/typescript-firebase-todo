import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/firebase';

export async function getUsers() {
   const usersCollection = collection(db, 'users');
   const response = await getDocs(usersCollection);
   const data = response.docs.map(doc => doc.data());

   return data;
}
