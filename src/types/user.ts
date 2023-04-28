import Task from "./task";

export default interface User  {
  userName: string;
  email: string;
  password: string;
  remember: boolean;
  tasks: Task[]
};


