export interface UserCreateInterface {
    username: string;
    password: string;
    email: string;
}

export interface UserLoginInterface {
    password: string;
    email: string;
}

export interface User {
    username: string;
    password: string;
    email: string;
    created_at?: Date;
    id?: string;
}

export interface UserAuthResponse {
    username: string;
    password: string;
    email: string;
    created_at?: Date;
    id?: string;
    access_token: string;
    reflesh_token: string;
}
