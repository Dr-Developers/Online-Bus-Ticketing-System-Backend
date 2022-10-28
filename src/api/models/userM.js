const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		userID: { type: Number },
		name: { type: String, required: true },
		email: { type: String, required: true },
		nicType: { type: String, required: true },
		number: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		type: { type: String, required: true },
	},

	{ timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
