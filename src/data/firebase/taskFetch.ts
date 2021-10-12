import { UserType } from '../../reducers/userAuth.reducer';
import { db } from '../../firebase/firebase';
import { doc } from '@firebase/firestore';

type Task = {
   name: string;
   contents: string;
   isImportant: boolean;
   isDone: boolean;
   doneDate?: string;
};
export const addTask = async (task: Task, user: UserType | undefined) => {
   const userRef = doc(db, 'users', 'kuba');
   console.log(userRef.id);
};
