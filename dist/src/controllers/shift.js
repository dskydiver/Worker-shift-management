"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateShift = exports.createShift = exports.getWorkerShift = exports.getShift = exports.getAllShift = void 0;
const logger_1 = __importDefault(require("../../logger"));
const shiftDal = __importStar(require("../dal/shift"));
const getAllShift = async (request, reply) => {
    try {
        const shifts = await shiftDal.getAllShift();
        return reply.send({ success: true, data: shifts });
    }
    catch (error) {
        logger_1.default.debug({ error });
        return reply.code(400).send({ error });
    }
};
exports.getAllShift = getAllShift;
const getShift = async (request, reply) => {
    try {
        const { id } = request.params;
        const shift = await shiftDal.getShift(id);
        return reply.send({ success: true, data: shift });
    }
    catch (error) {
        logger_1.default.debug({ error });
        return reply.code(400).send({ error });
    }
};
exports.getShift = getShift;
const getWorkerShift = async (request, reply) => {
    try {
        const { id } = request.params;
        const shifts = await shiftDal.getWorkerShift(id);
        return reply.send({ success: true, data: shifts });
    }
    catch (error) {
        logger_1.default.debug({ error });
        return reply.code(400).send({ error });
    }
};
exports.getWorkerShift = getWorkerShift;
const createShift = async (request, reply) => {
    const { workerId, shiftDate, shiftTime } = request.body;
    try {
        const shift = await shiftDal.createShift(workerId, new Date(shiftDate), shiftTime);
        return reply.send({ success: true, data: shift });
    }
    catch (error) {
        logger_1.default.debug({ error });
        return reply.code(400).send({ error: 'Error creating shift' });
    }
};
exports.createShift = createShift;
const getDateShift = async (request, reply) => {
    try {
        const { shiftDate } = request.body;
        const shifts = await shiftDal.getDateShift(new Date(shiftDate));
        return reply.send({ success: true, data: shifts });
    }
    catch (error) {
        logger_1.default.debug({ error });
        return reply.code(400).send({ error });
    }
};
exports.getDateShift = getDateShift;
