import { put } from 'redux-saga/effects'
import axios from 'axios'
import md5 from 'js-md5'

import * as actions from '../tasks/actions'
import { encodeQuery, sortQuery } from '../../helpers/encodeQuery'

const API = 'https://uxcandy.com/~shapoval/test-task-backend/'

export function* fetchListSaga({page, sortByAZ, sortField}) {
  yield put(actions.fetchListStart())
  try {
    const sort_direction = sortByAZ ? 'asc' : 'desc'
    const response = yield axios({
      method: 'get',
      url: API,
      params: {
        developer: 'Developer77',
        page: page,
        sort_direction,
        sort_field: sortField

      }
    })
    const { data: message } = response

    if (message.status === 'ok') {
      yield put(actions.fetchListSuccess(message.message))
    }
    else {
      throw new Error(message.message)
    }
  } catch (err) {
    yield put(actions.fetchListError(err))
  }
}

export function* createTaskSaga({params}) {
  yield put(actions.createTaskStart())
  try {
    const { username, email, text, image } = params
    const form = new FormData()
    form.append('username', username)
    form.append('email', email)
    form.append('text', text)
    form.append('image', image, image.name)

    const response = yield axios({
      method: 'post',
      url: `${API}create`,
      data: form,
      headers: {
        'content-type': 'multipart/form-data',
      },
      params: {
        developer: 'Developer77'
      }
    })
    const { data: message } = response
    if (message.status === 'ok') {
      yield put(actions.createTaskSuccess(message.message))
      yield put(actions.fetchList())
    }
    else {
      throw new Error(message.message)
    }
    
  } catch (err) {
    yield put(actions.createTaskError(err))
  }
}

export function* editTaskSaga({ values, id }) {
  yield put(actions.editTaskStart())
  try {

    const query = []

    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        query.push(encodeQuery(key, values[key]))
      }
    }
    const sortedQuery = sortQuery(query).join('&')
    const queryWithToken = `${sortedQuery}&token=beejee`

    const response = yield axios({
      method: 'post',
      url: `${API}edit/${id}/`,
      data: values,
      params: {
        developer: 'Developer77',
        signature: md5(queryWithToken)
      }
    })
    const { data: message } = response
    if (message.status === 'ok') {
      yield put(actions.editTaskSuccess(message.message))
      yield put(actions.fetchList())
    }
    else {
      throw new Error(message.message)
    }

  } catch (err) {
    console.log('ERR: ', err)
    yield put(actions.editTaskError(err))
  }
}
