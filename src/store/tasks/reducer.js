import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
  fetching: false,
  list: [],
  auth: null
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_START:
      return state.merge({
        fetching: true
      })
    case types.FETCH_LIST_SUCCESS:
      return state.merge({
        list: action.payload,
        fetching: false
      })
    case types.FETCH_LIST_ERROR:
      return state.merge({
        error: action.payload.err,
        fetching: false
      })

    case types.CREATE_TASK_START:
      return state.merge({
        fetching: true
      })
    case types.CREATE_TASK_SUCCESS:
      return state.merge({
        fetching: false
      })
    case types.CREATE_TASK_ERROR:
      return state.merge({
        error: action.payload.err,
        fetching: false
      })

    case types.EDIT_TASK_START:
      return state.merge({
        fetching: true
      })
    case types.EDIT_TASK_SUCCESS:
      return state.merge({
        fetching: false
      })
    case types.EDIT_TASK_ERROR:
      return state.merge({
        error: action.payload.err,
        fetching: false
      })

    default: return state
  }
}

export default reducer