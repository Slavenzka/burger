// common
import React, { Component } from 'react'
import Order from 'components/Order/Order'
import axios from 'axios-orders'
import withErrorHandler from 'hoc/WithErrorHandling/WithErrorHandling'
import { connect } from 'react-redux'
import { ordersFetch } from 'store/actions'
import Spinner from 'components/UI/Spinner/Spinner'

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, id) => dispatch(ordersFetch(token, id))
  }
}

class Orders extends Component {
  componentDidMount () {
    this.props.fetchOrders(this.props.token, this.props.userId)
  }
  render () {
    const componentContent = !this.props.loading
      ? (
          <div>
            {this.props.orders.map(order => {
              return <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
              />
            })}
          </div>
        )
      : <Spinner />
    return componentContent
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
