import * as dotenv from 'dotenv';
dotenv.config();

import fastify from 'fastify';

import { FastifyInstance } from 'fastify/types/instance';
import swagger from '@fastify/swagger';
import swaggerOptions from './config/swagger.options';
import pino from 'pino';

import corsSettings from './config/cors.config';
import routes from './routes/router';
import pinoSettings from './config/pino.config';

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const app: FastifyInstance = fastify({
    logger: pino(pinoSettings),
});

app.register(swagger);
app.register(corsSettings);

(async () => {
    await app.register(swaggerOptions);
})();

app.register(routes);

export default app;
