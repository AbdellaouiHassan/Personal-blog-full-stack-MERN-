import { useState } from 'react'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router'
import PostForm from './components/PostForm'
import Home from './pages/Home'
import Layouts from './layouts/Layouts'
import PostList from './components/PostList'
import Dashboard from './pages/Dashboard'
import UpdatePost from './pages/UpdatePost'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layouts/>}>
        <Route index element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/add-post' element={<PostForm/>}/>
        <Route path='/posts/:id' element={<PostList/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/edit-post/:id' element={<UpdatePost/>}/>

      </Route>
      
    </Routes>
  )
}

export default App
