import request from '../utils/request'

// 基本信息
export const baseInfo = async (id: string) => {
  return await request<string>({
    url: '/new/student/baseInfo',
    method: 'POST',
    params: {
      id
    }
  })
}

// 修改密码
export const changePasswordApi = async (id: string, password: string) => {
  return await request({
    url: '/new/student/changePassword',
    method: 'POST',
    params: {
      id,
      password
    }
  })
}

// 注销
export const exist = async (id: string) => {
  return await request({
    url: '/new/student/logout',
    method: 'POST',
    params: {
      id
    }
  })
}

// 获取成绩
export const getScore = async (id: string) => {
  return await request<string>({
    url: '/new/student/getScore',
    method: 'POST',
    params: {
      id
    }
  })
}
