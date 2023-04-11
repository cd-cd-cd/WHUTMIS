import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Input, Modal } from 'antd'
import useValidator from '../../../../hooks/useValidator'
import { changePassword } from '../../../../api/main'

export default function MBasicInfo () {
  const { mainPasswordValidator, mainStuUsernameValidator } = useValidator()
  // 删除提醒
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 保存修改密码
  const [password, setPassword] = useState('')
  // 保存学生学号
  const [username, setUsername] = useState('')
  // 删除学生学号
  const [deleteUsername, setDeleteUsername] = useState('')
  const changePasswordClick = async () => {
    if (mainPasswordValidator(password)) {
      const id = localStorage.getItem('id')
      if (id) {
        const data = new FormData()
        data.append('id', id)
        data.append('password', password)
        const res = await changePassword(data)
        if (res) {
          console.log(res)
        }
      }
    }
  }

  // 点击删除按钮
  const deleteClick = () => {
    if (mainStuUsernameValidator(deleteUsername)) {
      setIsModalOpen(true)
    }
  }

  // 删除学号
  const deleteStu = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={style.back}>
      <div className={style.box}>
        <div className={style.title_text}>设置管理员密码</div>
        <div className={style.main}>
          <div className={style.basicInfo}>欢迎您，主管理员</div>
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
            <Button>初始化密码</Button>
          </div>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.title_text}>删除学生学号</div>
        <div className={style.main}>
          <div className={style.funBox}>
            <span>学号：</span>
            <Input
              className={style.Input}
              placeholder='请输入学号'
              onChange={(e) => setDeleteUsername(e.target.value.trim())}
              value={deleteUsername}
            ></Input>
            <Button onClick={() => deleteClick()}>点击删除</Button>
          </div>
        </div>
      </div>
      <Modal title="提醒" open={isModalOpen} onOk={() => deleteStu()} onCancel={() => setIsModalOpen(false)}>
        确定删除该学号学生吗？
      </Modal>
    </div>
  )
}
