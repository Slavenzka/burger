// common
import React, { Component } from 'react'
// components
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from 'containers/Checkout/ContactData/ContactData'
// packages
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
}

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render () {
    const purchasedRedirect = (this.props.ingredients && this.props.purchased) ? <Redirect to='/' /> : null
    const summary = this.props.ingredients
      ? (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </>
      )
      : <Redirect to='/' />
    return summary
  }
}

export default connect(mapStateToProps)(Checkout)
