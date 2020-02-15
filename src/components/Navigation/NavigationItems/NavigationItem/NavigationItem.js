import React from 'react'
import css from './NavigationItem.module.scss'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavigationItem = props => {
  return (
    <li className={css.NavigationItem}>
      <NavLink
        to={props.link}
        activeClassName={css.active}
        exact={props.exact}
      >
        {props.children}
      </NavLink>
    </li>
  )
}

NavigationItem.propTypes = {
  link: PropTypes.string,
  active: PropTypes.bool
}

export default NavigationItem
