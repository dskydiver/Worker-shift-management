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
exports.getDateShift = exports.createShift = exports.getWorkerShift = exports.getShift = exports.getAllShift = void 0;
const database_1 = __importDefault(require("../../database"));
const logger_1 = __importDefault(require("../../logger"));
const getAllShift = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shifts = yield database_1.default.workerShift.findMany();
        return shifts;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error fetching shifts from DB.');
    }
});
exports.getAllShift = getAllShift;
const getShift = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shift = yield database_1.default.workerShift.findFirst({
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
});
exports.getShift = getShift;
const getWorkerShift = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shifts = yield database_1.default.workerShift.findMany({
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
});
exports.getWorkerShift = getWorkerShift;
const createShift = (workerId, shiftDate, shiftTime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shift = yield database_1.default.workerShift.create({
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
});
exports.createShift = createShift;
const getDateShift = (shiftDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shifts = yield database_1.default.workerShift.findMany({
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
});
exports.getDateShift = getDateShift;
//# sourceMappingURL=shift.js.map