import { FastifyInstance } from 'fastify';

import Transactionsontroller from '../controller/Transactions.controller';
import { Done, Options } from '../interfaces/pluginsParam.interface';
import { Auth, AddTokenInHeaderIfAccessTokenIsInvalid } from '../middlewares/Auth.middleware';
import { schemaAddTransactions } from '../schemas/transactions/create.transactions.schema';
import { schemaTransactions } from '../schemas/transactions/transactions.consult.schema';

function transactionsRoutes(fastify: FastifyInstance, options: Options, done: Done) {
    fastify.get(
        '/convert',
        {
            preHandler: [Auth, AddTokenInHeaderIfAccessTokenIsInvalid],
            schema: schemaAddTransactions,
        },
        Transactionsontroller.addTransaction,
    );
    fastify.get('/transactions', { schema: schemaTransactions }, Transactionsontroller.findTransactions);

    done();
}

export default transactionsRoutes;
