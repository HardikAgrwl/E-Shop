import dotenv from "dotenv";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import Cart from "./models/cart.js";
import Item from "./models/item.js";
import Order from "./models/order.js";
import User from "./models/user.js";

dotenv.config();
connectDB();
const importData = async () => {
  try {
    await Order.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    await Item.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
