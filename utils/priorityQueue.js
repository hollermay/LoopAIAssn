class PriorityQueue {
    constructor(comparator) {
      this.items = [];
      this.comparator = comparator;
    }
  
    enqueue(item) {
      this.items.push(item);
      this.items.sort(this.comparator);
    }
  
    dequeue() {
      return this.items.shift();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  module.exports = PriorityQueue;
  