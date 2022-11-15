import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../history'


export class Guestcart extends Component {
  constructor(){
    super()
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(itemId) {
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    let newProducts = cart.products.filter((product) => product.id !== itemId)
    cart.products = newProducts;
    window.localStorage.setItem('cart', JSON.stringify(cart))
    history.push('/cart')
  }

  render() {
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    let products = cart.products
    return (
      <div>
        <h1>Current Cart</h1>
        {(products) ? (
        products.map((item, index) => {
          return(
            <div key={index}>
              <Link to={`products/${item.id}`}>{item.name}</Link>
              <div>{item.price}</div>
              <div>{item.description}</div>
              <img src={item.imageUrl}/>
              <div>Quantity: {item.quantity}</div>
              <button onClick={() =>{this.handleRemove(item.id)}}>Remove from cart</button>
            </div>
            )})
        ):(<div>No items in cart</div>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (token, itemId, cartId) => {
      dispatch(removeItemFromCart(token, itemId, cartId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Guestcart)
