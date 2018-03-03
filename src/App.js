import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../src/hoc/Layout/Layout'
import TaskTable from './components/TaskTable'

import './index.css'

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Layout>
          <Switch>
            <Route path='/' component={TaskTable} />
          </Switch>
        </Layout>
      </div>
    )
  }
}
