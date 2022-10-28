const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
        tokenId: { type: String, required: true },
        expireDate: { type: String, required: true },
    },

    { timestamps: true },
);

module.exports = mongoose.model("Token", tokenSchema);