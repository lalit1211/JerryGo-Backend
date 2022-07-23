const express = require("express");
const {
	addTour,
	getAllTours,
	getTourByID,
	Test,
	updateTour,
	deleteTour,
} = require("../controller/tours.controller");

const toursRoute = express.Router();

toursRoute.route("/").get(getAllTours).post(addTour);
// .patch(updateTour);

toursRoute
	.route("/:id")
	.post(getTourByID)
	.patch(updateTour)
	.delete(deleteTour);

module.exports = toursRoute;
