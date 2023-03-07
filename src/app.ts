import * as dotenv from 'dotenv';
dotenv.config();

import fastify from 'fastify';

import { FastifyInstance } from 'fastify/types/instance';
import swagger from '@fastify/swagger';
import swaggerOptions from './config/swagger.options';
import pino from 'pino';
import dbConnector from './config/database';

import corsSettings from './config/cors.config';
import routes from './routes/router';
import pinoSettings from './config/pino.config';

const app: FastifyInstance = fastify({
    logger: pino(pinoSettings),
});

app.register(swagger);
app.register(corsSettings);

(async () => {
    await app.register(swaggerOptions);
})();

app.register(routes);

app.listen(
    {
        port: 3000,
    },
    async () => {
        await dbConnector();
        app.log.info('listening port 3000');
    },
);

export default app;
