import React from 'react'
import css from './Button.module.scss'

const Button = props => {
  return (
    <button
      className={[css.Button, css[props.btnType], props.className].join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
