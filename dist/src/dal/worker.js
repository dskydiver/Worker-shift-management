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
exports.getWorker = exports.createWorker = exports.getAllWorker = void 0;
const database_1 = __importDefault(require("../../database"));
const logger_1 = __importDefault(require("../../logger"));
const getAllWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workers = database_1.default.worker.findMany();
        return workers;
    }
    catch (error) {
        logger_1.default.debug({ error });
        throw new Error('Error fetching workers from DB.');
    }
});
exports.getAllWorker = getAllWorker;
const createWorker = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.createWorker = createWorker;
const getWorker = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.getWorker = getWorker;
//# sourceMappingURL=worker.js.map