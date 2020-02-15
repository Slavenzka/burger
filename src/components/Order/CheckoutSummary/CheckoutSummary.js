// common
import React from 'react'
// components
import Burger from 'components/Burger/Burger'
import Button from 'components/UI/Button/Button'
// style
import css from './CheckoutSummary.module.scss'

const CheckoutSummary = (props) => {
  return (
    <div className={css.checkoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType='Danger'
        clicked={props.checkoutCancelled}
      >
        CANCEL
      </Button>
      <Button
        btnType='Success'
        clicked={props.checkoutContinued}
      >
        SUCCESS
      </Button>
    </div>
  )
}

export default CheckoutSummary
