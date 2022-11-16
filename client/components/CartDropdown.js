import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editItemQuant } from '../store/cart';

export class CartDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleQuantChange = this.handleQuantChange.bind(this);
  }
  handleQuantChange(evt) {
    const newQuant = evt.target.value;
    const editQuant = this.props.editItemQuant;
    const token = window.localStorage.getItem('token'); //might have to make changes to token
    if (token) {
      const itemId = this.props.itemId;
      const cartId = this.props.cartId;
      editQuant(token, itemId, cartId, newQuant);
    }
  }
  render() {
    return (
      <select onChange={this.handleQuantChange} value={this.props.currQuant}>
        {this.props.itemQuant.map((quant) => (
          <option key={quant} value={quant}>
            {quant}
          </option>
        ))}
      </select>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editQuant: (token, itemId, cartId, quant) => {
      dispatch(editItemQuant(token, itemId, cartId, quant));
    },
  };
};

export default connect(null, mapDispatchToProps)(CartDropdown);
