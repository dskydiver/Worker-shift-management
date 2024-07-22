"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("../controllers/worker");
const worker_2 = require("../schemas/worker");
const worker = async (fastify, options) => {
    fastify.route({
        method: 'GET',
        url: '/workers',
        handler: async (request, reply) => {
            await (0, worker_1.getAllWorker)(request, reply);
        },
        schema: {
            tags: ['workers'],
        },
    });
    fastify.route({
        method: 'GET',
        url: '/workers/:id',
        handler: async (request, reply) => {
            await (0, worker_1.getWorker)(request, reply);
        },
        schema: {
            tags: ['workers'],
            params: worker_2.GET_WORKER_PARAM_SCHEMA,
        },
    });
    fastify.route({
        method: 'POST',
        url: '/workers',
        handler: async (request, reply) => {
            await (0, worker_1.createWorker)(request, reply);
        },
        schema: {
            tags: ['workers'], // information of the routes and it'll be used to classify the api routes by this tags
            body: worker_2.CREATE_WORKER_SCHEMA,
        },
    });
    fastify.route({
        method: 'GET',
        url: '/welcome',
        handler: async (request, reply) => {
            await (0, worker_1.getWelcomeWord)(request, reply);
        },
        schema: {
            tags: ['shift'],
        },
    });
};
exports.default = worker;
