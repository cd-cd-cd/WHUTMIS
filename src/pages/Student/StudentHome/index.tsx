import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Descriptions, Input, message } from 'antd'
import useValidator from '../../../hooks/useValidator'
import { baseInfo, changePasswordApi } from '../../../api/student'
import { useNavigate } from 'react-router-dom'

export default function StudentHome () {
  const [password, setPassword] = useState('')
  const [infoString, setInfoString] = useState('')
  const { mainPasswordValidator } = useValidator()
  const navigator = useNavigate()

  const changePassword = async () => {
    if (mainPasswordValidator(password)) {
      const id = localStorage.getItem('username')
      if (id && password) {
        const res = await changePasswordApi(id, password)
        if (typeof res !== 'undefined') {
          message.success('密码修改成功')
          setPassword('')
        }
      }
    }
  }

  const getBaseInfo = async () => {
    const id = localStorage.getItem('username')
    if (id) {
      const res = await baseInfo(id)
      if (res) {
        setInfoString(res)
      }
    }
  }

  useEffect(() => {
    getBaseInfo()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigator('/studentLogin')
    }
  }, [])
  return (
    <div>
      <div className={style.showBoard}>
        <div className={style.title}>基本信息</div>
        <Descriptions column={2} title={null} className={style.info}>
          {
            infoString.split('\n').map(item => <Descriptions.Item key={item}>{item}</Descriptions.Item>)
          }
        </Descriptions>
      </div>
      <div className={style.showBoard}>
        <div className={style.title}>修改密码</div>
        <div className={style.func_box}>
          <span>设置新密码：</span>
          <Input
            className={style.changePasswordInput}
            placeholder='请输入新密码'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button onClick={() => changePassword()}>确认</Button>
        </div>
      </div>
    </div>
  )
}
