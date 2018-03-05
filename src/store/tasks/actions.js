import * as types from './actionTypes'

export function fetchList (page, sortByAZ, sortField) {
  return { type: types.FETCH_LIST, page, sortByAZ, sortField}
}

export function fetchListStart () {
  return { type: types.FETCH_LIST_START }
}

export function fetchListSuccess (data) {
  return { type: types.FETCH_LIST_SUCCESS, payload: data  }
}

export function fetchListError (error) {
  return { type: types.FETCH_LIST_ERROR, payload: {error} }
}


export function createTask(params, page, sortByAZ, sortField) {
  return { type: types.CREATE_TASK, params, page, sortByAZ, sortField }
}

export function createTaskStart() {
  return { type: types.CREATE_TASK_START }
}

export function createTaskSuccess() {
  return { type: types.CREATE_TASK_SUCCESS }
}

export function createTaskError(error) {
  return { type: types.CREATE_TASK_ERROR, payload: { error } }
}

export function editTask(values, id, page, sortByAZ, sortField) {
  return { type: types.EDIT_TASK, values, id, page, sortByAZ, sortField }
}

export function editTaskStart() {
  return { type: types.EDIT_TASK_START }
}

export function editTaskSuccess() {
  return { type: types.EDIT_TASK_SUCCESS }
}

export function editTaskError(error) {
  return { type: types.EDIT_TASK_ERROR, payload: { error } }
}



