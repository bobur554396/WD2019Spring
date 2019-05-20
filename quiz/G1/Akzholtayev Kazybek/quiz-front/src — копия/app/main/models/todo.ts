
export interface ITaskList {
    id:number;
    name:string;
}
export interface ITask{
    id:number;
    name:string;
    created_at:any;
    due_on:any;
    status:string;

}
export interface IAuthResponse{
    token:string;
}
