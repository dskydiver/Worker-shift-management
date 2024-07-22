"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_WORKER_PARAM_SCHEMA = exports.CREATE_WORKER_SCHEMA = void 0;
const zod_1 = require("zod");
exports.CREATE_WORKER_SCHEMA = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1),
});
exports.GET_WORKER_PARAM_SCHEMA = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
//# sourceMappingURL=worker.js.map