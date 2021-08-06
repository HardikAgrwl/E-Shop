import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPaymentMethod } from "../../actions/orderActions";
import CheckoutSteps from "../layout/checkoutSteps";
import FormContainer from "../layout/FormContainer";

const PaymentScreen = ({ order, isAuthenticated, addPaymentMethod }) => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated) history.push("/login");
    if (!order.currentOrder.shippingAddress) {
      history.push("/shipping");
    } //eslint-disable-next-line
  }, []);

  const [paymentMethod, setPaymentMethod] = useState(order.paymentMethod);

  const submitHandler = (e) => {
    e.preventDefault();
    addPaymentMethod(paymentMethod);
    history.push("/placeorder");
    // history.push("/placeorder");
  };

  return (
    <>
      {!isAuthenticated ? (
        history.push("/login")
      ) : (
        <FormContainer>
          <CheckoutSteps step1 step2 />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  className="my-3 "
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                  type="radio"
                  label="Stripe"
                  id="Stripe"
                  name="paymentMethod"
                  className="my-3"
                  value="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  order: state.order,
});

export default connect(mapStateToProps, { addPaymentMethod })(PaymentScreen);
