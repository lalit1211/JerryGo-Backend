const User = require("../database/Schema/user.schema");
const catchAsync = require("../utils/catchAsync");
const _Error = require("../utils/_Error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ******************************* Add newUser *********************************
const signUp = catchAsync(async (req, res, next) => {
	const {
		name,
		email,
		password,
		confirmPassword,
		phone,
		photo,
	} = req.body;

	if (password !== confirmPassword) {
		return next(
			new _Error(
				"Password and Confirm Password are not match",
				400,
			),
		);
	}

	const newUser = await User.create({
		name,
		email,
		password,
		confirmPassword,
		phone,
		photo,
	});

	res.status(201).json({
		status: "success",
		message: `${name} User created successfully`,
		data: newUser,
	});
});
// ******************************* End newUser *********************************
// ******************************* Login *********************************
const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(
			new _Error(
				"Please provide email and password",
				400,
			),
		);
	}

	const user = await User.findOne({ email });
	if (!user) {
		return next(
			new _Error("Invalid email or password", 401),
		);
	}

	const isMatch = await bcrypt.compare(
		password,
		user.password,
	);
	if (!isMatch) {
		return next(
			new _Error("Invalid email or password", 401),
		);
	}

	res.status(200).json({
		status: "success",
		message: "User logged in successfully",
		data: {
			name: user.name,
			email: user.email,
			id: user._id,
		},
	});
});

// ******************************* All Exported module *********************************
module.exports = {
	signUp,
	login,
};
