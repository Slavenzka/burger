import React from 'react'
import css from './BuildControls.module.scss'
import BuildControl from 'components/Burger/BuildControls/BuildControl/BuildControl'
import PropTypes from 'prop-types'

const controls = [
  {
    label: 'Salad',
    type: 'salad'
  },
  {
    label: 'Bacon',
    type: 'bacon'
  },
  {
    label: 'Cheese',
    type: 'cheese'
  },
  {
    label: 'Meat',
    type: 'meat'
  }
]

const BuildControls = props => {
  const controlsList = controls.map((item, index) => {
    return (
      <BuildControl
        label={item.label}
        key={index}
        more={() => props.add(item.type)}
        less={() => props.remove(item.type)}
        disabled={props.disabled[item.type]}
      />
    )
  })
  return (
    <React.Fragment>
      <div className={css.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controlsList}
        <button
          className={css.OrderButton}
          disabled={!props.purchasable}
          onClick={props.purchasing}
        >
          {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
      </div>
    </React.Fragment>
  )
}

BuildControls.propTypes = {
  add: PropTypes.func,
  remove: PropTypes.func,
  purchasing: PropTypes.func,
  disabled: PropTypes.object,
  price: PropTypes.number,
  purchasable: PropTypes.bool

}

export default BuildControls
