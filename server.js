const app = require('./app');
const { processQueue } = require('./jobs/jobs');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  processQueue();
});
app.get('/', (req, res) => {
  res.send('Hey LoopAI, Udayan here :), the backend is up and GodSpeed!');
})
