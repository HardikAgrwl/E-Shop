import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddItemComponent from "../layout/AddItemComponent";
import CartComponent from "../layout/CartComponent";
import NavComponent from "../layout/NavComponent";
import OrderComponent from "../layout/OrderComponent";
import { ToastComponent } from "../layout/toastComponent";
import HomeComponent from "./HomeScreen";
import ItemScreen from "./ItemScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const MainComponent = () => {
  return (
    <div>
      <ToastComponent />
      <Router>
        <NavComponent />
        <Route path="/" exact>
          <HomeComponent />
        </Route>
        <Route path="/login" exact>
          <LoginScreen />
        </Route>
        <Route path="/register" exact>
          <RegisterScreen />
        </Route>
        <Route path="/item/:id" exact>
          <ItemScreen />
        </Route>
        <Route path="/addItem" exact>
          <AddItemComponent />
        </Route>
        <Route path="/cart" exact>
          <CartComponent />
        </Route>
        <Route path="/orders" exact>
          <OrderComponent />
        </Route>
      </Router>
    </div>
  );
};

export default connect()(MainComponent);
