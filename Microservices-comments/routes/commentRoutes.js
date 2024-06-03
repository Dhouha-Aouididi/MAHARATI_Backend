const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');


// GET route to fetch all comments
router.get('/', commentController.getAllComments);

// POST route to create a new comment
router.post('/', commentController.createComment);

// GET route to fetch comments for a specific service
router.get('/service/:serviceId', commentController.getCommentsForService);


// DELETE route to delete a comment by ID
router.delete('/:id', commentController.deleteComment);

module.exports = router;
