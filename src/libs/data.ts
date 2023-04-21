import { type ITabBarCommon } from './model'

// main menuData
export const mainMenu: ITabBarCommon[] = [
  { label: '基本信息', value: 0, name: 'MBasicInfo' },
  { label: '学生基本志愿', value: 1, name: 'MStuInfo' },
  { label: '学生志愿信息', value: 2, name: 'MVolunteerInfo' },
  { label: '修改学生信息', value: 3, name: 'MModifyStuInfo' },
  { label: '专业分流设置', value: 4, name: 'MShutSetting' },
  { label: '专业分流结果', value: 5, name: 'MShutRes' },
  { label: '数据中心', value: 6, name: 'MDC' }
]

// adminMenuData
export const adminMenu: ITabBarCommon[] = [
  { label: '基本信息', value: 0, name: 'basicInfo' },
  { label: '学生基本志愿', value: 1, name: 'stuInfo' },
  { label: '数据中心', value: 2, name: 'DC' }
]

export interface ITableData {
  key: number
  major: string
  num: number
}

export interface IRenderValue {
  title: string
  value: string
  label: string
}
