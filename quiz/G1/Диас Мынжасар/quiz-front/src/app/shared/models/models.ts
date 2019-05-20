export interface Contact {
    id: number;
    name: string;
    phone: string;
    created_by : string;
}

export interface IAuthResponse {
    token: string;
  }