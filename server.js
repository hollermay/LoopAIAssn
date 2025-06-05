const app = require('./app');
const { processQueue } = require('./jobs/jobs');

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  processQueue();
});
