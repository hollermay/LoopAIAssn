const express = require('express');
const router = express.Router();
const { ingest, getStatus } = require('../controllers/ingestionController');

router.post('/ingest', ingest);
router.get('/status/:ingestion_id', getStatus);

module.exports = router;
