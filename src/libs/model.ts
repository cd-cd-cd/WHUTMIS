import { type MenuProps } from 'antd'

export interface ITabBarCommon {
  label: string
  value: number
  name: string
}

// -1（admin） 0(main)  1(stu)
export type IRole = -1 | 0 | 1

export type MenuItem = Required<MenuProps>['items'][number]
