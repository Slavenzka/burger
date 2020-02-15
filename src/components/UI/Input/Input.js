import React from 'react'
import css from './Input.module.scss'

const Input  = ({
  elementType,
  elementConfig,
  fieldType,
  value,
  label,
  changed,
  invalid,
  shouldValidate,
  touched
  }) => {
  // let's make a flexible component which decides, which input type is required by props
  let inputElement = null
  const inputClasses = [css.InputElement]

  if (invalid && shouldValidate && touched) {
    inputClasses.push(css.invalid)
  }

  switch (elementType) {
    case 'input':
      // By using {...props} we reduce the complexity of a component and expect right props for
      // the right inputElement
      inputElement = <input
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed}
      />
      break
    case 'textarea':
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed}
      />
      break
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map((option, key) => (
            <option value={option.value} key={key}>{option.displayValue}</option>
          ))}
        </select>
      )
      break
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed}
      />
  }

  return (
    /** div wrapper for styling and positioning **/
    <div className={css.Input}>
      <label className={css.Label} htmlFor="test">{label}</label>
      {inputElement}
      {invalid && shouldValidate && touched && <p className={css.error}>Please, input valid {fieldType}</p>}
    </div>
  )
}

export default Input
