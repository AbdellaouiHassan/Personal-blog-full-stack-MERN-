import { useState } from 'react'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router'
import PostForm from './components/PostForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/posts/add' element={<PostForm/>}/>
    </Routes>
  )
}

export default App
