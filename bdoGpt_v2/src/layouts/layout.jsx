import React from 'react'
import Sidebar from '../components/sidebar'

const Layout = ({children}) => {
  return (
    <div>
      <Sidebar /> 
    {children}
    </div>
  )
}

export default Layout
