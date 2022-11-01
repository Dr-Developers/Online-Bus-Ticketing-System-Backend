const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema(
	{
		inspectionId: {type: String},
		routeId: { type: String, required: true },
		time: { type: String, required: true },
		date: { type: String, required: true },
		inspectorName: { type: String, required: true },
		enquiries: { type: String, required:true},
	},

	{ timestamps: true },
);

module.exports = mongoose.model("Inspection", inspectionSchema);
