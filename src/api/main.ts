import { type CheckboxValueType } from 'antd/lib/checkbox/Group'
import request from '../utils/request'
import { type RcFile } from 'antd/lib/upload'

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

// 修改学生成绩
export const changeStudentScore = async (studentId: string, baseScore: number, extraScore: number) => {
  return await request({
    url: '/new/main/changeStudentScore',
    method: 'POST',
    params: {
      studentId,
      baseScore,
      extraScore
    }
  })
}

// 取消学生志愿提交
export const repairStudentSubmit = async (studentId: string) => {
  return await request({
    url: '/new/main/repairStudentSubmit',
    method: 'POST',
    params: {
      studentId
    }
  })
}

// 修改系统时间
export const changeSystemTime = async (startTime: string, endTime: string) => {
  return await request({
    url: '/new/main/changeSystemTime',
    method: 'POST',
    params: {
      startTime,
      endTime
    }
  })
}

export interface IResGetTime {
  startTime: string
  endTime: string
}

// 获取系统时间
export const getTime = async () => {
  return await request<IResGetTime>({
    url: '/new/main/getTime',
    method: 'POST'
  })
}

export interface IGetDepartmentInfo {
  departmentName: string
  groupId: number
  studentCount: number
}

// 获取专业与人数信息
export const getDepartmentInfo = async () => {
  return await request<IGetDepartmentInfo[]>({
    url: '/new/main/getDepartmentInfo',
    method: 'POST'
  })
}

// 修改专业人数
export const changeDepartment = async (departmentName: string, studentNumber: number) => {
  return await request({
    url: '/new/main/changeDepartment',
    method: 'POST',
    params: {
      departmentName,
      studentNumber
    }
  })
}

// 学生搜索（整合了页面功能）
export const wishResult = async (studentName: string, page: number, pageLen: number) => {
  return await request<string>({
    url: '/new/main/wishResult',
    method: 'POST',
    params: {
      studentName,
      page,
      pageLen
    }
  })
}

// 获取自选字段
export const getKey = async () => {
  return await request<string[]>({
    url: '/new/main/getKey',
    method: 'POST'
  })
}

// 导出Excel文件
export const outputExcel = async (keyList: CheckboxValueType[]) => {
  return await request<BlobPart>({
    url: '/new/main/outputExcel',
    method: 'POST',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    params: {
      keyList: keyList.join(',')
    }
  })
}

// 上传Excel
export const inputExcel = async (data: FormData) => {
  return await request({
    url: '/new/main/inputExcel',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 专业分流
export const doWishDistribution = async () => {
  return await request({
    url: '/new/main/doWishDistribution',
    method: 'POST'
  })
}

// 关于专业（方向）分流数据分析和可视化（第一志愿人数，录取最高、最低排位）（可选做
export const wishData = async () => {
  return await request<string>({
    url: '/new/main/wishData',
    method: 'POST'
  })
}

// 各个专业（方向）在不同志愿的录取情况分析（可选做
export const admitData = async () => {
  return await request<string>({
    url: '/new/main/admitData',
    method: 'POST'
  })
}

// 数据中心 excel
export const mdcExcel = async () => {
  return await request<BlobPart>({
    url: '/new/main/dataOutputExcel',
    method: 'POST',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}
