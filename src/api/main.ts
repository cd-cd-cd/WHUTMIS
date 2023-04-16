import request from '../utils/request'

// 设置本账号新密码
export const changePassword = async (data: FormData) => {
  return await request({
    url: '/new/main/changePassword',
    method: 'POST',
    data
  })
}

// 重置学生密码
export const resetStuPassword = async (username: string) => {
  const data = new FormData()
  data.append('studentId', username)
  return await request({
    url: '/new/main/repairStudentPassword',
    method: 'POST',
    data
  })
}

// 删除学生学号
export const deleteStudent = async (deleteUsername: string) => {
  const data = new FormData()
  data.append('studentId', deleteUsername)
  return await request({
    url: '/new/main/deleteStudent',
    method: 'POST',
    data
  })
}

// 搜索学生功能（集成页面功能）
export const stuBasicInfo = async (studentName: string, page: number, pageLen: number) => {
  return await request<string>({
    url: '/new/main/studentBaseInfo',
    method: 'POST',
    params: {
      studentName,
      page,
      pageLen
    }
  })
}

// 学生搜索（搜索、页面、未提交名单是同一个入口
export const studentWishInfo = async (studentName: string, isNotSubmit: boolean, page: number, pageLen: number) => {
  return await request<string>({
    url: '/new/main/studentWishInfo',
    method: 'POST',
    params: {
      studentName,
      isNotSubmit,
      page,
      pageLen
    }
  })
}
