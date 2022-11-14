
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
        <div className="div_products_list">
          {allProducts.map((product) => (
            <div className="product_card" key={product.id}>
              <img src={product.imageUrl} alt="product image" />
              <h1>{product.name}</h1>
              <p className="price">Price:${product.price}</p>
              <p className="description">
                Description: {product.description.slice(0, 30)}...
              </p>
              <p>
                <button className="card_btns">
                  <span>See Product Details</span>
                </button>
              </p>
              <p>
                <button className="card_btns">
                  <span>Add to Cart</span>
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
    access: state.auth.accessRights,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
