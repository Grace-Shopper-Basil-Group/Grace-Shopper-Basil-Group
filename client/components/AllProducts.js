import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom"

export class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const allProducts = this.props.allProducts;
    return (
      <div>
        <h2>Products</h2>
        <ul>
          {allProducts.map((product) => (
            <div key={product.id}>
              <img src={product.imageUrl} alt="product image" />
              <br></br>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <br></br>
              {product.description}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
