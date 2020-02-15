import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS
} from 'store/actions/actionTypes'
import { updateObject } from 'shared/utility'

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false,
  ingredientPrices: {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }
}

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.payload]: state.ingredients[action.payload] + 1
  })
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + state.ingredientPrices[action.payload],
    building: true
  }
  return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.payload]: state.ingredients[action.payload] === 0 ? 0 : state.ingredients[action.payload] - 1
    },
    totalPrice: state.totalPrice - state.ingredientPrices[action.payload],
    building: true
  }
}

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      salad: action.payload.salad,
      bacon: action.payload.bacon,
      cheese: action.payload.cheese,
      meat: action.payload.meat,
    },
    totalPrice: 0,
    error: false,
    building: false
  }
}

const fetchIngredientsFailed = (state, action) => {
  return {
    ...state,
    error: true
  }
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: return addIngredient(state, action)
    case REMOVE_INGREDIENT: return removeIngredient(state, action)
    case SET_INGREDIENTS: return setIngredients(state, action)
    case FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
    default:
      return state
  }
}

export default burgerBuilder
