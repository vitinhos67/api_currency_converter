import { FastifyRequest } from 'fastify';
import { User } from './User.interface';
import { UserCreateInterface } from './User.interface';
export interface UserModelInterface {
    store(user: UserCreateInterface): Promise<User | void>;
    findByEmail(email: string): Promise<User | void | null>;
    findUserById(id: string): Promise<User | void | null>;
    findAll(): Promise<User[] | void | []>;
    deleteMany(): Promise<void>;
}
export interface UserServiceInterface {
    findById(id: string): Promise<User | void | null>;
    findAll(): Promise<User[] | void | []>;
    store(user: User): Promise<User | void>;
}

export interface UserControllerInterface {
    findById(req: FastifyRequest<{ Params: { id: string } }>): Promise<User | void | null>;
    findAll(): Promise<User[] | void | []>;
    store(req: FastifyRequest<{ Body: User }>): Promise<User | void | null>;
}
