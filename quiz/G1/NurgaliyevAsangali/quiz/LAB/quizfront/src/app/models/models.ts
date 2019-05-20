export interface IPost {
    id: number;
    title: string;
    body: string;
    like_count: number;
    created_at: Date;
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
