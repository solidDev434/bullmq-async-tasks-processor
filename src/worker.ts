import { Worker } from "bullmq";
import { heavyComputation } from "./utils";

const worker = new Worker(
  "heavyTaskQueue",
  async () => {
    heavyComputation();
    console.log("Heavy computation completed");
  },
  { connection: { host: "localhost", port: 6379 } }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} has completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} has failed with error ${err.message}`);
});
