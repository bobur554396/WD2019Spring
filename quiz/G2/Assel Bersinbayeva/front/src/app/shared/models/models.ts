export interface ITaskList{
    id: number;
    name: string;
  }
  
  export interface ITask{
    id: number;
    name: string;
    created_at: Date;
    due_on: Date;
    status: string;
    tasklist: number;
  }