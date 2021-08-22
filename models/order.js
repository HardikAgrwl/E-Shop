import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  items: [
    {
      productId: {
        type: String,
      },
      image: String,
      name: String,
      countInStock: Number,
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
        deafult: 1,
      },
      price: Number,
    },
  ],
  bill: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  date_added: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("order", OrderSchema);
export default Order;
