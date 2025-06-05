const request = require('supertest');
const app = require('../app');

describe('Ingestion API', () => {
  it('should return an ingestion_id', async () => {
    const res = await request(app).post('/ingest').send({
      ids: [1, 2, 3, 4, 5],
      priority: 'MEDIUM'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('ingestion_id');
  });

  it('should return status object', async () => {
    const res = await request(app).post('/ingest').send({
      ids: [6, 7, 8],
      priority: 'HIGH'
    });
    const { ingestion_id } = res.body;
    const statusRes = await request(app).get(`/status/${ingestion_id}`);
    expect(statusRes.statusCode).toBe(200);
    expect(statusRes.body).toHaveProperty('batches');
  });
});
