import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Row, Col, Input, Form, Button } from 'antd'
import { login } from '../../store/auth/actions'
import './LoginPage.css'

class LoginPage extends Component {
  state = {
    usernameRequiredMessage: '',
    passwordRequiredMessage: ''
  }

  onSubmit = () => {
     this.props.form.validateFields((err, values) => {
      if (err) return
      this.props.dispatch(login())
    })
  }

  validateUsername = (rule, value, callback) => {
    let error = !value ? 'Name is required' : value !== this.props.adminUsername ? 'This username is not correct' : ''
    this.setState({ usernameRequiredMessage: error })
    return error ? callback(error) : callback()
  }

  validatePassword = (rule, value, callback) => {
    let error = !value ? 'Password is required' : value !== this.props.adminPassword ? 'This password is not correct' : ''
    this.setState({ passwordRequiredMessage: error })
    return error ? callback(error) : callback()
  }

  render() {
    const { usernameRequiredMessage, passwordRequiredMessage } = this.state
    let authRedirect = null

    if (this.props.isAuthentiacted) {
      authRedirect = <Redirect to='/' />
    }


    return (
      <Row className='Login'>
        {authRedirect}
        <Col span={8}>
          <Form autoComplete='off' layout='vertical' className='modal-form'>
            <Form.Item label='Username'>
              {this.props.form.getFieldDecorator('username', {
                rules: [{ required: true, message: usernameRequiredMessage, validator: this.validateUsername }],
              })(
                <Input placeholder='Username' />
              )}
            </Form.Item>
            <Form.Item label='Password'>
              {this.props.form.getFieldDecorator('password', {
                rules: [{ required: true, message: passwordRequiredMessage, validator: this.validatePassword }]
              })(
                <Input type='password' />
              )}
            </Form.Item>
          </Form>
          <Button
            type='primary'
            className='login-button'
            onClick={this.onSubmit}>LOGIN</Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  isAuthentiacted: state.auth.auth !== null,
  adminUsername: state.auth.username,
  adminPassword: state.auth.password,
})

export default connect(mapStateToProps)(Form.create()(LoginPage))
