import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'


const Layout = ({children}) => {
  return (

    <div className="flex h-screen">
      <Sidebar /> 
      <div className="flex flex-col flex-grow">
        <Navbar/>
        <div className="ml-16 flex-grow overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>

  )
}

export default Layout
