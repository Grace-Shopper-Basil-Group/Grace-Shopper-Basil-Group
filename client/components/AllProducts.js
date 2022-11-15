
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";
import { addItemToCart } from '../store/cart.js';
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom"


export class AllProducts extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleClick(event, product){
    const token = window.localStorage.getItem("token");
    if (token) {
      const cartId = this.props.cart.id
      this.props.addToCart(token, product, cartId)
    }
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
                  <Link to={`/products/${product.id}`}>See Product Details</Link>
                </button>
              </p>
              <p>
                <button id={product.id} className="card_btns" onClick={(event) => this.handleClick(event, product)} type="click">
                  Add to Cart
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
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addToCart: (token, item, cartId) => {
      dispatch(addItemToCart(token, item, cartId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
