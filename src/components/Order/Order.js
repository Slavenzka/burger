import React from 'react'
import css from './Order.module.scss'

const Order = props => {
  let orderIngredients = Object.keys(props.ingredients).map((item, key) => {
    return <span
      key={key}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid grey'
      }}
    >
      {item} ({props.ingredients[item]})
    </span>
  })

  return (
    <div className={css.Order}>
      <p>Ingredients: {orderIngredients}</p>
      <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )
}

export default Order
