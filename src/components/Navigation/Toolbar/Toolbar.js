import React from 'react'
import css from './Toolbar.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems'
import MenuToggle from 'components/Navigation/SideDrawer/MenuToggle/MenuToggle'

const Toolbar = props => {
  return (
    <header className={css.Toolbar}>
      <MenuToggle clicked={props.open} />
      <div className={css.Logo}>
        <Logo />
      </div>
      <nav className={css.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  )
}

export default Toolbar
