const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "garage_owner", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dfediigxy/image/upload/v1676061086/d7f2503eaaae267553edb4fe69b476e2_ieahvh.jpg",
    },
    licenseId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
