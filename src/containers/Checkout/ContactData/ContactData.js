// common
import React, { Component } from 'react'
// components
import Button from 'components/UI/Button/Button'
import Spinner from 'components/UI/Spinner/Spinner'
import Input from 'components/UI/Input/Input'
// packages
import { connect } from 'react-redux'
// styles
import css from './ContactData.module.scss'
import WithErrorHandler from 'hoc/WithErrorHandling/WithErrorHandling'
import axios from 'axios-orders'
import { purchaseBurger } from 'store/actions'
import { createInputConfig } from 'utils'
import { checkValidity, updateObject } from 'shared/utility'

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
  }
}

class ContactData extends Component {
  state = {
    orderForm: {
      name: createInputConfig('input', 'text', 'Your name', ''),
      street: createInputConfig('input', 'text', 'Street name', ''),
      zip: createInputConfig('input', 'text', 'ZIP Code', ''),
      country: createInputConfig('input', 'text', 'Your country', ''),
      email: createInputConfig('input', 'email', 'Your email', ''),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        validation: {},
        value: 'fastest',
        valid: true
      }
    },
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
    formIsValid: false
  }

  orderHandler = (evt) => {
    evt.preventDefault()
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userID
    }
    this.props.onOrderBurger(order, this.props.token)
  }

  inputChangedHandler = (evt, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: evt.target.value,
      valid: checkValidity(evt.target.value, this.state.orderForm[inputIdentifier].validation),
      touched: true
    })

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputID in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputID].valid && formIsValid
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
  }

  render () {
    const formElementsArray = Object.keys(this.state.orderForm).map((item, index) => {
      return {
        config: { ...this.state.orderForm[item] },
        id: item
      }
    })
    let form = this.props.loading ? <Spinner /> : (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={evt => this.inputChangedHandler(evt, formElement.id)}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            fieldType={formElement.id}
            key={formElement.id}
          />
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    )

    return (
      <div className={css.ContactData}>
        <h4>Enter your contact data:</h4>
        {form}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios))
