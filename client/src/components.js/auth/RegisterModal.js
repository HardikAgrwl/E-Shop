import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  NavLink,
} from "reactstrap";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const RegisterModal = (props) => {
  const [state, setState] = useState({
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  });

  useEffect(() => {
    const { error, isAuthenticated } = props;
    // Check for register error
    if (error.id === "REGISTER_FAIL") {
      setState({ ...state, msg: error.msg.msg });
    } else {
      setState({ ...state, msg: null });
    }

    // If authenticated, close modal
    if (state.modal) {
      if (isAuthenticated) {
        toggle();
      }
    } //eslint-disable-next-line
  }, [props.error]);

  const toggle = () => {
    // Clear errors
    clearErrors();
    setState({ ...state, modal: !state.modal });
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = state;

    // Crete user object
    const newUser = { name, email, password };

    // Attempt to register
    register(newUser);
  };
  return (
    <div className="container">
      <Button color="info" className="btn btn-sm">
        <NavLink onClick={toggle} href="#">
          <span className="text-dark">
            <b>Register</b>
          </span>
        </NavLink>
      </Button>
      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {state.msg ? <Alert color="danger">{state.msg}</Alert> : null}
          <Form onSubmit={(e) => onSubmit(e)}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={(e) => onChange(e)}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={(e) => onChange(e)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={(e) => onChange(e)}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
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
