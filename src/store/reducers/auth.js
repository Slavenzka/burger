import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  SET_AUTH_REDIRECT_PATH
} from 'store/actions/actionTypes'
import { updateObject } from 'shared/utility'

const initialState = {
  token: null,
  userID: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    userID: action.payload.userID,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userID: null
  })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.payload.path
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START: return authStart(state, action)
    case AUTH_SUCCESS: return authSuccess(state, action)
    case AUTH_FAIL: return authFail(state, action)
    case AUTH_LOGOUT: return authLogout(state, action)
    case SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
    default: return state
  }
}

export default reducer
