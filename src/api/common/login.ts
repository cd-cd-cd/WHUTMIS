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

// 学生登录
export const studentLogin = async (
  username: string,
  password: string,
  key: string,
  code: string
) => {
  return await request({
    url: '/student/login',
    method: 'POST',
    data: {
      username,
      password,
      key,
      code
    }
  })
}

// 普通管理员登录
export const adminLogin = async (
  username: string,
  password: string,
  key: string,
  code: string) => {
  return await request({
    url: '/admin/login',
    method: 'POST',
    data: {
      username,
      password,
      key,
      code
    }
  })
}

// 主管理员登录
export const mainLogin = async (
  username: string,
  password: string,
  key: string,
  code: string) => {
  return await request({
    url: '/main/login',
    method: 'POST',
    data: {
      username,
      password,
      key,
      code
    }
  })
}
