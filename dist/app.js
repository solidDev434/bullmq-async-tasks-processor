"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bullmq_1 = require("bullmq");
const ioredis_1 = require("bullmq/node_modules/ioredis");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Redis config
const connection = new ioredis_1.Redis({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
});
const heavyTaskQueue = new bullmq_1.Queue("heavyTaskQueue", { connection });
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/heavy-task", async (req, res) => {
    console.log("running");
    await heavyTaskQueue.add("heavyComutation", {});
    res.send("Heavy computation job added to the queue");
});
app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
//# sourceMappingURL=app.js.map