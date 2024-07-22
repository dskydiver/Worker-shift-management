"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const swagger_1 = require("@fastify/swagger");
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod2_1 = require("fastify-type-provider-zod2");
const shift_1 = __importDefault(require("./routes/shift"));
const worker_1 = __importDefault(require("./routes/worker"));
const logger_1 = __importDefault(require("../logger"));
const build = async () => {
    const server = (0, fastify_1.default)({
        logger: {
            level: 'info',
            transport: {
                target: 'pino-pretty',
            },
        },
    }).withTypeProvider();
    dotenv_1.default.config();
    server.setValidatorCompiler(fastify_type_provider_zod2_1.validatorCompiler);
    server.setSerializerCompiler(fastify_type_provider_zod2_1.serializerCompiler);
    const swaggerOptions = {
        swagger: {
            info: {
                title: 'API Documentation',
                description: 'API documentation for your Fastify application.',
                version: '1.0.0',
            },
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                BearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                },
            },
        },
        transform: fastify_type_provider_zod2_1.jsonSchemaTransform,
    };
    const swaggerUiOptions = {
        routePrefix: 'documentation',
        exposeRoute: true,
    };
    // Register the Swagger plugin
    server.register(swagger_1.fastifySwagger, swaggerOptions);
    server.register(swagger_ui_1.default, swaggerUiOptions);
    server.register(worker_1.default);
    server.register(shift_1.default);
    server.get('/', (req, reply) => {
        reply.send({ success: true, message: 'Welcome to the API' });
    });
    // if route not found
    server.setNotFoundHandler((request, reply) => {
        reply.code(404).send({ success: false, message: 'Route not found' });
    });
    if (process.env.DEPLOY_ENV === 'production') {
        server.setErrorHandler((error, request, reply) => {
            logger_1.default.debug(error);
            if (error.code === 'FST_ERR_VALIDATION') {
                reply.status(400).send({
                    error: 'Bad Request',
                    message: 'Invalid request parameters',
                });
            }
            else {
                reply.send(error);
            }
        });
    }
    process.on('unhandledRejection', function (reason, promise) {
        console.log('unhandledRejection ' +
            promise.toString() +
            ' stack ' +
            JSON.stringify(reason.stack));
    });
    return server;
};
exports.build = build;
