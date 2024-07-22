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
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("../controllers/worker");
const worker_2 = require("../schemas/worker");
const worker = (fastify, options) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.route({
        method: 'GET',
        url: '/workers',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, worker_1.getAllWorker)(request, reply);
        }),
        schema: {
            tags: ['workers'],
        },
    });
    fastify.route({
        method: 'GET',
        url: '/workers/:id',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, worker_1.getWorker)(request, reply);
        }),
        schema: {
            tags: ['workers'],
            params: worker_2.GET_WORKER_PARAM_SCHEMA,
        },
    });
    fastify.route({
        method: 'POST',
        url: '/workers',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, worker_1.createWorker)(request, reply);
        }),
        schema: {
            tags: ['workers'], // information of the routes and it'll be used to classify the api routes by this tags
            body: worker_2.CREATE_WORKER_SCHEMA,
        },
    });
    fastify.route({
        method: 'GET',
        url: '/welcome',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, worker_1.getWelcomeWord)(request, reply);
        }),
        schema: {
            tags: ['shift'],
        },
    });
});
exports.default = worker;
//# sourceMappingURL=worker.js.map