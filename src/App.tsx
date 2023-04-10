import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import SuperLogin from './pages/SuperLogin'
import StudentLogin from './pages/StudentLogin'

function App () {
  useEffect(() => {
    document.title = '武汉理工大学专业分流系统'
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/mainLogin' element={<AdminLogin />}></Route>
        <Route path='/adminLogin' element={<SuperLogin />}></Route>
        <Route path='/studentLogin' element={<StudentLogin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
