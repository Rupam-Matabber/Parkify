const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    garageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garage",
      required: true,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garage.slots",
      required: true,
    },
    slotName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["inbooking", "cancelled", "completed"],
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountPerHour: {
      type: Number,
      required: true,
    },
    lisencePlate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const booking = mongoose.model("Booking", bookingSchema);

module.exports = booking;
