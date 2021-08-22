import { useState } from "react";
import { Alert, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

const OrderScreen = ({ orders, isAuthenticated, user }) => {
  const { id } = useParams();
  const currentOrder = useState(
    orders.filter((order) => order._id === id)[0]
  )[0];
  const history = useHistory();
  return (
    <>
      {!isAuthenticated ? (
        history.push("/login")
      ) : (
        <>
          <h1 style={{ textAlign: "center", margin: "2rem 0" }}>
            Order {currentOrder._id}
          </h1>
          <Row className="my-3 mx-4">
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{" "}
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {currentOrder.address.street}, {currentOrder.address.city}{" "}
                    {currentOrder.address.postalCode},{" "}
                    {currentOrder.address.country} ,{" "}
                    {currentOrder.address.contact}
                  </p>
                  {currentOrder.delivered ? (
                    <Alert variant="success">Order Delivered</Alert>
                  ) : (
                    <Alert variant="danger">Not Delivered</Alert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {currentOrder.paymentMethod}
                  </p>
                  {currentOrder.payment === "success" ? (
                    <Alert variant="success">Order Paid</Alert>
                  ) : (
                    <Alert variant="danger">Not Paid</Alert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {currentOrder.items.length === 0 ? (
                    <Alert variant="info">Order is empty</Alert>
                  ) : (
                    <ListGroup variant="flush">
                      {currentOrder.items.map((item, index) => (
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
                              {item.quantity * item.price}
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
                      <Col>Total</Col>
                      <Col>${currentOrder.bill}</Col>
                    </Row>
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
  orders: state.order.orders,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, null)(OrderScreen);
