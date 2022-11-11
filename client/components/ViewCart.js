import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class ViewCart extends Component {
  constructor(){
    super()
    this.state = {
      cart: {
        products: []
      }
    }
  }
  render() {
    return (
      <div>
        <h1>Current Cart</h1>
        {this.props.cart.products.map((item) => {
          return(
            <div key={item.id}>
              <Link to={`products/${item.id}`}>{item.name}</Link>
              <div>{item.price}</div>
              <div>{item.description}</div>
              <img src={item.imageUrl}/>
              <div>Quantity: {item.orderItem.quantity}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}


export default connect(mapStateToProps)(ViewCart)
