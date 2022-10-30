const mongoose = require("mongoose");


const inspectionSchema = new mongoose.Schema(
	{
		routeId: { type: String, required: true },
		type: { type: String, required: true },
		date: { type: String, required: true },
		inspectorName: { type: String, required: true },
	},

	{ timestamps: true },
);

module.exports = mongoose.model("Inspection", inspectionSchema);