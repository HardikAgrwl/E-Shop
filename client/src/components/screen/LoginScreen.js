import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors } from "../../actions/errorActions";
import { login } from "../../actions/userActions";
import ValidateLoginInput from "../auth/validation/login";
import FormContainer from "../layout/FormContainer";
import { toastConfig } from "../layout/toastComponent";

const LoginScreen = (props) => {
  useEffect(() => {
    const { msg, status } = props.error;
    if (status < 500 && status >= 400) {
      toast.error(msg, toastConfig);
      props.clearErrors();
    } //eslint-disable-next-line
  }, [props.error]);

  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { ...state };
    const { errors, isValid } = ValidateLoginInput(data);

    // Attempt to login
    setState({ ...state, errors: errors });
    if (isValid) props.login(data);
  };

  const history = useHistory();
  return (
    <>
      {props.isAuthenticated ? (
        history.goBack()
      ) : (
        <FormContainer>
          <h1>Sign In</h1>
          <Form onSubmit={(e) => onSubmit(e)}>
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

            <Button type="submit" variant="primary" className="my-3">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

LoginScreen.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginScreen);
