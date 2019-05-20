export interface IUser {
    id: number;
    password: string;
    username: string;
    email: string;
}

export interface IContact {
    id: number;
    name: string;
    phone: number;
    created_by: IUser;
}

export interface IAuthResponse {
    token: string;
}

