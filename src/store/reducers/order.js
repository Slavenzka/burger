import {
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_INIT
} from 'store/actions/actionTypes'
import { updateObject } from 'shared/utility'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_BURGER_START:
      return updateObject(state, {
        loading: true
      })
    case PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.payload.orderData, { id: action.payload.id })
      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      })
    case PURCHASE_BURGER_FAIL:
      return updateObject(state, {
        loading: false
      })
    case PURCHASE_INIT:
      return updateObject(state, {
        purchased: false
      })
    case FETCH_ORDERS_START:
      return updateObject(state, {
        loading: true
      })
    case FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.payload,
        loading: false
      })
    case FETCH_ORDERS_FAIL:
      return updateObject(state, {
        loading: false
      })
    default:
      return state
  }
}

export default order
