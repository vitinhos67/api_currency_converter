import { FastifyInstance } from 'fastify';
import Transactionsontroller from '../controller/Transactions.controller';
import { Done, Options } from '../interfaces/pluginsParam.interface';
import Auth from '../middlewares/Auth.middleware';

function transactionsRoutes(fastify: FastifyInstance, options: Options, done: Done) {
    fastify.get(
        '/convert',
        {
            preHandler: Auth,
        },
        Transactionsontroller.addTransaction,
    );
    fastify.get('/transactions', Transactionsontroller.allTransactions);

    done();
}

export default transactionsRoutes;
