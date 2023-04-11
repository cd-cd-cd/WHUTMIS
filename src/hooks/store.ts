import { createContext } from 'react'

interface StoreContext {
  // tabBar
  tabBarList: ITabBarCommon[]
  setTabBarList: (tabBar: ITabBarCommon[]) => void

  // tabBarId
  tabBarId: number
  setTabBarId: (id: number) => void
}

const context = createContext<StoreContext>({
  tabBarList: [],
  setTabBarList: () => {},
  tabBarId: 0,
  setTabBarId: () => {}
})

const StoreProvider = context.Provider

export { context, StoreProvider }
