import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { UserServiceInterface } from '../interfaces/users/userModel.interface';
import { User, UserAuthResponse, UserLoginInterface } from '../interfaces/users/User.interface';
import { FastifyReply } from 'fastify/types/reply';
import usersService from '../services/users/users.service';
import { FastifyRequest } from 'fastify';
import { UserCreateDTO, UserLoginDTO } from '../dto/User/User.dto';
import Zod = require('zod');

class UserController {
    usersService: UserServiceInterface;
    constructor() {
        this.usersService = usersService;
    }

    async findAll(): Promise<void | User[] | []> {
        return usersService.findAll();
    }

    async findById(req: FastifyRequest<{ Params: { id: string } }>): Promise<User | void | null> {
        try {
            const data = await usersService.findById(req.params.id);
            return data;
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    async store(req: FastifyRequest<{ Body: User }>, res: FastifyReply): Promise<UserAuthResponse | void | null> {
        try {
            const body: User = UserCreateDTO.parse(req.body);

            return await usersService.store(body);
        } catch (error) {
            if (error instanceof Zod.ZodError) {
                res.send(error.issues);
            }

            catchErrorsFunctions(error);
        }
    }

    async login(req: FastifyRequest<{ Body: User }>, res: FastifyReply): Promise<UserAuthResponse | void | null> {
        try {
            const body: UserLoginInterface = UserLoginDTO.parse(req.body);

            const data = await usersService.login(body);

            return data;
        } catch (error) {
            if (error instanceof Zod.ZodError) {
                res.status(403).send(error.issues);
            }

            catchErrorsFunctions(error);
        }
    }
}

export default new UserController();
