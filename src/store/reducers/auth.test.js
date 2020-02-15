import reducer from './auth'
import { AUTH_SUCCESS } from 'store/actions/actionTypes'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userID: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })

  it('should store the token upon login', () => {
    expect(reducer({
      token: null,
      userID: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
      type: AUTH_SUCCESS,
      payload: {
        token: 'test token',
        userID: 'test userID'
      }
    })).toEqual({
      token: 'test token',
      userID: 'test userID',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
})
