import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify/types/instance';
const corsSettings = (app: FastifyInstance, options: any, done: any) => {
    app.register(cors, {
        origin: ['http://127.0.0.1:8080', 'http://localhost:3000'],
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });

    done();
};

export default corsSettings;