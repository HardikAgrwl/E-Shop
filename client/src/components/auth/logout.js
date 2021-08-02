import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, NavLink } from "reactstrap";
import { logout } from "../../actions/userActions";

const Logout = (props) => {
  return (
    <div>
      <>
        <Button color="danger" className="btn btn-sm">
          <NavLink onClick={props.logout} href="#">
            <span className="text-light">
              <b>Logout</b>
            </span>
          </NavLink>
        </Button>
      </>
    </div>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
