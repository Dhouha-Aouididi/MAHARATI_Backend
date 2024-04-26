const express = require("express");
const router = express.Router();
const bookingController = require("../services/booking.controller");

/* GET bookings. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await bookingController.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting bookings `, err.message);
    next(err);
  }
});
/* GET booking by ID */
router.get("/:id", async function (req, res, next) {
  try {
    const bookingId = req.params.id;
    const booking = await bookingController.getById(bookingId);
    res.json(booking);
  } catch (err) {
    console.error(`Error while getting booking `, err.message);
    next(err);
  }
});



/* POST booking */
router.post("/", async function (req, res, next) {
  try {
    res.json(await bookingController.create(req.body));
  } catch (err) {
    console.error(`Error while creating booking`, err.message);
    next(err);
  }
});

/* PUT booking */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await bookingController.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating booking`, err.message);
    next(err);
  }
});

/* DELETE booking */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await bookingController.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting booking`, err.message);
    next(err);
  }
});

module.exports = router;
