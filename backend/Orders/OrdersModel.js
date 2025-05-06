const mongoose = require('mongoose');

const PendingOrderSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  mobileNo: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Ensures exactly 10 digits
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  street: { type: String, required: true, trim: true },
  pincode: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{5,6}$/.test(v);
      },
      message: props => `${props.value} is not a valid pincode!`
    }
  },
  city: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  productName: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('pending_orders', PendingOrderSchema);
