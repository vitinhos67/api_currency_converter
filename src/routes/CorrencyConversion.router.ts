import { FastifyInstance } from 'fastify';
import CorrentyConversorController from '../controller/CurrencyConversor.controller';
import { Done, Options } from '../interfaces/pluginsParam.interface';
import Auth from '../middlewares/Auth.middleware';

function correntyConversorRoutes(fastify: FastifyInstance, options: Options, done: Done) {
    fastify.get(
        '/convert',
        {
            preHandler: Auth,
        },
        CorrentyConversorController.addTransaction,
    );

    done();
}

export default correntyConversorRoutes;
