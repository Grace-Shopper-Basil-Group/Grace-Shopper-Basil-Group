import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../history'
import Guestcheckout from './Guestcheckout'

export class Guestcart extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(event, item) {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    let newProducts = cart.products.map((product) => {
      if (product.id === item.id) {
        product.quantity = event.target.value
        return product
      } else {
        return product
      }
    })
    cart.products = newProducts
    window.localStorage.setItem('cart', JSON.stringify(cart));
    history.push('/cart')
  }

  handleRemove(itemId) {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    let newProducts = cart.products.filter((product) => product.id !== itemId);
    cart.products = newProducts;
    window.localStorage.setItem('cart', JSON.stringify(cart));
    history.push('/cart');
  }

  render() {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    let products = cart.products;
    console.log(products)
    return (
      <div>
        <h1>Current Cart</h1>
        {(products.length) ? (
        products.map((item, index) => {
          return(
            <div key={index}>
              <Link to={`products/${item.id}`}>{item.name}</Link>
              <div>{item.price}</div>
              <div>{item.description}</div>
              <img src={item.imageUrl}/>
              <div>Quantity: {item.quantity}</div>
              <select onChange={(event) => {this.handleChange(event, item)}} value={item.quantity}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button onClick={() =>{this.handleRemove(item.id)}}>Remove from cart</button>
            </div>
            )})
            ):(<div>No items in cart</div>)}
          {(products.length) ? (<Link to="/checkout">Checkout</Link>) : (null)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (token, itemId, cartId) => {
      dispatch(removeItemFromCart(token, itemId, cartId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guestcart);
