import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../src/hoc/Layout/Layout'
import TaskTable from './components/TaskTable'
import LoginPage from './components/LoginPage'
import Logout from './components/Logout'

import './index.css'

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Layout>
          <Switch>
            <Route path='/' exact component={TaskTable} />
            <Route path='/login' component={LoginPage} />
            <Route path='/logout' component={Logout} />
          </Switch>
        </Layout>
      </div>
    )
  }
}
