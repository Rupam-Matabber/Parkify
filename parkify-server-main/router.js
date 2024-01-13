const { Router } = require("express");
const { message } = require("./utils/message");
const { OK, NOT_FOUND } = require("./utils/messageTypes");
const userRouter = require("./routers/user.router");
const bookingRouter = require("./routers/booking.router");
const garageRouter = require("./routers/garage.router");

const router = Router();

router.route("/").get((req, res) => {
  message(res, OK, "Welcome to Parkify API");
});

router.use("/users", userRouter);
router.use("/bookings", bookingRouter);
router.use("/garages", garageRouter);

router.route("*").all((req, res) => {
  message(res, NOT_FOUND, "Route not found");
});

module.exports = router;
