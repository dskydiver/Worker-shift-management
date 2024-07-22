"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_DATE_SHIFT_SCHEMA = exports.CREATE_SHIFT_SCHEMA = exports.GET_WORKER_SHIFT_PARAM_SCHEMA = exports.GET_SHIFT_PARAM_SCHEMA = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.GET_SHIFT_PARAM_SCHEMA = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
exports.GET_WORKER_SHIFT_PARAM_SCHEMA = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
exports.CREATE_SHIFT_SCHEMA = zod_1.z.object({
    workerId: zod_1.z.string().min(1),
    shiftDate: zod_1.z.string().refine((date) => new Date(date) instanceof Date),
    shiftTime: zod_1.z.nativeEnum(client_1.ShiftTime),
});
exports.GET_DATE_SHIFT_SCHEMA = zod_1.z.object({
    shiftDate: zod_1.z.string().refine((date) => new Date(date) instanceof Date),
});
