import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../store/auth/actions'

class Logout extends Component {

  componentDidMount() {
    this.props.dispatch(logout())
  }

  render() {
    return <Redirect to='/' />
  }
}


export default connect()(Logout)