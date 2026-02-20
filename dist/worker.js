"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const utils_1 = require("./utils");
const connection = new ioredis_1.default({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
});
const worker = new bullmq_1.Worker("heavyTaskQueue", async (jo) => {
    (0, utils_1.heavyComputation)();
    console.log("Heavy computation completed");
});
worker.on("completed", (job) => {
    console.log(`Job ${job.id} has completed`);
});
worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} has failed with error ${err.message}`);
});
//# sourceMappingURL=worker.js.map