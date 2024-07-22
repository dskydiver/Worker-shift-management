"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorker = exports.createWorker = exports.getAllWorker = void 0;
const database_1 = __importDefault(require("../../database"));
const logger_1 = __importDefault(require("../../logger"));
const getAllWorker = async () => {
    try {
        const workers = database_1.default.worker.findMany();
        return workers;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error fetching workers from DB.');
    }
};
exports.getAllWorker = getAllWorker;
const createWorker = async (email, name) => {
    try {
        const worker = database_1.default.worker.create({
            data: {
                name,
                email,
            },
        });
        return worker;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error creating worker in DB.');
    }
};
exports.createWorker = createWorker;
const getWorker = async (id) => {
    try {
        const worker = database_1.default.worker.findUnique({
            where: {
                id,
            },
            include: {
                workerShifts: {
                    select: {
                        shiftDate: true,
                        shiftTime: true,
                    },
                },
            },
        });
        return worker;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error fetching worker from DB.');
    }
};
exports.getWorker = getWorker;
