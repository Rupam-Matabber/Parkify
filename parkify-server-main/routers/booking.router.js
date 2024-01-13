const { Router } = require("express");
const bookingController = require("../controllers/booking.controller");

const router = Router();

router.route("/accept").post(bookingController.acceptBooking);
router.route("/get").get(bookingController.getBookings);

module.exports = router;
