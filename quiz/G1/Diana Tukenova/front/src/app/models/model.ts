export interface Token {
  token: string;
}

// export interface User {
//   username: string;
//   password: string;
// }

export interface Post {
  id: number;
  name: string;
  phone: string;
  created_at: Date;
  created_by: number;
}
