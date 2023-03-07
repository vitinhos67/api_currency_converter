import { FastifyInstance } from 'fastify/types/instance';
import usersRoutes from './User.router';
import correntyConversorRoutes from './CorrencyConversion.router';
const routes = (app: FastifyInstance, options: any, done: any) => {
    app.register(correntyConversorRoutes, {
        prefix: '/api/v1',
    });
    app.register(usersRoutes, {
        prefix: '/api/v1',
    });

    done();
};

export default routes;
