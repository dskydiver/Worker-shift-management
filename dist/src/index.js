"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const logger_1 = __importDefault(require("../logger"));
const server_1 = require("./server");
const start = async () => {
    const server = await (0, server_1.build)();
    // Graceful Shutdown
    const gracefulShutdown = async (signal) => {
        logger_1.default.info(`* Received signal: ${signal} *`);
        logger_1.default.info('Closing fastify server...');
        await server.close();
        // Here you'd also handle your database disconnection, if needed.
        await database_1.default.$disconnect();
        logger_1.default.info('Server successfully closed');
        process.exit(0);
    };
    // Handling termination and interrupt signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    const portDetail = Number(process.env.PORT) || 5000;
    await server.listen({ port: portDetail });
    logger_1.default.info(`server running on port ${portDetail}`);
};
start().catch((error) => {
    logger_1.default.error(error);
    process.exit(1);
});
