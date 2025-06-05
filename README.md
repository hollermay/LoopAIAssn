# Data Ingestion API System

A RESTful Node.js + Express API to asynchronously ingest data with batch processing, priority queueing, and rate limiting.

---

## 🚀 Features

* **Two endpoints**:
  * `POST /ingest` → Submit ingestion request with IDs and priority
  * `GET /status/:ingestion_id` → Check status of ingestion and batches
  
* **Batch Processing**: Processes 3 IDs per batch
* **Asynchronous Execution**: Batches are queued and processed in the background
* **Priority Queue**: HIGH > MEDIUM > LOW based on FIFO + priority
* **Rate Limit**: Only 1 batch (3 IDs) processed every 5 seconds
* **Unique tracking**: Each ingestion and batch has a UUID

---

## 📦 API Endpoints

### 1. `POST /ingest`

#### ✅ Request Body:

```json
{
  "ids": [1, 2, 3, 4, 5],
  "priority": "HIGH"
}
```

* `ids` → Array of integers (1 to 1e9+7)
* `priority` → One of: `HIGH`, `MEDIUM`, `LOW`

#### ✅ Response:

```json
{
  "ingestion_id": "f5c3c8e0-92b2-4bfb-841e-c208660f1e7a"
}
```

---

### 2. `GET /status/:ingestion_id`

#### ✅ Response:

```json
{
  "ingestion_id": "abc123",
  "status": "triggered",
  "batches": [
    { "batch_id": "uuid-1", "ids": [1, 2, 3], "status": "completed" },
    { "batch_id": "uuid-2", "ids": [4, 5], "status": "triggered" }
  ]
}
```

#### 📘 Status Rules:

* **Batch level**: `yet_to_start`, `triggered`, `completed`
* **Ingestion level**:

  * All batches `yet_to_start` → `yet_to_start`
  * Any batch `triggered` → `triggered`
  * All batches `completed` → `completed`

---

## 🏗 Tech Stack

* Node.js
* Express.js
* UUID for tracking
* In-memory store (can be extended to Redis/PostgreSQL)

---

## 🧪 Running the App Locally

```bash
git clone https://github.com/<your-username>/data-ingestion-api.git
cd data-ingestion-api
npm install
npm run dev
```

### For production:

```bash
npm start
```

---

## 🧪 Testing

Run Jest tests:

```bash
npm test
```

### ✅ Tests Include:

* Ingestion API: Valid requests, response format
* Status API: Correct status transitions
* Rate limit: Ensures one batch every 5 seconds
* Priority: Ensures higher priority batches are processed first

Add a screenshot of the successful test run here:

```
> PASS  test/ingestion.test.js
✓ processes high priority before low
✓ respects 5s batch rate limit
✓ returns correct batch statuses
```

---

## 🚀 Deployment on Heroku

### 1. Add a `Procfile`:

```
web: node server.js
```

### 2. Push to Heroku:

```bash
heroku login
heroku create your-app-name
git push heroku master
```

### 3. Use API:

```bash
# POST
curl -X POST https://your-app-name.herokuapp.com/ingest \
-H "Content-Type: application/json" \
-d '{"ids": [1,2,3], "priority": "HIGH"}'

# GET
curl https://your-app-name.herokuapp.com/status/YOUR_INGESTION_ID
```

---

## 📌 Design Notes

* Priorities handled using array of queues
* Batch queue processed via interval (setInterval)
* No real external API — mocked with delay and static response
* Easily extensible to use message queues or DB persistence

---

## 👨‍💻 Author

**Your Name**
GitHub: [@your-github](https://github.com/your-github)
Email: [your@email.com](mailto:your@email.com)

---

## 📄 License

MIT
