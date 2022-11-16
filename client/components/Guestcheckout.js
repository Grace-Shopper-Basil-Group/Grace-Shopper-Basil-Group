import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import history from '../history'

export class Guestcheckout extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mailingAddress: '',
      billingAddress: '',
      cardNumber: '',
      checkedOut: false,
      products: []
    }
    let checkedOut = false;
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    let newCart = JSON.stringify({
      products: []
    })
    window.localStorage.setItem('cart', newCart);
    this.setState({checkedOut: true});
  }

  componentDidMount() {
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    let products = cart.products
    this.setState({products: products})
  }

  render() {
    return (
      <div>
        <div>Review your order</div>
          {this.state.products.map((item) => {
            return (
              <div key={item.id}>
                <div>Name: {item.name}</div>
                <div>Price: ${item.price}</div>
                <div>Quantity: {item.quantity}</div>
              </div>
            )
          })}
        <div>Please enter the following information</div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="first-name-input">First Name: </label>
          <input
            name="first name"
            type="text"
            className="input"
            value={this.state.firstName}
            onChange={(event) => {this.setState({firstName: event.target.value})}} />
          <label htmlFor="last-name-input">Last Name: </label>
          <input
            name="last name"
            type="text"
            className="input"
            value={this.state.lastName}
            onChange={(event) => {this.setState({lastName: event.target.value})}} />
          <label htmlFor="email-input">Email: </label>
          <input
            name="email"
            type="text"
            className="input"
            value={this.state.email}
            onChange={(event) => {this.setState({email: event.target.value})}} />
          <label htmlFor="mailing-address-input">Mailing Address: </label>
          <input
            name="mailing address"
            type="text"
            className="input"
            value={this.state.mailingAddress}
            onChange={(event) => {this.setState({mailingAddress: event.target.value})}} />
          <label htmlFor="billing-address-input">Billing Address: </label>
          <input
            name="billing address"
            type="text"
            className="input"
            value={this.state.billingAddress}
            onChange={(event) => {this.setState({billingAddress: event.target.value})}} />
          <label htmlFor="card-number-input">Card Number: </label>
          <input
            name="card number"
            type="text"
            className="input"
            value={this.state.cardNumber}
            onChange={(event) => {this.setState({cardNumber: event.target.value})}} />
          <button type="submit">Checkout</button>
        </form>
        {(this.state.checkedOut) ? (<Redirect to={{pathname: "/confirmation", state: this.state}} />) : (null)}
      </div>
    )
  }
}

export default Guestcheckout
