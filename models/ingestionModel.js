const PriorityQueue = require('../utils/priorityQueue');

const ingestionStore = {};

const priorityMap = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3
};

const priorityQueue = new PriorityQueue((a, b) => {
  if (a.priority !== b.priority) return a.priority - b.priority;
  return a.created_time - b.created_time;
});

module.exports = { ingestionStore, priorityMap, priorityQueue };
