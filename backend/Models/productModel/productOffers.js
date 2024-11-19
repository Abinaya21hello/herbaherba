const mongoose = require("mongoose");

const productOfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  offerPercentage: {
    type: Number,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String
  },
});

module.exports = mongoose.model("ProductOffer", productOfferSchema);
