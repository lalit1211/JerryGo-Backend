const express = require("express");
const morgan = require("morgan");
require("./database/connection");
// const controller = require("./controller/tours.controller.js");

app = express();
// ************************* middleware *************************
app.use(morgan("dev"));
app.use(express.json());
// ************************* middleware end *************************

// ************************ Routes ************************
const toursRoute = require("./routes/tours.routes");
const testRoute = require("./routes/test.routes");
const authRoute = require("./routes/authentication.routes");

app.use("/api/v1/tours", toursRoute);
app.use("/api/v1/test", testRoute);

app.use("/api/v1/auth", authRoute);

// app.route("/")
// .get(controller.get)
// .post(controller.post)
// .patch(controller.patch)
// .delete(controller.deletee);

// app.get("/api/v1/", (req, res) => {
// 	res.send("ok");
// 	_("Hello Jerry");
// });
// ************************* End Routes ************************

// ************************ Error Handling ************************************
// * Global Error Handling middleware
app.use((err, req, res, next) => {
	const errstatus = err.statusCode || 500;
	const message = err.message || "Something went wrong";
	const status = err.status || "error";

	res.status(errstatus).json({
		message,
		status,
	});
});

// *404 handler
app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: "Not Found",
	});
});
// **************************** Error Handling End ************************************

module.exports = app;
