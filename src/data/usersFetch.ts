import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

import { UserType } from '../reducers/userAuth.reducer';

type UserAuth = {
   name: string;
   password: string;
};

type LoginReturnObject = {
   error: boolean;
   message: string;
   user?: UserType;
};

export async function getUsers() {
   const usersCollection = collection(db, 'users');
   const response = await getDocs(usersCollection);
   const data = response.docs.map(doc => doc.data());

   return data;
}

export async function addUser(user: UserType) {
   const usersCollection = collection(db, 'users');
   const response = await addDoc(usersCollection, user);

   return response;
}

export async function authUser(user: UserAuth) {
   const usersCollection = collection(db, 'users');
   const response = await getDocs(usersCollection);
   const users = response.docs.map(doc => doc.data());

   const isUserInDataBase = users.filter(
      userFromDB => userFromDB.name === user.name
   );

   if (isUserInDataBase.length) {
      const userCorrectData = isUserInDataBase[0];
      const { name, password, todo } = userCorrectData;
      if (password === user.password) {
         return {
            error: false,
            message: 'User logged',
            user: {
               name,
               password,
               todo,
            },
         };
      } else {
         return {
            error: true,
            message: 'Wrong password',
         };
      }
   } else {
      return {
         error: true,
         message: 'User with that name does not exist',
      };
   }
}
