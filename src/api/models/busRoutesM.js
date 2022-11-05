const mongoose = require("mongoose");

const busRoutesSchema = new mongoose.Schema({
        timetableID: { type: String},
        vehicleNo: { type: String, required: true },
        routeId: { type: String, required: true },
        time: { type: String, required: true },
        date: { type: String, required: true },
        startLocation: { type: String, required: true },
        EndLocation: { type: String, required: true },
        
    },

    { timestamps: true },
);

module.exports = mongoose.model("BusRoutes", busRoutesSchema);