import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";
import { deleteFromCart, getCart } from "../actions/cartActions";
import { checkout } from "../actions/orderActions";
import CheckoutComponent from "./CheckoutComponent";
import NavComponent from "./NavComponent";

const CartComponent = (props) => {
  const [state, setState] = useState({
    loaded: false,
  });

  const getCartItems = async (id) => {
    await props.getCart(id);
    state.loaded = true;
  };

  const onDeleteFromCart = (id, itemId) => {
    props.deleteFromCart(id, itemId);
  };

  const user = props.user;
  if (props.isAuthenticated && !props.cart.loading && !state.loaded) {
    getCartItems(user._id);
  }
  return (
    <div>
      <NavComponent />
      {props.isAuthenticated ? (
        <Fragment>
          {props.cart.cart ? null : (
            <Alert color="info" className="text-center">
              Your cart is empty!
            </Alert>
          )}
        </Fragment>
      ) : (
        <Alert color="danger" className="text-center">
          Login to View!
        </Alert>
      )}

      {props.isAuthenticated &&
      !props.cart.loading &&
      state.loaded &&
      props.cart.cart ? (
        <Container>
          <div className="row">
            {props.cart.cart.items.map((item) => (
              <div className="col-md-4">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{item.name}</CardTitle>
                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                    <CardText>Quantity - {item.quantity}</CardText>
                    <Button
                      color="danger"
                      onClick={() => onDeleteFromCart(user._id, item.productId)}
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Card>
                <br />
              </div>
            ))}
            <div class="col-md-12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    Total Cost = Rs. {props.cart.cart.bill}
                  </CardTitle>
                  <CheckoutComponent
                    user={user._id}
                    amount={props.cart.cart.bill}
                    checkout={props.checkout}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      ) : null}
    </div>
  );
};

CartComponent.propTypes = {
  getCart: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  checkout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

export default connect(mapStateToProps, { getCart, deleteFromCart, checkout })(
  CartComponent
);
