import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Layouts = () => {
  return (
    <>
    <NavBar/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default Layouts