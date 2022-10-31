import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import {
  deleteProduct,
  loadCurrentItem,
  saveProduct,
  getAllProduct,
} from "../../services/index";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { Container } from "@mui/material";
import "./../User/backscreens.css";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import styles from "./../ProductList.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Categories from "./../categories";
import PreviewIcon from "@mui/icons-material/Preview";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[200]),
  backgroundColor: blue[200],
  class: "btn btn-primary btn-lg",
  borderRadius: 20,

  "&:hover": {
    backgroundColor: blueGrey[700],
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      search: "",
      currentPage: 1,
      productsPerPage: 6,
      sortDir: "asc",
    };
  }

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
        localStorage.removeItem("id");
        this.props.history.push("/");
      });
  }

  handleView = (product) => {
    this.props.loadCurrentItem(product);
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
  submitProduct = (product) => {
    this.props.saveProduct(product);
    const userId = localStorage.getItem("id");
    this.props.getAllProduct(userId);
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
      <>
        <Categories />
        <Container maxWidth="md">
          <div style={{ display: this.state.show ? "block" : "none" }}></div>
          <Card className={"border border-dark bg-dark text-black"}>
            <Card.Header>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <FormControl
                    placeholder="Search"
                    name="search"
                    value={search}
                    className={"info-border bg-dark text-black"}
                    onChange={this.searchChange}
                  />
                  <InputGroup.Append>
                    <Button
                      size="sm"
                      variant="outline-info"
                      type="button"
                      onClick={this.searchData}
                    >
                      Search
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      type="button"
                      onClick={this.cancelSearch}
                    >
                      Reset
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Header>

            <TableContainer component={Paper} variant="outlined">
              <Table
                sx={{ minWidth: 50, color: "primary" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>View</StyledTableCell>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="left">Price</StyledTableCell>
                    <StyledTableCell align="left">Add To Cart</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell>
                        <Link to={`/list/product/${product.id}`}>
                          <IconButton>
                            <PreviewIcon
                              size="medium"
                              color="primary"
                              onClick={(e) => {
                                e.preventDefault();
                                {
                                  this.handleView(product);
                                }
                              }}
                            />
                          </IconButton>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row" border="5px">
                        <div className={styles.productItem}>
                          <img
                            width="80px"
                            className={styles.productItem__image}
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {product.name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {product.price}
                      </StyledTableCell>
                      <StyledTableCell>
                        <ColorButton
                          variant="contained"
                          size="large"
                          onClick={(e) => {
                            e.preventDefault();

                            // changed to product cuz with product.id there's no data
                            this.submitProduct(product);
                          }}
                        >
                          <IconButton>
                            <AddShoppingCartOutlinedIcon
                              fontSize="small"
                              color="primary"
                            />
                          </IconButton>
                        </ColorButton>
                      </StyledTableCell>
                    </StyledTableRow>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productObject: state.product,
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProduct(productId)),
    saveProduct: (productId) => dispatch(saveProduct(productId)),
    loadCurrentItem: (product) => dispatch(loadCurrentItem(product)),
    getAllProduct: (userId) => dispatch(getAllProduct(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
