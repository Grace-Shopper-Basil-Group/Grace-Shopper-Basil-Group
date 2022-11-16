import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItemFromCart } from '../store/cart';

export class ViewCart extends Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(itemId) {
    const token = window.localStorage.getItem('token');
    if (token) {
      const cartId = this.props.cart.id;
      this.props.removeItem(token, itemId, cartId);
    }
  }
  render() {
    return (
      <div>
        <h1>Current Cart</h1>
        {this.props.products ? (
          this.props.products.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`products/${item.id}`}>{item.name}</Link>
                <div>{item.price}</div>
                <div>{item.description}</div>
                <img src={item.imageUrl} />
                <div>Quantity: {item.orderItem.quantity}</div>
                <button
                  onClick={() => {
                    this.handleRemove(item.id);
                  }}
                >
                  Remove from cart
                </button>
              </div>
            );
          })
        ) : (
          <div>No items in cart</div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);
