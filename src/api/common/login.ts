import request from '../../utils/request'

interface IResCaptcha {
  captchaImg: string
  key: string
}
// 获取验证码
export const getCaptcha = async () => {
  return await request<IResCaptcha>({
    url: '/captcha',
    method: 'GET'
  })
}

// 主管理员登录
export const mainLogin = async (data: FormData) => {
  return await request<string>({
    url: '/main/login',
    method: 'POST',
    data
  })
}

// 普通管理员登录
export const adminLogin = async (data: FormData) => {
  return await request<string>({
    url: '/admin/login',
    method: 'POST',
    data
  })
}

// 学生登录
export const studentLogin = async (data: FormData) => {
  return await request<string>({
    url: '/student/login',
    method: 'POST',
    data
  })
}
