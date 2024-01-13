const garage = require("../models/garage.model");
const camera = require("../models/camera.model");

const newGarage = async (garageBody) => {
  return await garage.create(garageBody);
};

const updateGarage = async (garageId, garageBody) => {
  return await garage.findByIdAndUpdate(garageId, garageBody, { new: true });
};

const addCamera = async (cameraBody) => {
  const newCamera = await camera.create(cameraBody);
  return newCamera;
};

const findCamera = async (params) => {
  return await camera.findOne(params);
};

const findGarage = async (params) => {
  // return await garage.find(params);
  return await garage.find(params);
};

const findCloseGarages = async (params) => {

  // get 10 closest garages with non zero slots

  // we need to find euclidian distance between two points.
  // we get lat and long from params and then we find the distance between them
  // using locationX and locationY of the garages

  // step 1: take locationX and locationY from params and calculate distance between them 
  // and all the garages in the database

  // step 2: sort the garages by distance and remove slots == 0

  // step 3: return the first 10 garages


  const garages = await garage.aggregate([
    {
      $addFields: {
        distance: {
          $sqrt: {
            $add: [
              { $pow: [{ $subtract: ["$locationX", params.latitude] }, 2] },
              { $pow: [{ $subtract: ["$locationY", params.longitude] }, 2] }
            ]
          }
        }
      }
    },
    {
      $match: {
        slots: { $gt: 0 }
      }
    },
    {
      $sort: {
        distance: 1
      }
    },
    {
      $limit: 2
    }
  ])

return garages;
};





module.exports = {
  newGarage,
  findGarage,
  addCamera,
  findCamera,
  updateGarage,
  findCloseGarages,
};
