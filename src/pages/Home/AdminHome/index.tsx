import React from 'react'
import Home from '../../../components/Home'
import { adminMenu } from '../../../libs/data'

export default function MainHome () {
  return (
    <>
      <Home role={-1} menuData={adminMenu}></Home>
    </>
  )
}
