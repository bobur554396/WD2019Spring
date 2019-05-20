export interface IContact {
    id: number;
    name: string;
    phone: string;
    created_by: IUser;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
}

export interface IAuthResponse {
    token: string
}
