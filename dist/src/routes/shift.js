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
const shift_1 = require("../controllers/shift");
const shift_2 = require("../schemas/shift");
const shift = (fastify, options) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.route({
        method: 'GET',
        url: '/shifts',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, shift_1.getAllShift)(request, reply);
        }),
        schema: {
            tags: ['shift'],
        },
    });
    fastify.route({
        method: 'GET',
        url: '/shifts/:id',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, shift_1.getShift)(request, reply);
        }),
        schema: {
            tags: ['shift'],
            params: shift_2.GET_SHIFT_PARAM_SCHEMA,
        },
    });
    fastify.route({
        method: 'GET',
        url: '/shifts/worker/:id',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, shift_1.getWorkerShift)(request, reply);
        }),
        schema: {
            tags: ['shift'],
            params: shift_2.GET_WORKER_SHIFT_PARAM_SCHEMA,
        },
    });
    fastify.route({
        method: 'POST',
        url: '/shifts/date',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, shift_1.getDateShift)(request, reply);
        }),
        schema: {
            tags: ['shift'],
            body: shift_2.GET_DATE_SHIFT_SCHEMA,
        },
    });
    fastify.route({
        method: 'POST',
        url: '/shifts',
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, shift_1.createShift)(request, reply);
        }),
        schema: {
            tags: ['shift'],
            body: shift_2.CREATE_SHIFT_SCHEMA,
        },
    });
});
exports.default = shift;
//# sourceMappingURL=shift.js.map