import { FastifyInstance } from 'fastify';
import swaggerui from '@fastify/swagger-ui';
const swagger = async (app: FastifyInstance, optns: any, done: any) => {
    await app.register(swaggerui, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
        uiHooks: {
            onRequest: function (request, reply, next) {
                next();
            },
            preHandler: function (request, reply, next) {
                next();
            },
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject) => {
            return swaggerObject;
        },
        transformSpecificationClone: true,
    });
};

export default swagger;
