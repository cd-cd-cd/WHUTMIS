import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Input } from 'antd'
import { getSelfInfo } from '../../../../api/admin'

export default function BasicInfo () {
  // 保存修改密码
  const [password, setPassword] = useState<string>()
  // 保存老师姓名
  const [name, setName] = useState<string>()

  // 保存学生学号
  const [username, setUsername] = useState('')

  // 修改管理员密码
  const changePasswordClick = () => {
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
  const initStuPassword = () => {

  }

  useEffect(() => {
    getSelf()
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
