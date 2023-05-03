import { type ITabBarCommon } from './model'

// main menuData
export const mainMenu: ITabBarCommon[] = [
  { label: '基本信息', value: 0, name: 'MBasicInfo' },
  { label: '学生基本信息', value: 1, name: 'MStuInfo' },
  { label: '学生志愿信息', value: 2, name: 'MVolunteerInfo' },
  { label: '修改学生信息', value: 3, name: 'MModifyStuInfo' },
  { label: '专业分流设置', value: 4, name: 'MShutSetting' },
  { label: '专业分流结果', value: 5, name: 'MShutRes' },
  { label: '数据中心', value: 6, name: 'MDC' }
]

// adminMenuData
export const adminMenu: ITabBarCommon[] = [
  { label: '基本信息', value: 0, name: 'basicInfo' },
  { label: '学生基本信息', value: 1, name: 'stuInfo' },
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

export interface IMajorRank {
  value: number
  label: string
  disabled: boolean
}

export const majorRank: IMajorRank[] = [
  {
    value: 1,
    label: '第一志愿',
    disabled: false
  },
  {
    value: 2,
    label: '第二志愿',
    disabled: false
  },
  {
    value: 3,
    label: '第三志愿',
    disabled: false
  },
  {
    value: 4,
    label: '第四志愿',
    disabled: false
  },
  {
    value: 5,
    label: '第五志愿',
    disabled: false
  },
  {
    value: 6,
    label: '第六志愿',
    disabled: false
  },
  {
    value: 7,
    label: '第七志愿',
    disabled: false
  }
]

export const accountantDirectionRank: IMajorRank[] = [
  {
    value: 1,
    label: '会计学第一方向',
    disabled: false
  },
  {
    value: 2,
    label: '会计学第二方向',
    disabled: false
  }
]

export const financialDirectionRank: IMajorRank[] = [
  {
    value: 1,
    label: '财务管理第一方向',
    disabled: false
  },
  {
    value: 2,
    label: '财务管理第二方向',
    disabled: false
  }
]

export const marketDirectionRank: IMajorRank[] = [
  {
    value: 1,
    label: '市场营销第一方向',
    disabled: false
  },
  {
    value: 2,
    label: '市场营销第二方向',
    disabled: false
  }
]

export const classRank: IMajorRank[] = [
  {
    value: 1,
    label: '大数据会计第一班级',
    disabled: false
  },
  {
    value: 2,
    label: '大数据会计第二班级',
    disabled: false
  }
]

export interface IMajorNode {
  value: number | null
  label: string
  children?: IMajorNode[]
}

export const MajorData: IMajorNode[] = [
  {
    value: null,
    label: '会计学',
    children: [
      {
        value: null,
        label: '大数据会计',
        children: [
          {
            label: '大数据会计1',
            value: null
          },
          {
            label: '大数据会计2',
            value: null
          }
        ]
      },
      {
        label: '管理会计',
        value: null
      }
    ]
  },
  {
    label: '工商管理',
    value: null
  },
  {
    label: '财务管理',
    value: null,
    children: [
      {
        label: '智能财务',
        value: null
      },
      {
        label: '公司金融',
        value: null
      }
    ]
  },
  {
    label: '会计ACCA',
    value: null
  },
  {
    label: '市场营销',
    value: null,
    children: [
      {
        label: '数字营销',
        value: null
      },
      {
        label: '产业营销',
        value: null
      }
    ]
  },
  {
    label: '人力资源管理',
    value: null
  },
  {
    label: '创业管理',
    value: null
  }
]
