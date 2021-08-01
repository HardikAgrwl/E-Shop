import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import LoginModal from "../auth/loginModal";
import Logout from "../auth/logout";
import RegisterModal from "../auth/registerModal";

const NavComponent = (props) => {
  const [state, setState] = useState({
    isOpen: false,
  });

  const toggle = () => {
    setState({
      isOpen: !state.isOpen,
    });
  };

  const { isAuthenticated, user } = props.user;
  const authLinks = (
    <>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </span>
      </NavItem>
      <NavItem>
        <NavLink href="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/cart">Cart</NavLink>
      </NavItem>
      <NavItem className="mr-2">
        <NavLink href="/orders">Orders</NavLink>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">E-Shop</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

NavComponent.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(NavComponent);
