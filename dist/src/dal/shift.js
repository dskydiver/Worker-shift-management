"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateShift = exports.createShift = exports.getWorkerShift = exports.getShift = exports.getAllShift = void 0;
const database_1 = __importDefault(require("../../database"));
const logger_1 = __importDefault(require("../../logger"));
const getAllShift = async () => {
    try {
        const shifts = await database_1.default.workerShift.findMany();
        return shifts;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error fetching shifts from DB.');
    }
};
exports.getAllShift = getAllShift;
const getShift = async (id) => {
    try {
        const shift = await database_1.default.workerShift.findFirst({
            where: {
                id,
            },
            include: {
                worker: true,
            },
        });
        return shift;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error fetching shift from DB.');
    }
};
exports.getShift = getShift;
const getWorkerShift = async (id) => {
    try {
        const shifts = await database_1.default.workerShift.findMany({
            where: {
                workerId: id,
            },
        });
        return shifts;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error fetching shifts from DB.');
    }
};
exports.getWorkerShift = getWorkerShift;
const createShift = async (workerId, shiftDate, shiftTime) => {
    try {
        const shift = await database_1.default.workerShift.create({
            data: {
                workerId,
                shiftDate,
                shiftTime,
            },
        });
        return shift;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error creating shift in DB.');
    }
};
exports.createShift = createShift;
const getDateShift = async (shiftDate) => {
    try {
        const shifts = await database_1.default.workerShift.findMany({
            where: {
                shiftDate,
            },
        });
        return shifts;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error fetching shifts from DB.');
    }
};
exports.getDateShift = getDateShift;
