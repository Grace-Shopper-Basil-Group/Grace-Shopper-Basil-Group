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
    const token = window.localStorage.getItem('token');
    if (token) {
      console.log('dropdownprops', this.props);
      const itemId = this.props.itemId;
      const cartId = this.props.cartId;
      this.props.editItemQuant(token, itemId, cartId, newQuant); //editItemQuant is returning undefined
    }
  }
  render() {
    return (
      <select onChange={this.handleQuantChange}>
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
    editItemQuant: (token, itemId, cartId, quant) => {
      dispatch(editItemQuant(token, itemId, cartId, quant));
    },
  };
};

export default connect(null, mapDispatchToProps)(CartDropdown);
