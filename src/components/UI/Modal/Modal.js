import React from 'react'
import css from './Modal.module.scss'
import Backdrop from 'components/UI/Backdrop/Backdrop'
import Auxiliary from 'hoc/Auxiliary/Auxiliary'

class Modal extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render () {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} backdropClickHandler={this.props.modalClose}/>
        <div
          className={css.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
            pointerEvents: this.props.show ? 'all' : 'none'
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    )
  }
}

export default Modal
