import { UserType } from '../../reducers/userAuth.reducer';
import { db } from '../../firebase/firebase';
import { collection, doc, getDoc, updateDoc } from '@firebase/firestore';

type Task = {
   name: string;
   contents: string;
   isImportant: boolean;
   isDone: boolean;
   doneDate?: string;
};
export const addTask = async (task: Task, user: UserType) => {
   if (user.id) {
      // const userRef = doc(db, 'users', user.id);
      return await getDoc(doc(db, 'users', user.id))
         .then(async res => {
            return await updateDoc(res.ref, {
               todo: [...[task]],
            });
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
         message: `This scenario will never happend but TS tell it's could be error idk`,
      };
   }
};
