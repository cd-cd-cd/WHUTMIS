import React from 'react'
import { mainMenu } from '../../../libs/data'
import Home from '../../../components/Home'

export default function MainHome () {
  return (
    <>
      <Home role={0} menuData={mainMenu}></Home>
    </>
  )
}
