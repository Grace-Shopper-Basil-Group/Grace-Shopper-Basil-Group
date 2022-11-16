import React, { Component } from 'react'

export class Guestconfirmationpage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const totalCost = this.props.location.state.products.reduce((runningCost, currentItem) => {
      return ((+currentItem.price) * (+currentItem.quantity) + runningCost)
    }, 0)
    return (
      <div>
        <div>Thank you for your order!</div>
        <div>Order number: </div>
        <div>Items ordered:
          {this.props.location.state.products.map((product) => {
            return (
              <div key={product.id}>{product.name}</div>
            )
          })}
        </div>
        <div>Total cost: ${totalCost}.00</div>
        <div>Shipping address: {this.props.location.state.mailingAddress}</div>
        <div>Expected delivery: 3-5 days</div>
      </div>
    )
  }
}

export default Guestconfirmationpage
