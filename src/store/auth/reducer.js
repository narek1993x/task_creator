import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
  auth: null,
  username: 'admin',
  password: '123'
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return state.merge({
        auth: true,
      })
    case types.LOGOUT_SUCCESS:
      return state.merge({
        auth: null
      })

    default: return state
  }
}

export default reducer