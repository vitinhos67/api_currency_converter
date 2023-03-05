import { FastifyInstance } from 'fastify';
import UserController from '../controller/User.controller';

function usersRoutes(fastify: FastifyInstance, options: any, done: any) {
    fastify.get('/users', UserController.findAll);
    fastify.get('/user/:id', UserController.findById);
    fastify.post('/user', UserController.store);
    done();
}

export default usersRoutes;
