import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS
} from 'store/actions/actionTypes'
import axios from 'axios-orders'

export const addIngredient = type => {
  return {
    type: ADD_INGREDIENT,
    payload: type
  }
}

export const removeIngredient = type => {
  return {
    type: REMOVE_INGREDIENT,
    payload: type
  }
}

export const setIngredients = ingredients => {
  return {
    type: SET_INGREDIENTS,
    payload: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-b499f.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      })

  }
}
