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
exports.getWelcomeWord = exports.getWorker = exports.createWorker = exports.getAllWorker = void 0;
const workerDal = __importStar(require("../dal/worker"));
const logger_1 = __importDefault(require("../../logger"));
const getAllWorker = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workers = yield workerDal.getAllWorker();
        return reply.send({ success: true, data: workers });
    }
    catch (error) {
        logger_1.default.debug(error);
        return reply.code(400).send({ error });
    }
});
exports.getAllWorker = getAllWorker;
const createWorker = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = request.body;
    try {
        const worker = yield workerDal.createWorker(email, name);
        return reply.send({ success: true, data: worker });
    }
    catch (error) {
        return reply.code(400).send({ error });
    }
});
exports.createWorker = createWorker;
const getWorker = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const worker = yield workerDal.getWorker(id);
        return reply.send({ success: true, data: worker });
    }
    catch (error) {
        logger_1.default.debug(error);
        return reply.code(400).send({ error });
    }
});
exports.getWorker = getWorker;
const getWelcomeWord = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return reply.send({ success: true, data: 'Hello, World on vercel app' });
    }
    catch (error) {
        logger_1.default.debug(error);
        return reply.code(400).send({ error });
    }
});
exports.getWelcomeWord = getWelcomeWord;
//# sourceMappingURL=worker.js.map