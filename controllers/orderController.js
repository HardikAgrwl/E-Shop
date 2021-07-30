import Stripe from "stripe";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import User from "../models/user.js";

export const getOrderDetails = async (req, res) => {
  const userId = req.params.id;
  Order.find({ userId })
    .sort({ date_added: -1 })
    .then((orders) => res.json(orders));
};

export const checkout = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    const userId = req.params.id;
    const { source } = req.body;
    let cart = await Cart.findOne({ userid });
    let user = await User.findOne({ _id: userid });
    const email = user.email;
    if (cart) {
      const charge = await stripe.charges.create({
        amount: cart.bill,
        currency: "inr",
        source: "source",
        receipt_email: "email",
      });
      if (!charge) throw Error("Payment failed");
      if (charge) {
        const order = await Order.create({
          userId,
          items: cart.items,
          bill: cart.bill,
        });
        const data = await Cart.findByIdAndDelete({ _id: cart.id });
        return res.status(201).send(order);
      }
    } else {
      res.status(500).send("You do not have items in cart");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
