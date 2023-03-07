import { FastifyInstance } from 'fastify/types/instance';
import usersRoutes from './User.router';
import transactionsRoutes from './Tansactions.router';
import { Done, Options } from '../interfaces/pluginsParam.interface';

const routes = (app: FastifyInstance, options: Options, done: Done) => {
    const prefix = { prefix: '/api/v1' };

    app.register(transactionsRoutes, prefix);
    app.register(usersRoutes, prefix);

    done();
};

export default routes;
