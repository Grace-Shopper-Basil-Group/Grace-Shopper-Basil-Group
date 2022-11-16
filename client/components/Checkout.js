import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Checkout extends Component {
  //   componentDidMount() {
  //     this.props.getProducts();
  //   }

  render() {
    const orderId = this.props.cart.id;
    const products = this.props.cart.products;

    return (
      <div>
        <h1>Thank you for your order!</h1>
        <h2>Order#: {orderId}</h2>
        <h3>Products Ordered:</h3>
        <ul>
          {products.map((product, index) => {
            return <li key={index}>{product.name}</li>;
          })}
        </ul>
        Total cost: $
        {products.reduce((accum, product, idx) => {
          accum += product.price;
          return accum;
        }, 0)}
        <div>Shipping Address: 'placeholder'</div>
        <div>Expected Delivery: 2-3 Days</div>
        <Link to="/">Keep Shopping</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Checkout);
