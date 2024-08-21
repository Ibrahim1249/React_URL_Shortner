import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function AppLayout() {
  return (
   <>
     <main>
         <Header />
        <Outlet />
        <Footer />
     </main>
   </>
  )
}

export default AppLayout