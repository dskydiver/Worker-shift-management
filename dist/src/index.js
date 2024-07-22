"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const logger_1 = __importDefault(require("../logger"));
const server_1 = require("./server");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = yield (0, server_1.build)();
    // Graceful Shutdown
    const gracefulShutdown = (signal) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info(`* Received signal: ${signal} *`);
        logger_1.default.info('Closing fastify server...');
        yield server.close();
        // Here you'd also handle your database disconnection, if needed.
        yield database_1.default.$disconnect();
        logger_1.default.info('Server successfully closed');
        process.exit(0);
    });
    // Handling termination and interrupt signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    const portDetail = Number(process.env.PORT) || 5000;
    yield server.listen({ port: portDetail });
    logger_1.default.info(`server running on port ${portDetail}`);
});
start().catch((error) => {
    logger_1.default.error(error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map