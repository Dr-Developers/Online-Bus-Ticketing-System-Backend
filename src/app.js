const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(cors());

// Creating the connection with the database
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() =>
		console.log("Successfully Connected to the MongoDB Database...!"),
	)
	.catch((err) => {
		console.log(err);
	});

// Middleware
app.use(express.json());

// Creating the port connection of the Backend Server
app.listen(process.env.PORT || 5000, () => {
	console.log("Listening on port " + process.env.PORT || 5000, "\b...!");
});