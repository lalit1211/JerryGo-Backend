const chalk = require("chalk");
global.__ = console.log;
global._ = (_) => {
	console.log(chalk.blue(_));
};
global._e = (_) => {
	console.log(chalk.magenta(_));
};

// *  Setting up the environment variables
const dotenv = require("dotenv");
dotenv.config({
	path: "./.env",
});

// * Database configuration
require("./database/connection");
const { PORT } = process.env;
const app = require("./app");
app.listen(PORT, () => {
	_(`Server is running on port ${PORT}`);
});
