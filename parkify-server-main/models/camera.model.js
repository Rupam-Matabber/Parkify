const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema(
  {
    garageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garage",
      required: true,
    },
    type: {
      type: String,
      enum: ["in", "out"],
      required: true,
    },
    locationX: {
      type: Number,
    },
    locationY: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Camera = mongoose.model("Camera", cameraSchema);

module.exports = Camera;
