const { Router } = require("express");
const garageController = require("../controllers/garage.controller");

const router = Router();

router.route("/new").post(garageController.newGarage);

router.route("/addCamera").post(garageController.addCamera);

router.route("/all").get(garageController.getAllGarages);
router.route("/book").get(garageController.bookGarage);

module.exports = router;
