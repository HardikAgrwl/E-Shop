import Badge from "@material-ui/core/Badge";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCart } from "../../actions/cartActions";

const CartIconComponent = ({ cart, getCart, user }) => {
  const [itemCount, setItemCount] = useState(0);
  const cartItemsCount = (items) => {
    console.log("cartItmsCount");
    let cartCount = 0;
    for (let i = 0; i < items.length; i++) {
      cartCount += items[i].quantity;
    }
    setItemCount(cartCount);
  };
  useEffect(() => {
    console.log("useEffect");
    if (cart.items) cartItemsCount(cart.items);
    else {
      if (user) getCart(user.id);
    } //eslint-disable-next-line
  }, [cart]);
  console.log(cart, itemCount);

  return (
    <div>
      {"Cart "}
      <Badge color="secondary" badgeContent={cart.items ? itemCount : 0}>
        <i className="fas fa-shopping-cart"></i>
      </Badge>
    </div>
  );
};

CartIconComponent.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  user: state.user.user,
});

export default connect(mapStateToProps, { getCart })(CartIconComponent);
