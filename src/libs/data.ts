import { type ITabBarCommon } from './model'

// main menuData
export const mainMenu: ITabBarCommon[] = [
  { label: '基本信息', value: 0, name: 'MBasicInfo' },
  { label: '学生基本志愿', value: 1, name: 'MStuInfo' },
  { label: '学生志愿信息', value: 2, name: 'MVolunteerInfo' },
  { label: '修改学生信息', value: 3, name: 'MModifyStuInfo' },
  { label: '专业分流设置', value: 4, name: 'MShutSetting' },
  { label: '专业分流结果', value: 5, name: 'MShutRes' }
]

// adminMenuData
export const adminMenu: ITabBarCommon[] = [
  { label: '基本信息', value: 0, name: 'basicInfo' },
  { label: '学生基本志愿', value: 1, name: 'stuInfo' }
]

export interface ITableData {
  key: number
  major: string
  num: number
}

export const majorTableData: ITableData[] = [
  { key: 0, major: '信管', num: 40 },
  { key: 1, major: '信管', num: 40 },
  { key: 2, major: '信管', num: 40 },
  { key: 3, major: '信管', num: 40 },
  { key: 4, major: '信管', num: 40 }
]
