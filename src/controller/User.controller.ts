import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { UserServiceInterface } from '../interfaces/users/userModel.interface';
import { User } from '../interfaces/users/User.interface';
import usersService from '../services/users/users.service';
import { FastifyRequest } from 'fastify';

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
}

export default new UserController();
