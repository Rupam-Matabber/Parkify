const booking = require("../models/booking.model");
var ObjectId = require('mongodb').ObjectId;

const newBooking = async (bookingBody) => {
  return await booking.create(bookingBody);
};

const updateBooking = async (bookingId, bookingBody) => {
  return await booking.findByIdAndUpdate(bookingId, bookingBody, { new: true });
};

const findBooking = async (params) => {
  return await booking.find(params);
};

const findBookingByUserId = async (userId) => {
  // return await booking.find({userId: userId});
  //type cast userId to ObjectId
  return await booking.find({userId: new ObjectId(userId)});
};

module.exports = {
  newBooking,
  findBooking,
  updateBooking,
  findBookingByUserId,
};
