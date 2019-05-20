export interface IContact{
    id:number;
    name:string;
    phone:string;
    created_by: Date;
}

export interface IAuthResponse{
    token:string;
}