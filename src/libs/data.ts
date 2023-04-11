import { type MenuProps } from 'antd'

// -1（admin） 0(main)  1(stu)
export type IRole = -1 | 0 | 1

export type MenuItem = Required<MenuProps>['items'][number]

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
