import PropTypes from "prop-types";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { clearCart } from "../../actions/cartActions";
import { logout } from "../../actions/userActions";
import CartIconComponent from "./CartIconComponent";

const NavComponent = (props) => {
  const { isAuthenticated, user } = props.user;
  const history = useHistory();

  const logoutHandler = () => {
    history.push(history.location.pathname);
    props.clearCart();
    props.logout();
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  {isAuthenticated ? (
                    <CartIconComponent />
                  ) : (
                    <>
                      {"Cart "}
                      <i className="fas fa-shopping-cart"></i>
                    </>
                  )}
                </Nav.Link>
              </LinkContainer>
              {isAuthenticated ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/order">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={() => logoutHandler()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    {"Sign In "}
                    <i className="fas fa-user"></i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

NavComponent.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout, clearCart })(NavComponent);
