import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearCart } from "../../actions/cartActions";
import { addOrder, checkout } from "../../actions/orderActions";
import CheckoutSteps from "../layout/checkoutSteps";

const PlaceOrderScreen = ({
  cart,
  user,
  order,
  checkout,
  isAuthenticated,
  addOrder,
  clearCart,
}) => {
  //   Calculate prices
  const { currentOrder, paymentMethod } = order;
  // console.log(order);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) history.push("/login");
    if (!currentOrder.address) history.push("/shipping");
    if (!paymentMethod || paymentMethod === "") history.push("/payment");
    //eslint-disable-next-line
  }, []);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  let shippingPrice = addDecimals(
    cart.bill > 250 ? 0 : cart.bill > 150 ? 5 : 10
  );
  let taxPrice = addDecimals(Number((0.18 * cart.bill).toFixed(2)));
  let totalPrice = (
    Number(cart.bill) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  //   useEffect(() => {
  //     if (success) {
  //       history.push(`/order/${order._id}`);
  //     }
  //     // eslint-disable-next-line
  //   }, [history, success]);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    addOrder({ ...currentOrder, bill: totalPrice });
    await checkout(
      user.id,
      currentOrder.address,
      paymentMethod,
      currentOrder.bill
    );
    history.push("/order");
  };

  return (
    <>
      {!isAuthenticated ? (
        history.push("/login")
      ) : (
        <>
          <CheckoutSteps step1 step2 step3 />
          <Row className="mx-4">
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Address:</strong>
                    {currentOrder.address.street}, {currentOrder.address.city}{" "}
                    {currentOrder.address.postalCode},{" "}
                    {currentOrder.address.country} ,{" "}
                    {currentOrder.address.contact}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <strong>Method: </strong>
                  {paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {!cart.items || cart.items.length === 0 ? (
                    <Alert variant="info" className="text-center">
                      Your cart is empty
                    </Alert>
                  ) : (
                    <ListGroup variant="flush">
                      {cart.items.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/item/${item.productId}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.quantity} x ${item.price} = $
                              {(item.quantity * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${cart.bill}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {/* {error && <Message variant="danger">{error}</Message>} */}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={!cart.items || cart.items.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  order: state.order,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { addOrder, checkout, clearCart })(
  PlaceOrderScreen
);
