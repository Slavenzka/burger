import React from 'react'
import css from './NavigationItems.module.scss'
import NavigationItem from 'components/Navigation/NavigationItems/NavigationItem/NavigationItem'

const NavigationItems = props => {
  return (
    <ul className={css.NavigationItems}>
      <NavigationItem link='/' exact>Burger Builder</NavigationItem>
      {props.isAuthenticated && <NavigationItem link='/orders'>Orders</NavigationItem>}
      {props.isAuthenticated
        ? <NavigationItem link='/logout'>Log Out</NavigationItem>
        : <NavigationItem link='/auth'>Authenticate</NavigationItem>
      }
    </ul>
  )
}

export default NavigationItems
