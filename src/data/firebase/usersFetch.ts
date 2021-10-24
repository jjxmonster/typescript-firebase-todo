import {
   collection,
   getDocs,
   addDoc,
   doc,
   updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import { UserType } from '../../reducers/userAuth.reducer';

type UserAuth = {
   name: string;
   password: string;
};

type SubmitResponse = {
   error: boolean;
   message: string;
   user?: UserType;
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

export async function authUser(user: UserAuth): Promise<SubmitResponse> {
   return await getDocs(collection(db, 'users'))
      .then(async res => {
         if (res.empty) {
            return {
               error: true,
               message: 'Something went wrong...',
            };
         } else {
            // if response from firebase is 200
            const users = res.docs.map(doc => doc.data());
            const usersId = res.docs.map(doc => doc.id);

            const actualUserIndex = users.findIndex(
               userFromDB => userFromDB.name === user.name
            );

            if (actualUserIndex !== -1) {
               const userCorrectData = users[actualUserIndex];
               const { name, password, todo } = userCorrectData;
               if (password === user.password) {
                  const userRef = doc(db, 'users', usersId[actualUserIndex]);
                  return await updateDoc(userRef, {
                     name,
                     password,
                     id: usersId[actualUserIndex],
                     todo,
                  })
                     .then(res => {
                        return {
                           error: false,
                           message: 'User logged',
                           user: {
                              name,
                              password,
                              id: usersId[actualUserIndex],
                           },
                        };
                     })
                     .catch(err => {
                        return {
                           error: true,
                           message: 'Something went wrong...',
                        };
                     });
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
      })
      .catch(err => {
         return {
            error: true,
            message: 'Something went wrong...',
         };
      });
}
