import request from '../utils/request'

interface IGetSelfInfo {
  id: string
  password: string
  username: string
}

// 得到admin基本信息
export const getSelfInfo = async (id: string) => {
  return await request<IGetSelfInfo>({
    url: `/admin/${id}`,
    method: 'GET'
  })
}

// 设置管理员密码
export const changePassword = async (id: string, password: string) => {
  return await request({
    url: '/new/admin/changePassword',
    method: 'POST',
    params: {
      id,
      password
    }
  })
}

// 重置学生密码
export const repairStudentPassword = async (studentId: string) => {
  return await request({
    url: '/new/admin/repairStudentPassword',
    method: 'POST',
    params: {
      studentId
    }
  })
}

// 学生搜索（搜索、页面、未提交名单是同一个入口
export const studentBaseInfo = async (studentName: string, isNotSubmit: boolean, page: number, pageLen: number) => {
  return await request<string>({
    url: '/new/admin/studentBaseInfo',
    method: 'POST',
    params: {
      studentName,
      isNotSubmit,
      page,
      pageLen
    }
  })
}

// 未提交名单增加导出功能（字段的确认
export const getNotSubmitList = async () => {
  return await request<BlobPart>({
    url: '/new/admin/getNotSubmitList',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    method: 'POST'
  })
}
