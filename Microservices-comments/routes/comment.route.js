const express = require('express');
const router = express.Router();
const commentController = require('../services/comment.controller');

// GET all comments
router.get('/', async (req, res, next) => {
  try {
    const comments = await commentController.getMultipleComments();
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// Route to GET comment by ID
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const comment = await commentController.getCommentById(id);
    res.json(comment);
  } catch (err) {
    next(err);
  }
});


// Route to create a comment
router.post("/", async (req, res, next) => {
  try {
      const comment = await commentController.create(req.body);
      res.json({ comment });
  } catch (err) {
      next(err);
  }
});

// Route to DELETE comment
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await commentController.deleteComment(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Route to PUT comment
router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const updatedComment = req.body;
    const result = await commentController.updateComment(id, updatedComment);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
module.exports = router;