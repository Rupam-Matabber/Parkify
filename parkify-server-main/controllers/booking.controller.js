const bookingService = require("../services/booking.service");
const garageService = require("../services/garage.service");
const userService = require("../services/user.service");
const { messageCustom } = require("../utils/message");
const { OK, NOT_FOUND, BAD_REQUEST } = require("../utils/messageTypes");
const handleErrors = require("../utils/errorHandler");
const twilio = require("twilio");
// const SibApiV3Sdk = require('sib-api-v3-sdk');



// const client = twilio("ACdc011508d67a48c7bca7464c43076994", "1ed6c9139c750cb5a0df00c8360c2e9e");

// const acceptBooking = async (req, res) => {
//   try {
//     // accept from client
//     // only get cameraId, in/out, licenseId

//     if (!req.body.cameraId || !req.body.type || !req.body.licenseId) {
//       throw {
//         statusObj: BAD_REQUEST,
//         type: "ValidationError",
//         name: "Missing fields",
//       };
//     }

//     const camera = await garageService.findCamera({ _id: req.body.cameraId });
//     if (!camera) {
//       throw {
//         statusObj: BAD_REQUEST,
//         type: "ValidationError",
//         name: "Camera Not Found",
//       };
//     }

//     //find garage
//     let garage = await garageService.findGarage({ _id: camera.garageId });
//     if (garage.length == 0) {
//       throw {
//         statusObj: BAD_REQUEST,
//         type: "ValidationError",
//         name: "Garage Not Found",
//       };
//     }
//     garage = garage[0];

//     //find user by licenseId
//     const user = await userService.getUser({ licenseId: req.body.licenseId });
//     if (!user) {
//       throw {
//         statusObj: BAD_REQUEST,
//         type: "ValidationError",
//         name: "User Not Found",
//       };
//     }

//     // if in
//     if (req.body.type === "in") {
//       //check if user has a booking
//       let bookingalready = await bookingService.findBooking({
//         userId: user._id,
//         status: "inbooking",
//       });
//       if (bookingalready.length > 0) {
//         throw {
//           statusObj: BAD_REQUEST,
//           type: "ValidationError",
//           name: "User already has a booking",
//         };
//       }

//       // find slot

//       // garages.slot contains field: name, type, chargePerHour, status. find if status is available
//       const slotSelected = garage.slots.find(
//         (slot) => slot.status === "available",
//       );
//       if (!slotSelected) {
//         throw {
//           statusObj: BAD_REQUEST,
//           type: "ValidationError",
//           name: "No available slot",
//         };
//       }
//       //select a slot
//       const slotName = slotSelected.name;
//       // update slot status to occupied
//       garage.slots = garage.slots.map((slot) => {
//         if (slot.name === slotName) {
//           slot.status = "occupied";
//         }
//         return slot;
//       });

//       // update garage
//       await garageService.updateGarage(garage._id, garage);

//       // create booking
//       const booking = await bookingService.newBooking({
//         userId: user._id,
//         garageId: garage._id,
//         slotId: slotSelected._id,
//         slotName: slotName,
//         status: "inbooking",
//         startTime: new Date(),
//         licenseId: req.body.licenseId,
//         chargePerHour: slotSelected.chargePerHour,
//       });

//       const return_object = {
//         booking,
//       };

//       messageCustom(res, OK, "Booking created successfully", return_object);
//       return;
//     }
//     // if out
//     else {
//       let booking = await bookingService.findBooking({
//         userId: user._id,
//         status: "inbooking",
//       });

//       if (booking.length == 0) {
//         throw {
//           statusObj: BAD_REQUEST,
//           type: "ValidationError",
//           name: "No booking found",
//         };
//       }

//       // update slot in garage
//       garage.slots = garage.slots.map((slot) => {
//         if (slot.name === booking[0].slotName) {
//           slot.status = "available";
//         }
//         return slot;
//       });

//       // update garage
//       await garageService.updateGarage(garage._id, garage);

//       // update booking
//       booking = booking[0];
//       booking.status = "completed";
//       booking.endTime = new Date();
//       booking.amount =
//         ((booking.endTime - booking.startTime) * booking.chargePerHour) /
//         3600000;

//       await bookingService.updateBooking(booking._id, booking);

//       const return_object = {
//         booking,
//       };

//       messageCustom(res, OK, "Booking updated successfully", return_object);
//     }

//     // const booking = await bookingService.newBooking(req.body);

//     // const return_object = {
//     //   booking,
//     // };

//     // messageCustom(res, OK, "Booking created successfully", return_object);
//   } catch (error) {
//     handleErrors(req, res, error);
//   }
// };


const acceptBooking = async (req, res) => {
  try {
    // accept from client
    // only get garageId, licenseId

    if (!req.body.garageId || !req.body.licenseId) {
      throw {
        statusObj: BAD_REQUEST,
        type: "ValidationError",
        name: "Missing fields",
      };

    }

    //find garage
    let garage = await garageService.findGarage({ _id: req.body.garageId });

    if (garage.length == 0) {
      throw {
        statusObj: BAD_REQUEST,
        type: "ValidationError",
        name: "Garage Not Found",
      };
    }

    garage = garage[0];

    //find user by licenseId
    const user = await userService.getUser({ licenseId: req.body.licenseId });

    if (!user) {
      throw {
        statusObj: BAD_REQUEST,
        type: "ValidationError",
        name: "User Not Found",
      };
    }

    //check if user has a booking
    // only get the most recent booking
     
    let bookingalready = await bookingService.findBooking({
      userId: user._id,
      status: "inbooking",
    });




    // if status is inbooking, then user has a booking and is now leaving

    if (bookingalready.length > 0) {
      // update slot in garage by 1
      garage.slots = garage.slots + 1;

      // update garage

      await garageService.updateGarage(garage._id, garage);

      // update booking
      bookingalready = bookingalready[0];

      console.log(bookingalready)

      // bookingalready.status = "completed";
      // bookingalready.endTime = new Date();
      // bookingalready.amount = ((bookingalready.endTime - bookingalready.startTime) * bookingalready.chargePerHour) / 3600000;

      const amount = ((new Date() - bookingalready.startTime) * garage.chargePerHour) / 3600000;

      bookingalread = {
        ...bookingalready,
      };

      console.log(((new Date() - bookingalready.startTime) * garage.chargePerHour) / 3600000)

      bookingalready.status = "completed";
      bookingalready.amount = amount;
      bookingalready.endTime = new Date();

      await bookingService.updateBooking(bookingalready._id, bookingalready);

      // sendSmtpEmail = {
      //   to: "aryachakraborty2002@gmail.com",
      //   templateId: 2,
      //   sender: "bhattacharyasaptarshi2001@gmail.com"
      // };





      // await client.messages.create({
      //   body: `Your parking charge is ${amount}`,
      //   from: "+14846235970",
      //   to: "+91"+user.phone,
      // });


      const return_object = {
        bookingalready,
      };

      messageCustom(
        res,
        OK,
        "Booking updated successfully",
        return_object,
      );

      return;
    }

    // if status is completed then user is starting a new booking

    // reduce slot in garage by 1

    garage.slots = garage.slots - 1;

    // update garage

    await garageService.updateGarage(garage._id, garage);

    // create booking with status inbooking

    const booking = await bookingService.newBooking({
      userId: user._id,
      garageId: garage._id,
      status: "inbooking",
      startTime: new Date(),
      licenseId: req.body.licenseId,
    });

    const return_object = {
      booking,
    };

    messageCustom(res, OK, "Booking created successfully", return_object);

  } catch (error) {
    handleErrors(req, res, error);
  }
};

const getBookings = async (req, res) => {
  try {
    const params = req.query.id;
    const bookings = await bookingService.findBookingByUserId(params);
    messageCustom(res, OK, "Booking created successfully", bookings);
  } catch (error) {
    handleErrors(req, res, error);
  }
}

module.exports = {
  acceptBooking,
  getBookings
};
