import { context } from './store'
import { useContext } from 'react'
import useTabBar from './useTabBar'
import { type MenuItem, type ITabBarCommon } from '../libs/model'

export default function useMenu () {
  const { setTabBarId } = useContext(context)
  const { addTabBar } = useTabBar()
  // 处理数据
  const returnMenuData = (menuData: ITabBarCommon[]) => {
    return menuData.map(item => getItem(item.label, item.value))
  }

  // 根据tabBarId增加
  const onClickMenu = (index: number, menuData: ITabBarCommon[]) => {
    addTabBar(menuData[index])
    setTabBarId(menuData[index].value)
  }

  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    theme?: 'light' | 'dark'
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      theme
    } as MenuItem
  }
  return {
    getItem,
    returnMenuData,
    onClickMenu
  }
}
