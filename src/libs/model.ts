import { type MenuProps } from 'antd'

export interface ITabBarCommon {
  label: string
  value: number
  name: string
}

// -1（admin） 0(main)  1(stu)
export type IRole = -1 | 0 | 1

export type MenuItem = Required<MenuProps>['items'][number]

export interface IColumnData {
  title: string
  key: string
}

export interface IStuBasicInfo {
  total: number
  columnList: any[]
  columnData: IColumnData[]
}

interface INode {
  value: string
  title: string
  disabled?: boolean
  children?: INode[]
}

export interface IGetWhish {
  BaseCount: number
  wishTree: INode[]
}

export interface IStudentTime {
  startTime: string
  endTime: string
}
