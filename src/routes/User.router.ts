import { FastifyInstance } from 'fastify';

import UserController from '../controller/User.controller';
import { Done, Options } from '../interfaces/pluginsParam.interface';
import { schemaAllUsers, schemaCreateUser, schemaLoginUser, schemaUser } from '../schemas/user.schema';

function usersRoutes(fastify: FastifyInstance, options: Options, done: Done) {
    fastify.get('/users', schemaAllUsers, UserController.findAll);
    fastify.get('/user/:id', schemaUser, UserController.findById);
    fastify.post('/user', schemaCreateUser, UserController.store);
    fastify.post('/login', schemaLoginUser, UserController.login);
    done();
}

export default usersRoutes;
