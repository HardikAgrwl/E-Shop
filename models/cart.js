import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
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
    default: 0,
  },
});

const Cart = mongoose.model("cart", CartSchema);
export default Cart;
