const { Request, Response } = require('express');
const { createComment } = require('../controller/commentController');

describe('Comment Controller', () => {
  test('should create a new comment', async () => {
    const req = { body: { user_id: 4, service_id: 10, commentText: 'Test comment', rating: '5' } };
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await createComment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
