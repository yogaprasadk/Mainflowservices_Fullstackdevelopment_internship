const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  buyer: {
    name: String,
    address: String,
    contact: String,
    email: String,
  },
  products: [{
    name: String,
    quantity: Number,
    unitPrice: Number
  }],
  transactionId: String,
  purchaseDate: Date,
  paymentMethod: String
});

module.exports = mongoose.model('Bill', billSchema);
