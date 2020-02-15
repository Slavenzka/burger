import React from 'react'
import Auxiliary from 'hoc/Auxiliary/Auxiliary'
import Button from 'components/UI/Button/Button'

class OrderSummary extends React.Component {
  // This could be the functional component, doesn't have to be a class

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients).map((item, index) => {
      return (
        <li key={index}>
          <span style={{ textTransform: 'capitalize' }}>{item}</span>: {this.props.ingredients[item]}
        </li>
      )
    })

    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Your order price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.purchaseCancel} btnType='Danger'>CANCEL</Button>
        <Button clicked={this.props.purchaseContinue} btnType='Success'>CONTINUE</Button>
      </Auxiliary>
    )
  }
}

export default OrderSummary
