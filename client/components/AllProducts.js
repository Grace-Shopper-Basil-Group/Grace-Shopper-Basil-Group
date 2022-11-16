import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/allProducts';
import { addItemToCart } from '../store/cart.js';
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';
import history from '../history';

export class AllProducts extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleClick(event, product) {
    const token = window.localStorage.getItem('token');
    if (token) {
      const cartId = this.props.cart.id;
      this.props.addToCart(token, product, cartId);
    } else {
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      let inCart = false;
      cart.products.forEach((productInStorage) => {
        if (product.id === productInStorage.id) {
          productInStorage.quantity++;
          inCart = true;
        }
      });
      if (!inCart) {
        product.quantity = 1;
        cart.products.push(product);
      }
      window.localStorage.setItem('cart', JSON.stringify(cart));
      history.push('/cart');
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
                  <Link to={`/products/${product.id}`}>
                    <span>See Product Details</span>
                  </Link>
                </button>
              </p>
              <p>
                <button
                  id={product.id}
                  className="card_btns"
                  onClick={(event) => this.handleClick(event, product)}
                  type="click"
                >
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
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addToCart: (token, item, cartId) => {
      dispatch(addItemToCart(token, item, cartId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
