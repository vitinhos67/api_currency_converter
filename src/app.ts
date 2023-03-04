import fastify from 'fastify';
import { FastifyInstance } from 'fastify/types/instance';
import pino from 'pino';

const app: FastifyInstance = fastify({
    logger: pino({ level: 'info' }),
});

app.listen(
    {
        port: 3000,
    },
    () => {
        app.log.info('listening port 3000');
    },
);
