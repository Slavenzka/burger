import React from 'react'
import css from './Logo.module.scss'
import burgerLogo from 'assets/images/burger-logo.png'

const Logo = props => (
  <div className={css.Logo}>
    <img src={burgerLogo} alt="Burger service logo" />
  </div>
)

export default Logo
