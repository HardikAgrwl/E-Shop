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
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    let item = await Item.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found");
    }
    const price = item.price;
    const name = item.title;
    if (cart) {
      //if cart exixts for the user
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      //checkif the product exists on cart or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += Number(quantity);
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price });
      }
      cart.bill = cart.bill + Number((quantity * price).toFixed(2));
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart exists , create one
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price }],
        bill: Number((quantity * price).toFixed(2)),
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const deleteCartItems = async (req, res) => {
  const userId = req.params.id;
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
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};
