import { type IStudentTime } from '../libs/model'
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

// 专业志愿获取（只有专业信息用来选择志愿
export const getWishInfo = async () => {
  return await request<string>({
    url: '/new/student/getWishInfo',
    method: 'POST'
  })
}

// 获取系统时间
export const getStudentTime = async () => {
  return await request<IStudentTime>({
    url: '/new/student/getTime',
    method: 'POST'
  })
}

// 保存志愿
export const saveWish = async (id: string, wish: string) => {
  return await request({
    url: '/new/student/saveWish',
    method: 'POST',
    params: {
      id,
      wish
    }
  })
}

// 已保存志愿获取
export const getSaveWish = async (id: string) => {
  return await request<string>({
    url: '/new/student/getSaveWish',
    method: 'POST',
    params: {
      id
    }
  })
}

// 提交志愿
export const submit = async (id: string) => {
  return await request({
    url: '/new/student/submit',
    method: 'POST',
    params: {
      id
    }
  })
}

// 获取提交状态
export const getSubmitState = async (id: string) => {
  return await request<string>({
    url: '/new/student/getSubmitState',
    method: 'POST',
    params: {
      id
    }
  })
}
