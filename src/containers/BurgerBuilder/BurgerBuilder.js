// common
import React from 'react'
// styles
// components
import Auxiliary from 'hoc/Auxiliary/Auxiliary'
import Burger from 'components/Burger/Burger'
import BuildControls from 'components/Burger/BuildControls/BuildControls'
import Modal from 'components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import Spinner from 'components/UI/Spinner/Spinner'
import WithErrorHandler from 'hoc/WithErrorHandling/WithErrorHandling'
import { connect } from 'react-redux'
import { UPDATE_INGREDIENTS } from 'store/actions/actionTypes'
import {
  addIngredient,
  initIngredients,
  purchaseInit,
  removeIngredient,
  setAuthRedirectPath
} from 'store/actions/index'
import axios from 'axios-orders'

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable,
    error: state.burgerBuilder.error,
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateIngredients: data => dispatch({
      type: UPDATE_INGREDIENTS,
      payload: data
    }),
    addIngredient: type => dispatch(addIngredient(type)),
    removeIngredient: type => dispatch(removeIngredient(type)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetRedirectPath: path => dispatch(setAuthRedirectPath(path))
  }
}

export class BurgerBuilder extends React.Component {
  state = {
    // Local UI state
    purchasing: false
  }

  componentDidMount () {
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const totalCount = Object.keys(ingredients)
      .map(item => {
      return ingredients[item]
    })
      .reduce((total, item) => { return total + item }, 0)

    return totalCount > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true
      })
    } else {
      this.props.onSetRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    }
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] === 0
    }
    let modalContent = this.props.ingredients
      ? (
      <OrderSummary
        ingredients={this.props.ingredients}
        totalPrice={this.props.totalPrice}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />
      )
      : null
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
          {modalContent}
        </Modal>
        {this.props.ingredients ? <Burger ingredients={this.props.ingredients} /> : this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />}
        <BuildControls
          add={this.props.addIngredient}
          remove={this.props.removeIngredient}
          disabled={disabledInfo}
          price={this.props.totalPrice}
          purchasable={this.props.ingredients ? this.updatePurchaseState(this.props.ingredients) : false}
          purchasing={this.purchaseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
      </Auxiliary>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios))
