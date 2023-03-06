import { FastifyInstance } from 'fastify';
import CorrentyConversorController from '../controller/CurrencyConversor.controller';
import Auth from '../middlewares/Auth.middleware';

function correntyConversorRoutes(fastify: FastifyInstance, options: any, done: any) {
    fastify.get(
        '/convert',
        {
            preHandler: Auth,
        },
        CorrentyConversorController.convertCurrenty,
    );

    done();
}

export default correntyConversorRoutes;
