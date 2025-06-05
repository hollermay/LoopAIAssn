const { ingestionStore, priorityQueue } = require('../models/ingestionModel');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processQueue() {
  while (true) {
    if (!priorityQueue.isEmpty()) {
      const job = priorityQueue.dequeue();

      const ingestion = ingestionStore[job.ingestion_id];
      const batch = ingestion.batches.find(b => b.batch_id === job.batch_id);

      batch.status = 'triggered';
      await sleep(2000); // simulate API call
      batch.status = 'completed';
      console.log(`Processed batch ${batch.batch_id} with IDs:`, batch.ids);

      await sleep(5000); // enforce rate limit
    } else {
      await sleep(1000);
    }
  }
}

module.exports = { processQueue };
