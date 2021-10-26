import { db } from '../../firebase/firebase';
import { arrayUnion, doc, getDoc, updateDoc } from '@firebase/firestore';

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
   if (user.id) {
      return await getDoc(doc(db, 'users', user.id))
         .then(async res => {
            return await updateDoc(res.ref, {
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
   } else {
      return {
         error: true,
         message: `This scenario will never happend but TS tell it's could be error idk`,
      };
   }
};

export const deleteTask = async (taskToDelete: Task, user: UserType) => {
   if (user.id) {
      return await getDoc(doc(db, 'users', user.id))
         .then(async res => {
            const taskList = res.data()?.todo;
            return await updateDoc(res.ref, {
               todo: taskList.filter(
                  (task: Task) => task.id !== taskToDelete.id
               ),
            })
               .then(res => ({
                  error: false,
                  message: 'Task added successfully.',
               }))
               .catch(err => ({
                  error: true,
                  message: 'Something went wrong...',
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

export const addDoneTask = async (doneTask: Task, user: UserType) => {
   if (user.id) {
      return await getDoc(doc(db, 'users', user.id))
         .then(async res => {
            return await updateDoc(res.ref, {
               doneTasks: arrayUnion(doneTask),
               todo: res
                  .data()
                  ?.todo.filter((task: Task) => task.id !== doneTask.id),
            }).then(res => {
               return {
                  error: false,
                  message: 'Task done successfully.',
               };
            });
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
