import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

import { UserType } from '../reducers/userAuth.reducer';

type UserAuth = {
   name: string;
   password: string;
};

export async function addUser(user: UserType) {
   return await getDocs(collection(db, 'users')).then(async res => {
      const users = res.docs.map(doc => doc.data());
      const isNickTaken = users.filter(({ name }) => name === user.name);

      if (isNickTaken.length > 0) {
         return {
            error: true,
            message: 'Someone already has that username, try another.',
         };
      } else {
         return await addDoc(collection(db, 'users'), user).then(res => {
            return {
               error: false,
               message: 'Ok',
            };
         });
      }
   });
}

export async function authUser(user: UserAuth) {
   const response = await getDocs(collection(db, 'users'));
   const users = response.docs.map(doc => doc.data());

   if (response.empty) {
      return {
         error: true,
         message: 'Something went wrong...',
      };
   }

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
