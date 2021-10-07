import { UserType } from '../reducers/userAuth.reducer';

type Task = {
   name: string;
   contents: string;
   isImportant: boolean;
   isDone: boolean;
   doneTime?: string;
};
export const addTask = async (task: Task, user: UserType | undefined) => {
   console.log(task, user);
};
