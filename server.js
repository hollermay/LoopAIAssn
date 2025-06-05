const app = require('./app');
const { processQueue } = require('./jobs/jobs');

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  processQueue();
});

app.get('/', (req, res) => {
  res.send('Hey LoopAI, Udayan here :), the backend up and processing fast(GodSpeed)');
})
