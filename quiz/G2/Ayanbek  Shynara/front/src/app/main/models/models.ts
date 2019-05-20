export interface IUser {
    id: number;
    password: string;
    username: string;
    email: string;
}

export interface IAuthResponse {
    token: string;
}

export interface IContact {
    id : number;
    name : string;
    phone : string;
    created_by: IUser;
}