import React, { Component } from "react";

import { connect } from "react-redux";
import { saveProduct, fetchProduct, updateProduct } from "../../services/index";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup, Image } from "react-bootstrap";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    id: "",
    name: "",
    price: "",
  };
  navigate = useNavigate();
  componentDidMount() {
    const productId = +this.props.match.params.id;
    if (productId) {
      this.findProductById(productId);
    }
    this.findAllProducts();
  }

  findProductById = (productId) => {
    this.props.fetchProduct(productId);
    setTimeout(() => {
      let product = this.props.productObject.product;
      if (product != null) {
        this.setState({
          id: product.id,
          name: product.name,
          price: product.price,
        });
      }
    }, 1000);
  };

  resetProduct = () => {
    this.setState(() => this.initialState);
  };

  submitProduct = (event) => {
    event.preventDefault();

    const product = {
      name: this.state.name,
      price: this.state.price,
    };

    this.props.saveProduct(product);
    setTimeout(() => {
      if (this.props.productObject.product != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateProduct = (event) => {
    event.preventDefault();

    const product = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
    };
    this.props.updateProduct(product);
    setTimeout(() => {
      if (this.props.productObject.product != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  productChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  productList = () => {
    return this.navigate("/list");
  };

  render() {
    const { name, price } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}></div>

        <Form
          onReset={this.resetProduct}
          onSubmit={this.state.id ? this.updateProduct : this.submitProduct}
          id="productFormId"
        >
          <Form.Group controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="test"
              name="name"
              value={name}
              onChange={this.productChange}
              className={"bg-dark text-white"}
              placeholder="Enter Product name"
            />
          </Form.Group>
          <Form.Group controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="test"
              name="price"
              value={price}
              onChange={this.productChange}
              className={"bg-dark text-white"}
              placeholder="Enter Product Price"
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productObject: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProduct: (product) => dispatch(saveProduct(product)),
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    updateProduct: (product) => dispatch(updateProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
