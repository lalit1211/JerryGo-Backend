const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const tourSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "A tour must have name"],
		},
		duration: {
			type: Number,
			required: [true, "A tour must have duration"],
		},
		maxGroupSize: {
			type: Number,
			required: [
				true,
				"A tour must have maxGroupSize",
			],
		},
		difficulty: {
			type: String,
			required: [true, "A tour must have difficulty"],
			enum: ["easy", "medium", "difficult"],
		},
		ratingsAverage: {
			type: Number,
			default: 0,
			min: [0, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
		},
		price: {
			type: Number,
			required: [true, "A tour must have a price"],
		},
		ratingNumber: {
			type: Number,
			default: 0,
		},
		photo: [{ type: String }],
	},
	{ timestamps: true },
);

const Tour = model("Tour", tourSchema);

module.exports = Tour;
