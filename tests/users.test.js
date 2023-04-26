const request = require('supertest');
const app = require('../app'); // assuming your Express app is exported as 'app' in a separate file

describe('User route', () => {
  it('should return all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // replace with the expected length of your user data
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        image: 'https://example.com/testuser.jpg',
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test User');
    expect(response.body.email).toBe('testuser@example.com');
    expect(response.body.image).toBe('https://example.com/testuser.jpg');
  });

  it('should update an existing user', async () => {
    // assuming you have an existing user with ID 1
    const response = await request(app)
      .put('/users/1')
      .send({
        name: 'Updated Test User',
        email: 'updatedtestuser@example.com',
        image: 'https://example.com/updatedtestuser.jpg',
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Test User');
    expect(response.body.email).toBe('updatedtestuser@example.com');
    expect(response.body.image).toBe('https://example.com/updatedtestuser.jpg');
  });

  it('should delete an existing user', async () => {
    // assuming you have an existing user with ID 2
    const response = await request(app).delete('/users/2');
    expect(response.status).toBe(200);
    expect(response.body).toBe('User deleted successfully');
  });
});
