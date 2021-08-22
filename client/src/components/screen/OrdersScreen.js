import { useEffect, useState } from "react";
import { Alert, Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOrders } from "../../actions/orderActions";
import Loader from "../layout/loader";

const OrdersScreen = ({
  user,
  isAuthenticated,
  getOrders,
  orders,
  loading,
}) => {
  const [state, setState] = useState({
    loaded: false,
  });
  const [orderList, setOrderList] = useState(orders);
  useEffect(() => {
    const fetchOrders = async (id) => {
      setState({ loading: true });
      await getOrders(id);
      setState({ loading: false });
    };
    if (!loading) fetchOrders(user.id); //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOrderList(orders); //eslint-disable-next-line
  }, [loading]);
  const history = useHistory();
  return (
    <>
      {isAuthenticated ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              {orderList.length > 0 ? (
                <Row className="justify-content-md-center my-3">
                  <h1 className="my-5" style={{ textAlign: "center" }}>
                    Your Orders
                  </h1>
                  <Col md={10}>
                    <ListGroup variant="flush">
                      {orderList.map((order) => (
                        <ListGroup.Item key={order._id}>
                          <Row className="my-3">
                            <Col md={8}>
                              <Link to={`/orders/${order._id}`}>
                                <h4>OrderId : {order._id}</h4>
                              </Link>
                              <h6>Amount : ${order.bill}</h6>
                            </Col>
                            <Col md={4}>
                              <h6>
                                Ordered on : {order.date_added.split("T")[0]}
                              </h6>
                              <h6>
                                Delivered : {order.delivered ? "Yes" : "No"}
                              </h6>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              ) : (
                <Alert variant="info" className="text-center">
                  Your OrderList is empty!
                </Alert>
              )}
            </>
          )}
        </>
      ) : (
        history.push("/login")
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
  orders: state.order.orders,
  loading: state.order.loading,
});

export default connect(mapStateToProps, { getOrders })(OrdersScreen);
