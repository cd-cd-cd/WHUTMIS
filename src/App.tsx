import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/Login/MainLogin'
import SuperLogin from './pages/Login/AdminLogin'
import StudentLogin from './pages/Login/StudentLogin'
import MainHome from './pages/Home/MainHome'

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
        <Route path='main' element={<MainHome/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
