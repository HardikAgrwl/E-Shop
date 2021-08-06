import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addToCart, getCart, updateCart } from "../../actions/cartActions";

const CartScreen = ({
  loading,
  cart,
  user,
  getCart,
  addToCart,
  isAuthenticated,
  updateCart,
}) => {
  const [state, setState] = useState({
    loaded: false,
  });
  const history = useHistory();

  const getCartItems = async (id) => {
    await getCart(id);
    setState({ loaded: true });
  };

  useEffect(() => {
    if (isAuthenticated && !loading && !state.loaded) {
      getCartItems(user._id);
    } //eslint-disable-next-line
  }, [cart]);

  const changeHandler = async (productId, quantity) => {
    let itemIndex = cart.items.findIndex((p) => p.productId === productId);
    if (itemIndex > -1) {
      let bill = cart.bill;
      let productItem = cart.items[itemIndex];
      bill = Number(
        (bill + (quantity - productItem.quantity) * productItem.price).toFixed(
          2
        )
      );
      if (Math.floor(bill) === 0 || bill < 0) bill = 0;
      let updatedCartItems = [...cart.items];
      updatedCartItems[itemIndex].quantity = quantity;
      updateCart({ ...cart, bill, items: [...updatedCartItems] });
    }
  };

  const removeHandler = async (productId) => {
    let itemIndex = cart.items.findIndex((p) => p.productId === productId);
    if (itemIndex > -1) {
      let bill = cart.bill;
      let productItem = cart.items[itemIndex];
      bill -= productItem.quantity * productItem.price;
      if (Math.floor(bill) === 0 || bill < 0) bill = 0;
      let updatedCartItems = [...cart.items];
      updatedCartItems.splice(itemIndex, 1);
      updateCart({ ...cart, bill, items: [...updatedCartItems] });
    }
  };

  const checkoutHandler = async () => {
    // history.push("/login?redirect=shipping");
    await addToCart(user.id, [...cart.items], cart.bill);
    history.push("/shipping");
  };

  const { items, bill } = cart;

  return (
    <>
      {isAuthenticated ? (
        <>
          {cart ? null : (
            <Alert variant="info" className="text-center">
              Your cart is empty!
            </Alert>
          )}
        </>
      ) : (
        <Alert variant="danger" className="text-center">
          Login to View!
        </Alert>
      )}
      {isAuthenticated && !loading && state.loaded && cart ? (
        <Row className="mx-3">
          <h1 className="my-5" style={{ textAlign: "center" }}>
            Shopping Cart
          </h1>
          <Col md={8}>
            <ListGroup variant="flush">
              {items.map((item) => (
                <ListGroup.Item key={item.productId}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/item/${item.productId}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                          changeHandler(item.productId, Number(e.target.value))
                        }
                      >
                        {[
                          ...Array(
                            item.countInStock > 5 ? 5 : item.countInStock
                          ).keys(),
                        ].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeHandler(item.productId)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    Subtotal (
                    {items
                      ? items.reduce((acc, item) => acc + item.quantity, 0)
                      : 0}
                    ) items
                  </h4>
                  <h2>$ {bill.toFixed(2)}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={!items || items.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : null}
    </>
  );
};

CartScreen.propTypes = {
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  loading: state.cart.loading,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, {
  updateCart,
  addToCart,
  getCart,
})(CartScreen);
