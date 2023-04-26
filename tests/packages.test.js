const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const jwt = require('jsonwebtoken');

// Function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};



describe('Package Routes', () => {
  beforeAll(async () => {
    await connection.sync({ force: true });
  });

  describe('GET /packages', () => {
    test('should return 200 status code and an array of packages', async () => {
      const response = await request(app).get('/packages');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /packages', () => {
    test('should return 201 status code and the created package', async () => {
      const packageData = {
        location: 'New York',
        destination: 'San Francisco',
        weight: '10 lbs',
        explanation: 'Contains fragile items',
        timeRange: '1 week',
      };

      const token = generateToken(1);

      const response = await request(app)
        .post('/packages')
        .send(packageData)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(packageData);
    });

    test('should return 400 status code and an error message for missing fields', async () => {
      const packageData = {
        location: 'New York',
        weight: '10 lbs',
      };

      const token = generateToken(1);

      const response = await request(app)
        .post('/packages')
        .send(packageData)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Bad Request: Missing required fields');
    });
  });

  describe('GET /packages/:packageId', () => {
    test('should return 200 status code and the package with the matching ID', async () => {
      const packageData = {
        location: 'New York',
        destination: 'San Francisco',
        weight: '10 lbs',
        explanation: 'Contains fragile items',
        timeRange: '1 week',
      };

      const createdPackage = await connection.models.Package.create(packageData);

      const response = await request(app).get(`/packages/${createdPackage.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(packageData);
    });

    test('should return 404 status code and an error message for invalid ID', async () => {
      const response = await request(app).get('/packages/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Package not found');
    });
  });

  afterAll(async () => {
    await connection.close();
  });
});
