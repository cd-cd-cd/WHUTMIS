import React, { useEffect, useState } from 'react'
import stuLogo from '../../../assets/imgs/stu_logo_top.png'
import textLogo from '../../../assets/imgs/text.png'
import logout from '../../../assets/imgs/logout.png'
import style from './index.module.scss'
import { Menu, message, type MenuProps } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { exist } from '../../../api/student'

export default function StuHome () {
  const [current, setCurrent] = useState('home')
  const navigator = useNavigate()
  const items: MenuProps['items'] = [
    {
      label: '首页',
      key: 'home'
    },
    {
      label: '志愿选择',
      key: 'wish'
    }
  ]

  const logoutApi = async () => {
    const id = localStorage.getItem('username')
    if (id) {
      const res = await exist(id)
      if (typeof res !== 'undefined') {
        message.success('退出成功')
        localStorage.clear()
        navigator('/studentLogin')
      }
    }
  }
  useEffect(() => {
    navigator(`/student/${current}`)
  }, [current])
  return (
    <div className={style.back}>
      <header className={style.header}>
        <div className={style.top}>
          <div className={style.logout_text}>测试524</div>
          <img src={logout} className={style.logoutIcon} onClick={() => logoutApi()}></img>
        </div>
        <div className={style.logo_box}>
          <img src={stuLogo} className={style.logo}></img>
          <img src={textLogo} className={style.textLogo}></img>
        </div>
        <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal" items={items} />
        <div className={style.warnText}>(请注意，志愿申请的时间为： 2022-04-26 22:11:16 ---- 2022-04-30 22:10:43)</div>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
