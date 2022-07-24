const mongoose = require("mongoose");
const validator = require("validator");
const { collection } = require("./tours.schema");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "A user must have a name"],
			minlength: [
				3,
				"Name must be at least 3 characters",
			],
			maxlength: [
				50,
				"Name must be less than 50 characters",
			],
		},
		email: {
			type: String,
			required: [true, "A user must have an email"],
			unique: true,
			lowercase: true,
			validate: [
				validator.isEmail,
				"Please provide a valid email",
			],
		},
		phone: {
			type: String,
			required: [
				true,
				"A user must have a phone number",
			],
			unique: true,
			validator(value) {
				if (
					!validator.isMobilePhone(value, "en-IN")
				) {
					throw new Error(
						"Please provide a valid phone number",
					);
				}
			},
		},
		photo: {
			type: String,
		},
		password: {
			type: String,
			required: [true, "A user must have a password"],
			minlength: [
				3,
				"Password must be at least 8 characters",
			],
			maxlength: [
				255,
				"Password must be less than 255 characters",
			],
			// select: false,
		},
		confirmPassword: {
			type: String,
			required: [
				true,
				"A user must have a confirm password",
			],
			minlength: [
				3,
				"Password must be at least 8 characters",
			],
			maxlength: [
				255,
				"Password must be less than 255 characters",
			],
			validate: {
				validator: function (value) {
					return value === this.password;
				},
				message:
					"Password and confirm password must match",
			},
		},
	},
	{
		timestamps: true,
		collection: "user",
	},
);

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(
			this.password,
			12,
		);
		this.confirmPassword = undefined;
	}

	next();
});

// userSchema.pre("save", async function (next) {
// 	if (this.isModified("password")) {
// 		this.password = await bcrypt.hash(
// 			this.password,
// 			12,
// 		);
// 		this.confirmPassword = undefined;
// 	}

// 	next();
// });

const User = model("User", userSchema);
module.exports = User;
