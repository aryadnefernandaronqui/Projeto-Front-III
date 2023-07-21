import { EntityState } from "@reduxjs/toolkit";
import Task from "./task";


interface BaseUser {
  userName: string;
  email: string;
  password: string;
  remember?: boolean;
  token: string;
  
};

export interface UserTasksAdapter extends BaseUser{
  tasks: EntityState<Task>
}

export default interface User extends BaseUser {
  tasks: Task[]
}



