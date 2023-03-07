import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify/types/instance';
import { Done, Options } from '../interfaces/pluginsParam.interface';

/**
 *
 * @param app
 * @param options
 * @param done
 * @description Make initial the cors config. Used in the app
 */
const corsSettings = (app: FastifyInstance, options: Options, done: Done) => {
    app.register(cors, {
        origin: ['http://127.0.0.1:8080', 'http://localhost:3000'],
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });

    done();
};

export default corsSettings;
