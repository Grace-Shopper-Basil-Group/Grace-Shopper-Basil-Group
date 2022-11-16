import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class CartDropdown extends Component {
  constructor(props) {
    super(props);
  }
  handleSelect(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <select onChange={this.props.onChange} value={this.props.selectedQuant}>
        {this.props.itemQuant.map((quant) => (
          <option key={quant} value={quant}>
            {quant}
          </option>
        ))}
      </select>
    );
  }
}
