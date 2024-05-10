"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shift_1 = require("../controllers/shift");
const shift_2 = require("../schemas/shift");
const shift = async (fastify, options) => {
    fastify.route({
        method: 'GET',
        url: '/shifts',
        handler: async (request, reply) => {
            await (0, shift_1.getAllShift)(request, reply);
        },
        schema: {
            tags: ['shift'],
        },
    });
    fastify.route({
        method: 'GET',
        url: '/shifts/:id',
        handler: async (request, reply) => {
            await (0, shift_1.getShift)(request, reply);
        },
        schema: {
            tags: ['shift'],
            params: shift_2.GET_SHIFT_PARAM_SCHEMA,
        },
    });
    fastify.route({
        method: 'GET',
        url: '/shifts/worker/:id',
        handler: async (request, reply) => {
            await (0, shift_1.getWorkerShift)(request, reply);
        },
        schema: {
            tags: ['shift'],
            params: shift_2.GET_WORKER_SHIFT_PARAM_SCHEMA,
        },
    });
    fastify.route({
        method: 'POST',
        url: '/shifts/date',
        handler: async (request, reply) => {
            await (0, shift_1.getDateShift)(request, reply);
        },
        schema: {
            tags: ['shift'],
            body: shift_2.GET_DATE_SHIFT_SCHEMA,
        },
    });
    fastify.route({
        method: 'POST',
        url: '/shifts',
        handler: async (request, reply) => {
            await (0, shift_1.createShift)(request, reply);
        },
        schema: {
            tags: ['shift'],
            body: shift_2.CREATE_SHIFT_SCHEMA,
        },
    });
};
exports.default = shift;
