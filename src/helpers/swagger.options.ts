import { FastifyInstance } from 'fastify';
import swaggerui from '@fastify/swagger-ui';
import { Done, Options } from '../interfaces/pluginsParam.interface';
const swagger = async (app: FastifyInstance, optns: Options, done: Done) => {
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

    done();
};

export default swagger;
