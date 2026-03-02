import React from 'react'
import UserAuth from '../../components/UserAuth'
import Header from '../../components/Header'
import UserSidebar from '../../components/UserSidebar'

const homepage = () => {
  return (<>
      <Header />
      <div className="flex">
        <UserSidebar />
        <div className="p-4">WELCOME TO DASHBOARD</div>
      </div>  
  </>)
}

export default homepage
