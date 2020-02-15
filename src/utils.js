export const createInputConfig = (elType, type, placeholder, value) => {
  return {
    elementType: elType,
    elementConfig: {
      type: type,
      placeholder: placeholder
    },
    value: value,
    validation: {
      required: true
    },
    valid: false,
    touched: false
  }
}
