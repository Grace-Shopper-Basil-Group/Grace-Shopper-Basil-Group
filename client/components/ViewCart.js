import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartDropdown } from './CartDropdown';
import { editItemQuant } from '../store/cart';

const AVAILABLE_QUANT = ['0', '1', '2', '3', '4', '5'];

export class ViewCart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props);
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
                <div className="row">
                  <p>Edit item quantity: </p>
                  <CartDropdown
                    key={item.id}
                    itemId={item.id}
                    cartId={this.props.cart.id}
                    itemQuant={AVAILABLE_QUANT}
                  />
                </div>
              </div>
            );
            <b></b>;
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
    editItemQuant: (token, itemId, cartId, quant) => {
      dispatch(editItemQuant(token, itemId, cartId, quant));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);
