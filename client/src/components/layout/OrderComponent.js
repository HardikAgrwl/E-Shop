import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Container,
} from "reactstrap";
import { getOrders } from "../../actions/orderActions";
import NavComponent from "./NavComponent";

const OrderComponent = (props) => {
  const [state, setState] = useState({
    loaded: false,
  });

  const ongetOrders = async (id) => {
    await props.getOrders(id);
    state.loaded = true;
  };

  const user = props.user;
  if (props.isAuthenticated && !props.order.loading && !state.loaded) {
    ongetOrders(user._id);
  }
  return (
    <div>
      <NavComponent />
      {props.isAuthenticated ? (
        <Fragment>
          {props.order.orders !== [] ? null : (
            <Alert color="info" className="text-center">
              You have no orders!
            </Alert>
          )}
        </Fragment>
      ) : (
        <Alert color="danger" className="text-center">
          Login to View!
        </Alert>
      )}

      {props.isAuthenticated &&
      !props.order.loading &&
      state.loaded &&
      props.order.orders.length ? (
        <Container>
          <div className="row">
            {props.order.orders.map((order) => (
              <div className="col-md-12">
                <Card>
                  <CardBody>
                    <CardTitle tag="h4">
                      {order.items.length} items - Total cost: Rs. {order.bill}
                    </CardTitle>
                    <div className="row">
                      {order.items.map((item) => (
                        <div className="col-md-4">
                          <Card className="mb-2">
                            <CardBody>
                              <CardTitle tag="h5">
                                {item.name} ({item.quantity} pieces)
                              </CardTitle>
                              <CardSubtitle tag="h6">
                                Rs. {item.price}/piece
                              </CardSubtitle>
                            </CardBody>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
                <br />
              </div>
            ))}
          </div>
        </Container>
      ) : null}
    </div>
  );
};
OrderComponent.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

export default connect(mapStateToProps, { getOrders })(OrderComponent);
