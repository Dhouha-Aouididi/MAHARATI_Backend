const express = require("express");
const router = express.Router();
const UserController = require('../services/user.controller');
/* GET users. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await UserController.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* GET user by ID */
router.get("/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const user = await UserController.getById(userId);
    res.json(user);
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

/* POST user */
router.post("/", async function (req, res, next) {
  try {
    if (!req.body) {
      throw new Error("Request body is missing");
    }
    
    res.json(await UserController.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    res.status(400).json({ error: err.message });
  }
});

/* first PUT user */
// router.put("/:id", async function (req, res, next) {
//   try {
//     res.json(await UserController.update(req.params.id, req.body));
//   } catch (err) {
//     console.error(`Error while updating user`, err.message);
//     next(err);
//   }
// });
router.put("/:id", async function (req, res, next) {
  try {
    const response = await UserController.updateUser(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

/* DELETE user */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await UserController.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

/* GET username by user ID */
router.get("/:userId/username", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const username = await UserController.getUsernameById(userId);
    res.json(username);
  } catch (err) {
    console.error(`Error while getting username by ID`, err.message);
    next(err);
  }
});


module.exports = router;
