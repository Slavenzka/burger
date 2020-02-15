import React from 'react'
import css from './MenuToggle.module.scss'

const MenuToggle = props => (
  <button
    className={css.toggle}
    onClick={props.clicked}
  >
    Open mobile menu
  </button>
)

export default MenuToggle
