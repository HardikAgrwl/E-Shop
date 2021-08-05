import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddItemComponent from "../layout/AddItemComponent";
import NavComponent from "../layout/NavComponent";
import OrderComponent from "../layout/OrderComponent";
import { ToastComponent } from "../layout/toastComponent";
import CartScreen from "./cartScreen";
import HomeComponent from "./HomeScreen";
import ItemScreen from "./ItemScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const MainComponent = () => {
  return (
    <div>
      <ToastComponent limit={1} />
      <Router>
        <NavComponent />
        <Route path="/" exact component={HomeComponent} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/item/:id" exact component={ItemScreen} />
        <Route path="/addItem" exact component={AddItemComponent} />
        <Route path="/cart" exact component={CartScreen} />
        <Route path="/orders" exact component={OrderComponent} />
      </Router>
    </div>
  );
};

export default connect()(MainComponent);
