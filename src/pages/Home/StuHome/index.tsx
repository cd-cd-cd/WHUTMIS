import React, { useEffect, useState } from 'react'
import stuLogo from '../../../assets/imgs/stu_logo_top.png'
import textLogo from '../../../assets/imgs/text.png'
import logout from '../../../assets/imgs/logout.png'
import style from './index.module.scss'
import { Menu, message, type MenuProps } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { exist, getStudentTime } from '../../../api/student'
import { type IStudentTime } from '../../../libs/model'

export default function StuHome () {
  const [current, setCurrent] = useState('home')
  const navigator = useNavigate()
  const [time, setTime] = useState<IStudentTime>()
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
    } else {
      navigator('/studentLogin')
    }
  }

  const getTime = async () => {
    const res = await getStudentTime()
    if (res) {
      setTime(res)
    }
  }
  useEffect(() => {
    navigator(`/student/${current}`)
  }, [current])

  useEffect(() => {
    getTime()
  }, [])
  return (
    <div className={style.back}>
      <header className={style.header}>
        <div className={style.top}>
          <div className={style.logout_text}></div>
          <img src={logout} className={style.logoutIcon} onClick={() => logoutApi()}></img>
        </div>
        <div className={style.logo_box}>
          <img src={stuLogo} className={style.logo}></img>
          <img src={textLogo} className={style.textLogo}></img>
        </div>
        <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal" items={items} />
        <div className={style.warnText}>{`(请注意，志愿申请的时间为： ${time?.startTime.replace('.0', '')} ---- ${time?.endTime.replace('.0', '')})`}</div>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
