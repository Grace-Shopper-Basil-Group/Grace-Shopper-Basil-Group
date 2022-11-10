import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/product.js';

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    this.props.loadProduct(productId);
  }

  render() {
    return (
      <div>
        <h1>{this.props.product.name}</h1>
        <h2>{this.props.product.price}</h2>
        <h3>{this.props.product.description}</h3>
        <img src={this.props.product.imageUrl} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProduct: (id) => {
      dispatch(fetchProduct(id))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
