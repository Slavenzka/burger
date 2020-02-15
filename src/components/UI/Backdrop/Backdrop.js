import React from 'react'
import css from './Backdrop.module.scss'

const Backdrop = props => (
  props.show ? <div className={css.Backdrop} onClick={props.backdropClickHandler}></div> : null
)

export default Backdrop
