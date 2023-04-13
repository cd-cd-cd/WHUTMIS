import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Input, Modal, message } from 'antd'
import useValidator from '../../../../hooks/useValidator'
import { changePassword, deleteStudent, resetStuPassword } from '../../../../api/main'
import { useNavigate } from 'react-router-dom'

export default function MBasicInfo () {
  const navigator = useNavigate()
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
        if (typeof res !== 'undefined') {
          message.success('密码修改成功!请重新登录')
          localStorage.clear()
          navigator('/mainLogin')
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
  const deleteStu = async () => {
    const res = await deleteStudent(deleteUsername)
    setIsModalOpen(false)
    if (typeof res !== 'undefined') {
      message.success('该学号学生已删除')
      setDeleteUsername('')
    }
  }

  // 重置学生密码
  const initStuPassword = async () => {
    const res = await resetStuPassword(username)
    if (typeof res !== 'undefined') {
      message.success('学生密码重置成功')
      setUsername('')
    }
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
            <Button onClick={() => initStuPassword()}>初始化密码</Button>
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
        确定删除{deleteUsername}学号学生吗？
      </Modal>
    </div>
  )
}
