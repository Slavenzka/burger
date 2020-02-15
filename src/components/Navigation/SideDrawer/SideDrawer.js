import React from 'react'
import css from './SideDrawer.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems'
import Auxiliary from 'hoc/Auxiliary/Auxiliary'
import Backdrop from 'components/UI/Backdrop/Backdrop'

const SideDrawer = props => {
  let attachedClasses = [css.SideDrawer, css.Close]

  if (props.open) {
    attachedClasses = [css.SideDrawer, css.Open]
  }
  return (
    <Auxiliary>
      <Backdrop show={props.open} backdropClickHandler={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={css.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  )
}

export default SideDrawer
