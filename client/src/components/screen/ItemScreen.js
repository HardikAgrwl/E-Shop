import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../actions/cartActions";
import Loader from "../layout/loader";
import Rating from "../layout/Rating";
import { toastConfig } from "../layout/toastComponent";

const ItemScreen = ({ item, isAuthenticated, user, cart, addToCart }) => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const itemId = useState(id)[0];
  const history = useHistory();
  const [product, setProduct] = useState({});

  const getItem = (itemId) => {
    const itemIndex = item.items.findIndex((p) => p._id === itemId);
    setProduct(item.items[itemIndex]);
  };
  if (product === {}) getItem(itemId);

  useEffect(() => {
    getItem(itemId);
    //eslint-disable-next-line
  }, [itemId]);

  // if (!item.items) fetchItem();

  const { loading } = item;

  const addToCartHandler = (id) => {
    if (isAuthenticated) {
      // addToCart(user.id, product._id, qty);
      let updatedCartItems = cart.items ? [...cart.items] : [];
      let itemIndex = cart.items
        ? cart.items.findIndex((p) => p.productId === id)
        : -1;
      //checkif the product exists on cart or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += Number(qty);
        if (productItem.quantity > 5) {
          productItem.quantity -= Number(qty);
          toast.error("Maximum 5 units allowed", toastConfig);
          return;
        } else updatedCartItems[itemIndex] = productItem;
      } else {
        const { _id, title, image, countInStock, price } = product;
        updatedCartItems.push({
          productId: _id,
          name: title,
          image,
          countInStock,
          quantity: qty,
          price,
        });
      }
      let bill = cart.bill ? cart.bill : 0;
      bill = Number((bill + qty * product.price).toFixed(2));
      addToCart(user.id, updatedCartItems, bill);
    } else {
      toast.warning("Login to continue", toastConfig);
      history.push(history.location.pathname);
      history.push("/login");
    }
  };

  return (
    <>
      <Link className="btn mt-2 btn-light" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Row className="justify-content-center mx-3">
          <Col md={5} sm={10}>
            <Image src={product.image} alt={product.title} fluid></Image>
          </Col>
          <Col md={1}></Col>
          <Col md={4} sm={10}>
            <Row>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Price : ${product.price}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Row>
            <Row>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>Price : {product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Status :{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(Number(e.target.value));
                            }}
                          >
                            {[
                              ...Array(
                                product.countInStock > 5
                                  ? 5
                                  : product.countInStock
                              ).keys(),
                            ].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={() => addToCartHandler(product._id)}
                      className="btn-block"
                      disabled={product.countInStock <= 0 ? true : false}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

ItemScreen.propTypes = {
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { addToCart })(ItemScreen);
