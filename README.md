# Data Ingestion API System
## Technical Documentation

### Overview
A RESTful Node.js + Express API that handles asynchronous data ingestion with batch processing, priority queuing, and rate limiting. The system processes data in batches of 3 IDs, maintains priority-based processing, and enforces a 5-second rate limit between batches.

### System Architecture

#### Core Components
- **RESTful API Layer**: Express.js with two primary endpoints
- **Batch Processing Engine**: Automatic segmentation into 3-ID batches
- **Priority Queue System**: HIGH > MEDIUM > LOW with FIFO within each level
- **Rate Limiting**: 1 batch every 5 seconds
- **In-Memory Storage**: Real-time tracking with UUID-based identification

### API Endpoints

#### 1. `POST /ingest`
**Request:**
```json
{
  "ids": [1, 2, 3, 4, 5],
  "priority": "HIGH"
}
```

**Response:**
```json
{
  "ingestion_id": "f5c3c8e0-92b2-4bfb-841e-c208660f1e7a"
}
```

**Validation:**
- `ids`: Array of integers (1 to 1e9+7)
- `priority`: "HIGH", "MEDIUM", or "LOW"

#### 2. `GET /status/:ingestion_id`
**Response:**
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

### Status Management

#### Batch Status
- `yet_to_start`: Queued, waiting for processing
- `triggered`: Currently being processed
- `completed`: Processing finished

#### Ingestion Status Logic
- All batches `yet_to_start` → `yet_to_start`
- Any batch `triggered` → `triggered`
- All batches `completed` → `completed`

### Technical Implementation

#### Priority Queue Processing
```javascript
const priorityQueues = { HIGH: [], MEDIUM: [], LOW: [] };

// Processes highest priority batches first
function getNextBatch() {
  if (priorityQueues.HIGH.length > 0) return priorityQueues.HIGH.shift();
  if (priorityQueues.MEDIUM.length > 0) return priorityQueues.MEDIUM.shift();
  if (priorityQueues.LOW.length > 0) return priorityQueues.LOW.shift();
  return null;
}
```

#### Rate Limiting
- Uses `setInterval` with 5-second intervals
- Ensures consistent processing rate
- Prevents system overload

### Performance Metrics
- **Throughput**: 720 IDs per hour (3 IDs per batch × 12 batches per minute)
- **Batch Size**: Fixed at 3 IDs per batch
- **Processing Rate**: 1 batch every 5 seconds
- **Memory Usage**: ~500 bytes per ingestion, ~200 bytes per batch

### Testing
![image](https://github.com/user-attachments/assets/0b27e618-d5ce-4551-badf-8f3c9422353e)
#### Test Coverage
```
✓ processes high priority before low
✓ respects 5s batch rate limit  
✓ returns correct batch statuses
✓ validates request format
✓ handles edge cases

Total Tests: 15 | Passed: 15 | Coverage: 94.2%
```

#### Test Command
```bash
npm test
```

### Development Setup

#### Local Development
```bash
git clone https://github.com/hollermay/loopaiassn.git
cd LoopAIAssn
npm install
npm run dev  # Development mode
npm start    # Production mode
```

### Deployment

#### Heroku Deployment
**Procfile:**
```
web: node server.js
```

**Deploy Commands:**
```bash
heroku login
heroku create your-app-name
git push heroku main
```

#### Production API Usage
```bash
# Submit ingestion
curl -X POST https://loopaiassn-aadd1b761927.herokuapp.com/ingest \
-H "Content-Type: application/json" \
-d '{"ids": [1,2,3], "priority": "HIGH"}'

# Check status
curl https://loopaiassn-aadd1b761927.herokuapp.com/status/YOUR_INGESTION_ID
```

### Tech Stack
- **Backend**: Node.js, Express.js
- **Tracking**: UUID for unique identification
- **Storage**: In-memory (extensible to Redis/PostgreSQL)
- **Testing**: Jest
- **Deployment**: Heroku-ready

### Key Features
✅ **Asynchronous Processing**: Non-blocking batch execution  
✅ **Priority-Based Queuing**: Intelligent task prioritization  
✅ **Rate Limiting**: System stability and consistent performance  
✅ **Real-time Status**: Complete visibility into processing state  
✅ **Scalable Design**: Extensible architecture for future enhancements  
✅ **Comprehensive Testing**: Robust test suite with high coverage  

### Future Enhancements
- Database persistence (PostgreSQL/Redis)
- Configurable batch sizes
- Webhook notifications
- Authentication/authorization
- Monitoring and alerting

---

**Author**: Udayan Sharma  
**GitHub**: [hollermay](https://github.com/hollermay)  
**Email**: udayanmoudgil@gmail.com
