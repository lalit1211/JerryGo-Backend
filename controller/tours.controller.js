// const e = require("express");
const Tour = require("../database/Schema/tours.schema");
const Tours = require("../database/Schema/tours.schema");
const catchAsync = require("../utils/catchAsync");
const _Error = require("../utils/_Error");

// ******************************* Add newTour *********************************
const addTour = catchAsync(async (req, res, next) => {
	const {
		name,
		duration,
		maxGroupSize,
		difficulty,
		price,
	} = req.body;

	const newTour = await Tours.create({
		name,
		duration,
		maxGroupSize,
		difficulty,
		price,
	});

	res.status(201).json({
		status: "success",
		message: `${name} Tour created successfully`,
		data: newTour,
	});
	_e(newTour);
});

// ******************************* get allTours************************************
const getAllTours = catchAsync(async (req, res, next) => {
	// ?==================
	const { query } = req;
	// let query = req.query;
	// ?================== regular expression pattern for query
	// query = JSON.stringify(query);
	// query = query.replace(
	// 	/\b(gte|gt|lte|lt)\b/g,
	// 	(match) => {
	// 		return `$${match}`;
	// 	},
	// );
	// query = JSON.parse(query);
	// ?================== regular expression end

	__(query);

	const allTours = await Tours.find({
		price: {
			$gte: 1000,
		},
		difficulty: "medium",
	})
		.limit(10)
		.sort("-price -duration")
		.select(" -__v");

	// const allTours = await Tours.find(query);

	res.status(200).json({
		status: "success",
		length: `${allTours.length} tours found`,
		data: allTours,
	});
});

const Test = (req, res) => {
	__("req.body", req.body);
	console.log("req.params", req.params);
	console.log("req.query", req.query);

	res.status(200).json({
		status: "success",
		message: "Test",
	});
};
// ******************************* get tour by id************************************
// ******************************* update tour by id********************************
const updateTour = catchAsync(async (req, res) => {
	const { id } = req.params;

	const _updateTour = await Tours.findByIdAndUpdate(
		id,
		req.body,
		{
			new: true,
		},
	);

	res.status(200).json({
		status: "success",
		message: "Tours updated successfully",
		data: _updateTour,
	});
});
// ******************************* end tour by id********************************
// ****************************** delete tour by id********************************
const deleteTour = catchAsync(async (req, res) => {
	const { id } = req.params;

	const _deleteTour = await Tours.findByIdAndDelete(id);

	res.status(200).json({
		status: "success",
		message: "Tours deleted successfully",
		data: _deleteTour,
	});
});
// ******************************* end delete tour by id********************************

const getTourByID = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const tour = await Tours.findById(id);

	res.status(200).json({
		status: "success",
		data: tour,
	});
});
// ********************************end of getTourByID*******************************

module.exports = {
	addTour,
	getAllTours,
	Test,
	getTourByID,
	updateTour,
	deleteTour,
};
