import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";

export class AllProducts extends Component {
  render() {
    return <div> Test</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
