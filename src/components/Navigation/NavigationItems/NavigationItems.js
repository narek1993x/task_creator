import React from 'react'

import './NavigationItems.css'
import NavigationItem from './NavigationItem'

const navigationItems = props => (
  <ul className='navigationItems' >
    <NavigationItem link='/' exact>Task Table</NavigationItem>
    {!props.isAuthenticated 
      ? <NavigationItem link='/login'>Login</NavigationItem>
      : <NavigationItem link='/logout'>Logout</NavigationItem>}
  </ul>
)

export default navigationItems