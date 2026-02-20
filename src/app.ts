import express from "express";
import dotenv from "dotenv";
import { Queue } from "bullmq";
import { Redis } from "bullmq/node_modules/ioredis";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

dotenv.config();

const app = express();
const port = 3000;
const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath("/admin/queues");

// Redis config
const connection = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

const heavyTaskQueue = new Queue("heavyTaskQueue", { connection });

createBullBoard({
  queues: [new BullMQAdapter(heavyTaskQueue)],
  serverAdapter: serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

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
