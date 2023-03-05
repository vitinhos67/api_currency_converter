import * as dotenv from 'dotenv';

dotenv.config();

import fastify from 'fastify';

import { FastifyInstance } from 'fastify/types/instance';
import pino from 'pino';
import dbConnector from './config/database';
import usersRoutes from './routes/User.router';

const app: FastifyInstance = fastify({
    logger: pino({ level: 'info' }),
});
app.get('/user/:id', function (req, reply) {
    reply.send({
        message: 'tudo certo',
    });
});

app.register(usersRoutes);

app.listen(
    {
        port: 3000,
    },
    async () => {
        await dbConnector();
        app.log.info('listening port 3000');
    },
);
