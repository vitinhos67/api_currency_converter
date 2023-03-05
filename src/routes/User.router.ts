import { FastifyInstance } from 'fastify';
import UserController from '../controller/User.controller';
function usersRoutes(fastify: FastifyInstance, options: any, done: any) {
    fastify.get('/users', UserController.AllUsers);
    done();
}

export default usersRoutes;
