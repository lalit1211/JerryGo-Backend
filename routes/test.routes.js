const express = require("express");

const testRoute = express.Router();

testRoute.route("/").get((req, res) => {
	res.send("Hello test");
});

module.exports = testRoute;
