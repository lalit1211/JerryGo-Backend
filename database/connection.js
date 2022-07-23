const mongoose = require("mongoose");
const { DATABASE } = process.env;

mongoose.connect(DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
	_("----->> Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
	_e("----->> Error connecting to DataBase" + error);
});
