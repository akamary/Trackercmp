import React, { Component } from "react";

import { connect } from "react-redux";
import Table from "@mui/material/Table";
import { deleteProduct } from "../../services/index";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import "./../User/backscreens.css";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import axios from "axios";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      search: "",
      currentPage: 1,
      productsPerPage: 10,
      sortDir: "asc",
    };
  }
  handleAddProduct = () => {};
  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
        ? this.setState({ sortDir: "desc" })
        : this.setState({ sortDir: "asc" });
      this.findAllProducts(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllProducts(this.state.currentPage);
  }

  findAllProducts(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8080/rest/products?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.productsPerPage +
          "&sortBy=price&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          products: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  deleteProduct = (productId) => {
    this.props.deleteProduct(productId);
    setTimeout(() => {
      if (this.props.productObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllProducts(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllProducts(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllProducts(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllProducts(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.productsPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllProducts(condition);
      }
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.productsPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllProducts(this.state.currentPage + 1);
      }
    }
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancelSearch = () => {
    this.setState({ search: "" });
    this.findAllProducts(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8080/rest/products/search/" +
          this.state.search +
          "?page=" +
          currentPage +
          "&size=" +
          this.state.productsPerPage
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          products: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  };

  render() {
    const { products, currentPage, totalPages, search } = this.state;

    return (
      <div className="background-screens">
        <div className="App">
          <Container maxWidth="lg">
            <div style={{ display: this.state.show ? "block" : "none" }}></div>
            <Card className={"border border-dark bg-dark text-white"}>
              <Card.Header>
                <div style={{ float: "left" }}>Product List</div>
                <div style={{ float: "right" }}>
                  <InputGroup size="sm">
                    <FormControl
                      placeholder="Search"
                      name="search"
                      value={search}
                      className={"info-border bg-dark text-white"}
                      onChange={this.searchChange}
                    />
                    <InputGroup.Append>
                      <Button
                        size="sm"
                        variant="outline-info"
                        type="button"
                        onClick={this.searchData}
                      ></Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        type="button"
                        onClick={this.cancelSearch}
                      ></Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Card.Header>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Product Name
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Price
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Add Product
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow
                        key={product.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.price}
                        </TableCell>
                        <TableCell>
                          <Button>
                            <AddShoppingCartOutlinedIcon
                              onClick={this.handleAddProduct}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br></br>
              <br></br>

              {products.length > 0 ? (
                <Card.Footer>
                  <div style={{ float: "left" }}>
                    Showing Page {currentPage} of {totalPages}
                  </div>
                  <div style={{ float: "right" }}>
                    <InputGroup size="sm">
                      <InputGroup.Prepend>
                        <Button
                          type="button"
                          variant="outline-info"
                          disabled={currentPage === 1 ? true : false}
                          onClick={this.firstPage}
                        >
                          First
                        </Button>
                        <Button
                          type="button"
                          variant="outline-info"
                          disabled={currentPage === 1 ? true : false}
                          onClick={this.prevPage}
                        >
                          Prev
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl
                        className={"page-num bg-dark"}
                        name="currentPage"
                        value={currentPage}
                        onChange={this.changePage}
                      />
                      <InputGroup.Append>
                        <Button
                          type="button"
                          variant="outline-info"
                          disabled={currentPage === totalPages ? true : false}
                          onClick={this.nextPage}
                        >
                          Next
                        </Button>
                        <Button
                          type="button"
                          variant="outline-info"
                          disabled={currentPage === totalPages ? true : false}
                          onClick={this.lastPage}
                        >
                          Last
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                </Card.Footer>
              ) : null}
            </Card>
          </Container>
        </div>
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
    deleteProduct: (productId) => dispatch(deleteProduct(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
