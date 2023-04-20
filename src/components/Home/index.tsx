import React, { useContext, useEffect } from 'react'
import style from './index.module.scss'
import { Menu, message, type MenuProps } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import TabBar from '../TabBar'
import useMenu from '../../hooks/useMenu'
import useTabBar from '../../hooks/useTabBar'
import { context } from '../../hooks/store'
import HeaderLeftIcon from '../../assets/imgs/admin_top.png'
import LogoutIcon from '../../assets/imgs/logout.png'
import { type IRole, type ITabBarCommon } from '../../libs/model'

interface Props {
  role: IRole
  menuData: ITabBarCommon[]
  logoutApi: (id: string | null) => Promise<unknown>
}
export default function Home ({ role, menuData, logoutApi }: Props) {
  const navigator = useNavigate()
  const { returnMenuData, onClickMenu } = useMenu()
  const { addTabBar } = useTabBar()
  const { tabBarId } = useContext(context)

  // 根据tabBarId增加
  const onClick: MenuProps['onClick'] = e => {
    const index = Number(e.key)
    onClickMenu(index, menuData)
  }

  const logoutClick = async () => {
    const id = localStorage.getItem('id')
    const res = await logoutApi(id)
    // Because of no response to judge
    if (typeof res !== 'undefined') {
      message.success('退出成功')
      if (role === 0) {
        navigator('/mainLogin')
      } else if (role === -1) {
        navigator('/adminLogin')
      } else {
        navigator('/404')
      }
      localStorage.clear()
    }
  }

  useEffect(() => {
    addTabBar(menuData[0])
  }, [])

  useEffect(() => {
    const path = menuData[tabBarId]
    if (role === 0) {
      navigator(`/main/${path.name}`)
    } else if (role === -1) {
      navigator(`/admin/${path.name}`)
    }
  }, [tabBarId])
  return (
    <div className={style.back}>
      <header className={style.header}>
        <img src={HeaderLeftIcon} className={style.leftIcon}></img>
        <div className={style.rightBox}>
          <img src={LogoutIcon} className={style.logoutIcon} onClick={() => logoutClick()}></img>
          <div className={style.logoutText} onClick={() => logoutClick()}>注销</div>
        </div>
      </header>
      <main className={style.middle}>
        <aside className={style.aside}>
          <Menu
            onClick={onClick}
            style={{ width: 230 }}
            selectedKeys={[tabBarId.toString()]}
            mode="vertical"
            theme="light"
            items={returnMenuData(menuData)}
          />
        </aside>
        <div className={style.right}>
          <TabBar></TabBar>
          <Outlet />
        </div>
      </main>
      <footer className={style.footer}>版权所有 © 武汉理工大学管理学院 地址：湖北省武汉市洪山区</footer>
    </div>
  )
}
