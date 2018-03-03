import React from 'react'

import './Toolbar.css'
import NavigationItems from '../NavigationItems'

const toolbar = props => (
  <header className='toolbar'>
    <nav>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
)

export default toolbar