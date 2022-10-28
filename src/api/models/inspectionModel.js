const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        routeId: { type: String, required: true },
        tie: { type: String, required: true },
        date: { type: String, required: true },
        inspectorName: { type: String, required: true },
    },

    { timestamps: true },
);

module.exports = mongoose.model("Inspection", inspectionSchema);