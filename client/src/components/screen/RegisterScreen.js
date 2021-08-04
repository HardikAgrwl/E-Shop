import PropTypes from "prop-types";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors } from "../../actions/errorActions";
import { register } from "../../actions/userActions";
import ValidateRegisterInput from "../auth/validation/register";
import FormContainer from "../layout/FormContainer";
import { toastConfig } from "../layout/toastComponent";

const RegisterModal = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  useEffect(() => {
    const { msg, status } = props.error;
    if (status < 500 && status >= 400) {
      toast.error(msg, toastConfig);
      props.clearErrors();
    } //eslint-disable-next-line
  }, [props.error]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { ...state };
    const { errors, isValid } = ValidateRegisterInput(data);

    if (isValid) {
      // Crete user object
      const { name, email, password } = state;
      const newUser = { name, email, password };
      // Attempt to register
      props.register(newUser);
    }
    setState({ ...state, errors: errors });
  };

  const location = useLocation();
  const { redirectTo } = queryString.parse(location.search);
  const history = useHistory();

  return (
    <>
      {props.isAuthenticated ? (
        history.push(redirectTo == null ? "/" : redirectTo)
      ) : (
        <FormContainer>
          <h1>Register</h1>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter name"
                value={state.name}
                onChange={(e) => onChange(e)}
              ></Form.Control>
              <div className="error">{state.errors.name}</div>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={state.email}
                onChange={(e) => onChange(e)}
              ></Form.Control>
              <div className="error">{state.errors.email}</div>
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={state.password}
                onChange={(e) => onChange(e)}
              ></Form.Control>
              <div className="error">{state.errors.password}</div>
            </Form.Group>
            <Form.Group controlId="password2" className="my-3">
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                placeholder="Confirm password"
                value={state.password2}
                onChange={(e) => onChange(e)}
              ></Form.Control>
              <div className="error">{state.errors.password2}</div>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
