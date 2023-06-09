import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Input, message } from 'antd'
import { changePassword, getSelfInfo, repairStudentPassword } from '../../../../api/admin'
import { useNavigate } from 'react-router-dom'

export default function BasicInfo () {
  const navigator = useNavigate()
  // 保存修改密码
  const [password, setPassword] = useState<string>()
  // 保存老师姓名
  const [name, setName] = useState<string>()

  // 保存学生学号
  const [username, setUsername] = useState('')

  // 修改管理员密码
  const changePasswordClick = async () => {
    const id = localStorage.getItem('id')
    if (id && password) {
      const res = await changePassword(id, password)
      if (typeof res !== 'undefined') {
        message.success('密码修改成功!请重新登录')
        setPassword('')
        localStorage.clear()
        navigator('/adminLogin')
      }
    } else if (!password) {
      message.info('密码不为空')
    }
  }

  // 基本信息
  const getSelf = async () => {
    const id = localStorage.getItem('id')
    if (id) {
      const res = await getSelfInfo(id)
      setName(res?.username)
    }
  }

  // 初始化学生密码
  const initStuPassword = async () => {
    if (username) {
      const res = await repairStudentPassword(username)
      if (typeof res !== 'undefined') {
        message.success('该学生密码初始化成功')
        setUsername('')
      }
    } else {
      message.info('学号不为空')
    }
  }

  useEffect(() => {
    getSelf()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigator('/adminLogin')
    }
  }, [])
  return (
    <div className={style.back}>
      <div className={style.box}>
        <div className={style.title_text}>设置管理员密码</div>
        <div className={style.main}>
          <div className={style.basicInfo}>欢迎您, {name}</div>
          <div className={style.funBox}>
            <span>设置新密码：</span>
            <Input.Password
              className={style.passwordInput}
              placeholder='请输入密码'
              onChange={(e) => setPassword(e.target.value.trim())}
              value={password}
            ></Input.Password>
            <Button onClick={() => changePasswordClick()}>确定</Button>
            <span className={style.text}>6-20位，可以容纳大小写字母、数字、特殊字符(.@#$%^&*)</span>
          </div>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.title_text}>设置学生密码</div>
        <div className={style.main}>
          <div className={style.funBox}>
            <span>学号：</span>
            <Input
              className={style.Input}
              placeholder='请输入学号'
              onChange={(e) => setUsername(e.target.value.trim())}
              value={username}
            ></Input>
            <Button onClick={() => initStuPassword()}>初始化密码</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
