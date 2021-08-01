import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { addItem } from "../../actions/itemActions";
import NavComponent from "./NavComponent";

const AddItemComponent = (props) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      title: state.title,
      description: state.description,
      category: state.category,
      price: state.price,
    };

    await props.addItem(newItem);

    alert("Item added successfully");
  };

  return (
    <div>
      <NavComponent />
      <Container>
        <h2 className="text-center mb-3">Add a new Item</h2>
        {props.isAuthenticated ? (
          <Form onSubmit={(e) => onSubmit(e)}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title of the item"
                onChange={(e) => onChange(e)}
              />
              <br />
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Description of the item"
                onChange={(e) => onChange(e)}
              />
              <br />
              <Label for="category">Category</Label>
              <Input
                type="text"
                name="category"
                id="category"
                placeholder="Category of the item"
                onChange={(e) => onChange(e)}
              ></Input>
              <br />
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Price of the item"
                onChange={(e) => onChange(e)}
              />

              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        ) : (
          <Alert className="text-center" color="danger">
            Login to add items!
          </Alert>
        )}
      </Container>
    </div>
  );
};

AddItemComponent.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(AddItemComponent);
