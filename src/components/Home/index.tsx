import React, { useContext, useEffect } from 'react'
import style from './index.module.scss'
import { Menu, type MenuProps } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import TabBar from '../TabBar'
import useMenu from '../../hooks/useMenu'
import useTabBar from '../../hooks/useTabBar'
import { context } from '../../hooks/store'
import HeaderLeftIcon from '../../assets/imgs/admin_top.png'
import LogoutIcon from '../../assets/imgs/logout.png'
import { type IRole } from '../../libs/data'

interface Props {
  role: IRole
  menuData: ITabBarCommon[]
}
export default function Home ({ role, menuData }: Props) {
  const navigator = useNavigate()
  const { returnMenuData, onClickMenu } = useMenu()
  const { addTabBar } = useTabBar()
  const { tabBarId } = useContext(context)

  // 根据tabBarId增加
  const onClick: MenuProps['onClick'] = e => {
    const index = Number(e.key)
    onClickMenu(index, menuData)
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
          <img src={LogoutIcon} className={style.logoutIcon}></img>
          <div className={style.logoutText}>注销</div>
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
