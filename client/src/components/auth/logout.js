import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, NavLink } from "reactstrap";
import { clearCart } from "../../actions/cartActions";
import { logout } from "../../actions/userActions";

const Logout = (props) => {
  const logoutHandler = () => {
    props.clearCart();
    props.logout();
  };

  return (
    <>
      <Button color="danger" className="btn btn-sm">
        <NavLink onClick={() => logoutHandler()} href="#">
          <span className="text-light">
            <b>Logout</b>
          </span>
        </NavLink>
      </Button>
    </>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default connect(null, { logout, clearCart })(Logout);
