import React from 'react'
import Aux from '../Aux/Aux'

import classes from './Layout.css'

const Layout = props => {
  return (
    <Aux>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}


export default Layout
