import React from 'react'
import Auxiliary from 'hoc/Auxiliary/Auxiliary'
import css from 'hoc/Layout/Layout.module.scss'
import Toolbar from 'components/Navigation/Toolbar/Toolbar'
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerOpenedHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render () {
    return (
      <Auxiliary>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          open={this.sideDrawerOpenedHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={css.content}>
          {this.props.children}
        </main>
      </Auxiliary>
    )
  }
}

export default connect(mapStateToProps)(Layout)
