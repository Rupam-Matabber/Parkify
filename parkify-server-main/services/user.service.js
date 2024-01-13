const User = require("../models/user.model");
const mongoose = require("mongoose");

const registerUser = async (userBody) => {
  const user = new User(userBody);
  await user.save();
  return user;
};

const getUser = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};

const profileService = async (userId) => {
  return await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "userId",
        as: "bookings",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
};

module.exports = {
  registerUser,
  getUser,
  profileService,
};
