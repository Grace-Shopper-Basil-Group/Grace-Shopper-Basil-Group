import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchProduct from '../store/product';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    console.log('this.props :>> ', this.props);
    this.props.loadProduct(productId);
  }

  render() {
    const { product } = this.props || {};

    console.log('this.props :>> ', this.props);
    return (
      <div>
        {product.name}
        {product.price / 100}
        {product.description}
        <img src={product.imageUrl} />
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
