const { Router } = require("express");
const registerController = require("../controllers/user.controller");

const router = Router();

router.route("/register").post(registerController.registerUser);

router.route("/login").post(registerController.loginUser);

router.route("/profile").post(registerController.profile);

module.exports = router;
