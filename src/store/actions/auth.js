import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH
} from 'store/actions/actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (token, id) => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token: token,
      userID: id
    }
  }
}

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    payload: {
      error: error
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return {
    type: AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, parseInt(expirationTime) * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    const key = 'AIzaSyAsQJppCK5DdSZZ3KIzRQ1vyk1pNBCgHKY'
    let url = isSignup
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    axios.post(`${url}${key}`, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', response.data.localId)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error))
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    payload: {
      path: path
    }
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((new Date(expirationDate).getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
