const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/comments');

jest.mock('../db/connection', () => ({
  models: {
    Comment: {
      findAll: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('Comments routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get comments for a post', async () => {
    const mockComment = {
      id: 1,
      postId: 1,
      title: 'Test comment',
      content: 'Test comment content',
    };
    const mockFindAll = jest
      .fn()
      .mockReturnValueOnce([mockComment])
      .mockImplementationOnce(() => {
        throw new Error('Mock error');
      });

    // Mock the findAll method of Comment model
    jest.spyOn(global.connection.models.Comment, 'findAll').mockImplementation(mockFindAll);

    // Mount the router
    app.use('/comments', router);

    // Make a request to get comments for post 1
    const res = await request(app).get('/comments/1');

    // Check that the response is correct
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([mockComment]);

    // Make a request to get comments for an invalid post
    const res2 = await request(app).get('/comments/invalid');

    // Check that the response is correct
    expect(res2.statusCode).toEqual(500);
    expect(res2.body).toEqual({ error: 'Mock error' });
  });

  it('should create a new comment for a post', async () => {
    const mockComment = {
      id: 1,
      postId: 1,
      title: 'Test comment',
      content: 'Test comment content',
    };
    const mockCreate = jest.fn().mockReturnValue(mockComment);

    // Mock the create method of Comment model
    jest.spyOn(global.connection.models.Comment, 'create').mockImplementation(mockCreate);

    // Mount the router
    app.use('/comments', router);

    // Make a request to create a new comment for post 1
    const res = await request(app)
      .post('/comments/1')
      .send({
        title: 'Test comment',
        content: 'Test comment content',
      });

    // Check that the response is correct
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockComment);
    expect(mockCreate).toHaveBeenCalledWith({
      postId: '1',
      title: 'Test comment',
      content: 'Test comment content',
    });
  });
});
