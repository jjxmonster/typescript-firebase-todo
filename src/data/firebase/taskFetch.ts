import { db } from '../../firebase/firebase';
import {
   arrayUnion,
   getDocs,
   updateDoc,
   query,
   collection,
   where,
} from '@firebase/firestore';

import { UserType } from '../../reducers/userAuth.reducer';

export type Task = {
   id: string;
   name: string;
   contents: string;
   isImportant: boolean;
   isDone: boolean;
   date: string;
   doneDate?: string;
};

export const addTask = async (task: Task, user: UserType) => {
   const q = query(collection(db, 'users'), where('uid', '==', user.uid));

   return await getDocs(q)
      .then(async ({ docs }) => {
         return await updateDoc(docs[0].ref, {
            todo: arrayUnion(task),
         }).then(res => ({
            error: false,
            message: 'Task added successfully.',
         }));
      })
      .catch(err => {
         console.log(err);
         return {
            error: true,
            message: 'Something went wrong...',
         };
      });
};

export const deleteTask = async (taskToDelete: Task, user: UserType) => {
   const q = query(collection(db, 'users'), where('uid', '==', user.uid));

   return await getDocs(q)
      .then(async ({ docs }) => {
         const taskList = docs[0].data().todo;

         return await updateDoc(docs[0].ref, {
            todo: taskList.filter((task: Task) => task.id !== taskToDelete.id),
         }).then(() => ({
            error: false,
            message: 'Task added successfully.',
         }));
      })
      .catch(err => {
         console.log(err);
         return {
            error: true,
            message: 'Something went wrong...',
         };
      });
};

export const addDoneTask = async (doneTask: Task, user: UserType) => {
   // if (user.id) {
   //    return await getDoc(doc(db, 'users', user.id))
   //       .then(async res => {
   //          const getTask = res
   //             .data()
   //             ?.todo.filter((task: Task) => task.id === doneTask.id)[0];
   //          // make task completed...
   //          getTask.isDone = true;
   //          getTask.date = new Date().toLocaleString();

   //          return await updateDoc(res.ref, {
   //             todo: [
   //                ...res
   //                   .data()
   //                   ?.todo.filter((task: Task) => task.id !== doneTask.id),
   //                getTask,
   //             ],
   //          }).then(res => {
   //             return {
   //                error: false,
   //                message: 'Task done successfully.',
   //             };
   //          });
   //       })
   //       .catch(err => {
   //          console.log(err);
   //          return {
   //             error: true,
   //             message: 'Something went wrong...',
   //          };
   //       });
   // } else {
   return {
      error: true,
      message: `This scenario will never happend but TS tell it's could be error idk`,
   };
   // }
};
