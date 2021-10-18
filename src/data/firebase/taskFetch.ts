import { db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc, onSnapshot } from '@firebase/firestore';

import { UserType } from '../../reducers/userAuth.reducer';

export type Task = {
   name: string;
   contents: string;
   isImportant: boolean;
   isDone: boolean;
   doneDate?: string;
};

export const addTask = async (task: Task, user: UserType) => {
   if (user.id) {
      return await getDoc(doc(db, 'users', user.id))
         .then(async res => {
            const updatedTodoArray = [...res.get('todo'), task];

            return await updateDoc(res.ref, {
               todo: updatedTodoArray,
            }).then(res => ({
               error: false,
               message: 'Task added successfully.',
            }));
         })
         .catch(err => ({
            error: true,
            message: 'Something went wrong...',
         }));
   } else {
      return {
         error: true,
         message: `This scenario will never happend but TS tell it's could be error idk`,
      };
   }
};
