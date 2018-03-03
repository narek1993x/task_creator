import React from 'react'
import { connect } from 'react-redux'
import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar'

import './Layout.css'

const Layout = props => {
  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthentiacted} />
      <main className='content'>
        {props.children}
      </main>
    </Aux>
  )
}


const mapStateToProps = state => ({
  isAuthentiacted: state.auth.auth !== null
})

export default connect(mapStateToProps)(Layout)
