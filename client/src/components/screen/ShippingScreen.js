import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addOrder } from "../../actions/orderActions";
import CheckoutSteps from "../layout/checkoutSteps";
import FormContainer from "../layout/FormContainer";

const ShippingScreen = ({ isAuthenticated, cart, addOrder, currentOrder }) => {
  const initialState = {
    street: "",
    city: "",
    postalCode: "",
    country: "",
    contact: "",
  };
  const [shippingAddress, setShippingAddress] = useState(
    currentOrder.address ? currentOrder.address : initialState
  );
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) history.push("/login"); //eslint-disable-next-line
  }, [currentOrder]);

  const changeHandler = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addOrder({ items: cart.items, bill: cart.bill, address: shippingAddress });
    history.push("/payment");
  };

  return (
    <>
      {!isAuthenticated ? (
        <>{history.push("/login")}</>
      ) : (
        <FormContainer>
          <CheckoutSteps step1 />
          <h1>Shipping</h1>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId="address" className="my-1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="street"
                placeholder="Enter address"
                value={shippingAddress.street}
                required
                onChange={(e) => changeHandler(e)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city" className="my-1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={shippingAddress.city}
                required
                onChange={(e) => changeHandler(e)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode" className="my-1">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                placeholder="Enter postal code"
                value={shippingAddress.postalCode}
                required
                onChange={(e) => changeHandler(e)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country" className="my-1">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter country"
                value={shippingAddress.country}
                required
                onChange={(e) => changeHandler(e)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="contact" className="my-1">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                placeholder="Enter contact no."
                value={shippingAddress.contact}
                required
                onChange={(e) => changeHandler(e)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

ShippingScreen.propTypes = {
  isAuthenticated: PropTypes.bool,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  loading: state.cart.loading,
  isAuthenticated: state.user.isAuthenticated,
  currentOrder: state.order.currentOrder,
});

export default connect(mapStateToProps, { addOrder })(ShippingScreen);
