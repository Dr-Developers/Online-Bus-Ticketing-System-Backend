const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
        paymentID: { type: String, required: true },
        amount: { type: Number, required: true },
        email: { type: String, required: true },
        method: { type: String, required: true },
        cardNumber: { type: String, required: true },
        cvv: { type: String, required: true },
        expDate: { type: String, required: true },
    },

    { timestamps: true },
);

module.exports = mongoose.model("Payment", paymentSchema);