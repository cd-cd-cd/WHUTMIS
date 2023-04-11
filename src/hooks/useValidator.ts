import { message } from 'antd'

export default function useValidator () {
  // 验证main修改密码
  const mainPasswordValidator = (password: string) => {
    const length = password.length
    if (length === 0) {
      message.error('密码不为空')
      return false
    } else if (length < 6 || length > 20) {
      message.error('密码6-20位，可以容纳大小写字母、数字、特殊字符(.@#$%^&*)')
      return false
    } else {
      return true
    }
  }

  // 验证main 初始化学生学号/删除学生学号
  const mainStuUsernameValidator = (username: string) => {
    if (username.length === 0) {
      message.error('学号不为空')
      return false
    }
    return true
  }
  return {
    mainPasswordValidator,
    mainStuUsernameValidator
  }
}
