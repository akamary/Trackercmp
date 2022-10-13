import React, { Component } from "react";

import { connect } from "react-redux";
import { saveProduct, fetchProduct, updateProduct } from "../../services/index";

import { Form, InputGroup, Image } from "react-bootstrap";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      genres: [],
      languages: [],
      show: false,
    };
  }

  initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoURL: "",
    isbnNumber: "",
    price: "",
    language: "",
    genre: "",
  };

  componentDidMount() {
    const productId = +this.props.match.params.id;
    if (productId) {
      this.findProductById(productId);
    }
    this.findAllLanguages();
  }

  findAllLanguages = () => {
    this.props.fetchLanguages();
    setTimeout(() => {
      let productLanguages = this.props.productObject.languages;
      if (productLanguages) {
        this.setState({
          languages: [{ value: "", display: "Select Language" }].concat(
            productLanguages.map((language) => {
              return { value: language, display: language };
            })
          ),
        });
        this.findAllGenres();
      }
    }, 100);
  };

  findAllGenres = () => {
    this.props.fetchGenres();
    setTimeout(() => {
      let productGenres = this.props.productObject.genres;
      if (productGenres) {
        this.setState({
          genres: [{ value: "", display: "Select Genre" }].concat(
            productGenres.map((genre) => {
              return { value: genre, display: genre };
            })
          ),
        });
      }
    }, 100);
  };

  findProductById = (productId) => {
    this.props.fetchProduct(productId);
    setTimeout(() => {
      let product = this.props.productObject.product;
      if (product != null) {
        this.setState({
          id: product.id,
          title: product.title,
          author: product.author,
          coverPhotoURL: product.coverPhotoURL,
          isbnNumber: product.isbnNumber,
          price: product.price,
          language: product.language,
          genre: product.genre,
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
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      language: this.state.language,
      genre: this.state.genre,
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
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      language: this.state.language,
      genre: this.state.genre,
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
    return this.props.history.push("/list");
  };

  render() {
    const { title, author, coverPhotoURL, isbnNumber, price, language, genre } =
      this.state;

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
              name="title"
              value={title}
              onChange={this.productChange}
              className={"bg-dark text-white"}
              placeholder="Enter Product Title"
            />
          </Form.Group>
          <Form.Group controlId="formGridAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="test"
              name="author"
              value={author}
              onChange={this.productChange}
              className={"bg-dark text-white"}
              placeholder="Enter Product Author"
            />
          </Form.Group>
          <Form.Group controlId="formGridCoverPhotoURL">
            <Form.Label>Cover Photo URL</Form.Label>
            <InputGroup>
              <Form.Control
                required
                autoComplete="off"
                type="test"
                name="coverPhotoURL"
                value={coverPhotoURL}
                onChange={this.productChange}
                className={"bg-dark text-white"}
                placeholder="Enter Product Cover Photo URL"
              />
              <InputGroup.Append>
                {this.state.coverPhotoURL !== "" && (
                  <Image
                    src={this.state.coverPhotoURL}
                    roundedRight
                    width="40"
                    height="38"
                  />
                )}
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formGridISBNNumber">
            <Form.Label>ISBN Number</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="test"
              name="isbnNumber"
              value={isbnNumber}
              onChange={this.productChange}
              className={"bg-dark text-white"}
              placeholder="Enter Product ISBN Number"
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
          <Form.Group controlId="formGridLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Control
              required
              as="select"
              custom
              onChange={this.productChange}
              name="language"
              value={language}
              className={"bg-dark text-white"}
            >
              {this.state.languages.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.display}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Label>Genre</Form.Label>
          required as="select" custom onChange={this.productChange}
          name="genre" value={genre}
          className={"bg-dark text-white"}
          {this.state.genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.display}
            </option>
          ))}
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
