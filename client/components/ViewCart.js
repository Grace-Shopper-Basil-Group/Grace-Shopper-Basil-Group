import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ViewCart extends Component {
  constructor(){
    super()
    this.state = {
      cart: {}
    }
  }
  render() {
    return (
      <div>{this.props.cart}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}


export default connect(mapStateToProps)(ViewCart)
