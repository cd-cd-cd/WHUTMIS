import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/Login/MainLogin'
import SuperLogin from './pages/Login/AdminLogin'
import StudentLogin from './pages/Login/StudentLogin'
import MainHome from './pages/Home/MainHome'
import MBasicInfo from './pages/Main/MainMain/MBasicInfo'
import MStuInfo from './pages/Main/MainMain/MStuInfo'
import MVolunteerInfo from './pages/Main/MainMain/MVolunteerInfo'
import MModifyStuInfo from './pages/Main/MainMain/MModifyStuInfo'
import MShutSetting from './pages/Main/MainMain/MShutSetting'
import MShutRes from './pages/Main/MainMain/MShutRes'
import { StoreProvider } from './hooks/store'
import AdminHome from './pages/Home/AdminHome'
import BasicInfo from './pages/Main/AdminMain/BasicInfo'
import StuInfo from './pages/Main/AdminMain/StuInfo'
import Unknown from './pages/Unknow'
import StuHome from './pages/Home/StuHome'
import StudentHome from './pages/Student/StudentHome'
import Wish from './pages/Student/Wish'
import { type ITabBarCommon } from './libs/model'
import MDC from './pages/Main/MainMain/MDC'
import DC from './pages/Main/AdminMain/DC'

function App () {
  const [tabBarList, setTabBarList] = useState<ITabBarCommon[]>([])
  const [tabBarId, setTabBarId] = useState(0)
  useEffect(() => {
    document.title = '武汉理工大学专业分流系统'
  }, [])
  return (
    <StoreProvider
    value={{
      tabBarList,
      setTabBarList,
      tabBarId,
      setTabBarId
    }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/mainLogin' element={<AdminLogin />}></Route>
          <Route path='/adminLogin' element={<SuperLogin />}></Route>
          <Route path='/studentLogin' element={<StudentLogin />}></Route>
          <Route path='main' element={<MainHome />}>
            <Route path='MBasicInfo' element={<MBasicInfo />}></Route>
            <Route path='MStuInfo' element={<MStuInfo />}></Route>
            <Route path='MVolunteerInfo' element={<MVolunteerInfo />}></Route>
            <Route path='MModifyStuInfo' element={<MModifyStuInfo />}></Route>
            <Route path='MShutSetting' element={<MShutSetting />}></Route>
            <Route path='MShutRes' element={<MShutRes />}></Route>
            <Route path='MDC' element={<MDC/>}></Route>
          </Route>
          <Route path='admin' element={<AdminHome/>}>
            <Route path='basicInfo' element={<BasicInfo/>}></Route>
            <Route path='stuInfo' element={<StuInfo/>}></Route>
            <Route path='DC' element={<DC/>}></Route>
          </Route>
          <Route path='student' element={<StuHome/>}>
            <Route path='home' element={<StudentHome/>}></Route>
            <Route path='wish' element={<Wish/>}></Route>
          </Route>
          <Route path='/404' element={<Unknown/>}></Route>
        </Routes>
        </BrowserRouter>
    </StoreProvider>
  )
}

export default App
