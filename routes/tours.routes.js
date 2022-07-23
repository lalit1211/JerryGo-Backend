const express = require("express");
const {
	addTour,
	getAllTours,
	getTourByID,
	Test,
} = require("../controller/tours.controller");

const toursRoute = express.Router();

toursRoute.route("/").get(getAllTours).post(addTour);

toursRoute.route("/:id").post(getTourByID);

module.exports = toursRoute;
