import { FastifyInstance } from 'fastify/types/instance';
import usersRoutes from './User.router';
import correntyConversorRoutes from './CorrencyConversion.router';
import { Done, Options } from '../interfaces/pluginsParam.interface';

const routes = (app: FastifyInstance, options: Options, done: Done) => {
    app.register(correntyConversorRoutes, {
        prefix: '/api/v1',
    });
    app.register(usersRoutes, {
        prefix: '/api/v1',
    });

    done();
};

export default routes;
