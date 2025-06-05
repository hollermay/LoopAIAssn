const { v4: uuidv4 } = require('uuid');
const { ingestionStore, priorityMap, priorityQueue } = require('../models/ingestionModel');

const ingest = (req, res) => {
  const { ids, priority } = req.body;

  if (!Array.isArray(ids) || !priorityMap[priority]) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const ingestion_id = uuidv4();
  const created_time = Date.now();
  const batches = [];

  for (let i = 0; i < ids.length; i += 3) {
    const batch_ids = ids.slice(i, i + 3);
    const batch_id = uuidv4();
    batches.push({ batch_id, ids: batch_ids, status: 'yet_to_start' });

    priorityQueue.enqueue({
      priority: priorityMap[priority],
      created_time,
      ingestion_id,
      batch_id,
      ids: batch_ids
    });
  }

  ingestionStore[ingestion_id] = { priority, created_time, batches };
  res.json({ ingestion_id });
};

const getStatus = (req, res) => {
  const ingestion_id = req.params.ingestion_id;
  const ingestion = ingestionStore[ingestion_id];

  if (!ingestion) return res.status(404).json({ error: 'Not found' });

  const statuses = ingestion.batches.map(b => b.status);
  let overall = 'yet_to_start';
  if (statuses.every(s => s === 'completed')) overall = 'completed';
  else if (statuses.some(s => s === 'triggered')) overall = 'triggered';

  res.json({
    ingestion_id,
    status: overall,
    batches: ingestion.batches
  });
};

module.exports = { ingest, getStatus };
