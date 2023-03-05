import * as dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();

import fastify from 'fastify';
import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify/types/instance';
import fastifyMultipart = require('@fastify/multipart');
import pino from 'pino';
import dbConnector from './config/database';
import usersRoutes from './routes/User.router';

const app: FastifyInstance = fastify({
    logger: pino({ level: 'info' }),
});

app.register(cors);

// eslint-disable-next-line @typescript-eslint/no-empty-function
app.register(fastifyMultipart, { addToBody: true }).after(() => {});

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
