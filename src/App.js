// common
import React, { PureComponent } from 'react';
// components
import Layout from 'hoc/Layout/Layout'
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder'
import WithErrorHandler from 'hoc/WithErrorHandling/WithErrorHandling'
// import Checkout from 'containers/Checkout/Checkout'
// import Orders from 'containers/Orders/Orders'
// import Auth from 'containers/Auth/Auth'
import Logout from 'containers/Auth/Logout/Logout'
// packages
import axios from 'axios-orders'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { authCheckState } from 'store/actions'
import { connect } from 'react-redux'
import AsyncComponent from 'hoc/AsyncComponent/AsyncComponent'

const AsyncAuth = AsyncComponent(() => {
  return import('containers/Auth/Auth')
})

const AsyncOrders = AsyncComponent(() => {
  return import('containers/Orders/Orders')
})

const AsyncCheckout = AsyncComponent(() => {
  return import('containers/Checkout/Checkout')
})

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState())
  }
}

class App extends PureComponent {
  componentDidMount () {
    this.props.onTryAutoSignUp()
  }

  render () {
    const { isAuthenticated } = this.props
    const routesNotAuth = (
      <>
        <Route path='/auth' component={AsyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </>
    )
    const routesAuth = (
      <>
        <Route path='/checkout' component={AsyncCheckout} />
        <Route path='/orders' component={AsyncOrders} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={AsyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </>
    )
    return (
      <div>
        <Layout>
          <Switch>
            {isAuthenticated && routesAuth}
            {!isAuthenticated && routesNotAuth}
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(App, axios)))
