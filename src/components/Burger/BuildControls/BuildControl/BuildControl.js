import React from 'react'
import css from './BuildControl.module.scss'

const BuildControl = props => {
  return (
    <div className={css.BuildControl}>
      <p className={css.Label}>{props.label}</p>
      <button
        className={css.Less}
        onClick={props.less}
        disabled={props.disabled}
      >
        Less
      </button>
      <button
        className={css.More}
        onClick={props.more}
      >
        More
      </button>
    </div>
  )
}

export default BuildControl
