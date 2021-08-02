import PropTypes from "prop-types";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";
import Loader from "../layout/loader";
import Product from "../layout/Product.js";

const HomeScreen = (props) => {
  useEffect(() => {
    props.getItems();
    //eslint-disable-next-line
  }, []);

  const { items, loading } = props.item;

  return (
    <div>
      <Row className="mx-5">
        {loading ? (
          <Loader />
        ) : (
          items.map((product) => {
            return (
              <Col sm={12} md={6} lg={4} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
};

HomeScreen.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems })(HomeScreen);
