import { takeEvery, all } from 'redux-saga/effects'
import * as types from '../tasks/actionTypes'

import { fetchListSaga, createTaskSaga, editTaskSaga } from './tasks'

export function* watchTask () {
  yield all([
    takeEvery(types.FETCH_LIST, fetchListSaga),
    takeEvery(types.CREATE_TASK, createTaskSaga),
    takeEvery(types.EDIT_TASK, editTaskSaga)
  ])
}