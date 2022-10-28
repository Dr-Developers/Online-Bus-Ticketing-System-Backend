const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// importing route files
const userRoute = require("./api/routes/userR");
const paymentRoute = require("./api/routes/paymentR");
const busRoutesRoute  = require("./api/routes/busRoutsR");

const app = express();
dotenv.config();

app.use(cors());

// Creating the connection with the database
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log("Connected to the MongoDB!"))
	.catch((err) => {
		console.log(err);
	});

// Middleware
app.use(express.json());

// implementing base routes
app.use("/api/user", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/busroutes", busRoutesRoute);

// Creating the port connection of the Backend Server
app.listen(process.env.PORT || 5000, () => {
	console.log(`Server is up on Port ${process.env.PORT}!`);
});
