const express = require("express");
const controller = require("../controller/authentication.controller");

const authRoute = express.Router();

// *******************************   *********************************

authRoute.route("/sign_up").post(controller.signUp);
authRoute.route("/sign_in").post(controller.login);

// ***************************** Export module *********************************
module.exports = authRoute;
