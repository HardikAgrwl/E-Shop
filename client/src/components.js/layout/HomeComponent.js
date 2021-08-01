import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";
import { addToCart } from "../../actions/cartActions";
import { getItems } from "../../actions/itemActions";
import NavComponent from "./NavComponent";

const HomeComponent = (props) => {
  useEffect(() => {
    getItems();
  }, []);

  const onAddToCart = async (id, productId) => {
    await props.addToCart(id, productId);
    alert("Item added to Cart");
  };

  const { items } = props.item;
  const user = props.user;

  return (
    <div>
      <NavComponent />
      <Container>
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h5">{item.title}</CardTitle>
                  <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                  <CardText>{item.category}</CardText>
                  {props.isAuthenticated ? (
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => onAddToCart.bind(user._id, item._id)}
                    >
                      Add To Cart
                    </Button>
                  ) : null}
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

HomeComponent.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

export default connect(mapStateToProps, { getItems, addToCart })(HomeComponent);
