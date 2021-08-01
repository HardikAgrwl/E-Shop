import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import AddItemComponent from "./AddItemComponent";
import CartComponent from "./CartComponent";
import HomeComponent from "./HomeComponent";
import OrderComponent from "./OrderComponent";

const MainComponent = () => {
  return (
    <div>
      <Switch>
        <Route path="/home">
          <HomeComponent />
        </Route>
        <Route path="/addItem">
          <AddItemComponent />
        </Route>
        <Route path="/cart">
          <CartComponent />
        </Route>
        <Route path="/orders">
          <OrderComponent />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default withRouter(connect()(MainComponent));
