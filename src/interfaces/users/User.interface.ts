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
}
