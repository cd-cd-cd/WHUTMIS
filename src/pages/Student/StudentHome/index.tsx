import React, { useState } from 'react'
import style from './index.module.scss'
import { Button, Descriptions, Input } from 'antd'
import useValidator from '../../../hooks/useValidator'

export default function StudentHome () {
  const [password, setPassword] = useState('')
  const { mainPasswordValidator } = useValidator()
  const changePassword = () => {
    if (mainPasswordValidator(password)) {
      console.log('yes')
    }
  }
  return (
    <div>
      <div className={style.showBoard}>
        <div className={style.title}>基本信息</div>
        <Descriptions column={2} title={null} className={style.info}>
          <Descriptions.Item label="姓名">测试524</Descriptions.Item>
          <Descriptions.Item label="性别">男</Descriptions.Item>
          <Descriptions.Item label="年级">1999级</Descriptions.Item>
          <Descriptions.Item label="学号">0129903920524</Descriptions.Item>
          <Descriptions.Item label="班级">工商类9901</Descriptions.Item>
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
