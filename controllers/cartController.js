import Cart from "../models/cart.js";
import Item from "../models/item.js";

export const getCartItems = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const addCartItems = async (req, res) => {
  const userId = req.params.id;
  const { updatedCartItems, bill } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      //if cart exixts for the user
      cart.items = [...updatedCartItems];
      cart.bill = bill;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart exists , create one
      const newCart = await Cart.create({
        userId,
        items: [...updatedCartItems],
        bill: bill,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const updateCart = async (req, res) => {
  console.log("server updateCart");
  const userId = req.params.id;
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    let item = await Item.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found");
    }
    const price = item.price;
    if (cart) {
      //if cart exixts for the user
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        let prevQuantity = productItem.quantity;
        productItem.quantity = quantity;
        cart.items[itemIndex] = productItem;
        let changeBill = Number(((quantity - prevQuantity) * price).toFixed(2));
        cart.bill += changeBill;
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const deleteCartItems = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;

  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
