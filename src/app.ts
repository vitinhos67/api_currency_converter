import * as dotenv from 'dotenv';
dotenv.config();

import fastify from 'fastify';
import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify/types/instance';
import swagger from '@fastify/swagger';
import swaggerOptions from './helpers/swagger.options';
import pino from 'pino';
import dbConnector from './config/database';
import usersRoutes from './routes/User.router';

const app: FastifyInstance = fastify({
    logger: pino({ level: 'info' }),
});

app.register(swagger);

(async () => {
    await app.register(swaggerOptions);
})();

app.register(cors, {
    origin: ['http://127.0.0.1:8080', 'http://localhost:3000'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
});

app.register(usersRoutes, {
    prefix: '/api/v1',
});

app.listen(
    {
        port: 3000,
    },
    async () => {
        await dbConnector();
        app.log.info('listening port 3000');
    },
);
