import React, { useEffect, useState } from 'react'
import LoginTopImg from '../../assets/imgs/log_top.jpg'
import LoginBottomImg from '../../assets/imgs/login_foot.jpg'
import style from './index.module.scss'
import { Button, Form, Input } from 'antd'
import { getCaptcha } from '../../api/common/login'
interface Props {
  title: string
  loginApi: (
    username: string,
    password: string,
    key: string,
    code: string
  ) => void
}

interface IValue {
  username: string
  password: string
  identifyCode: string
}
export default function Login ({ title, loginApi }: Props) {
  const [form] = Form.useForm()
  const [captchaImg, setCaptchaImg] = useState<string>('')
  const [key, setKey] = useState<string>('')

  const loginClick = async (values: IValue) => {
    const res = await loginApi(values.username, values.password, key, values.identifyCode)
  }

  // 得到验证码
  const getIdentifyCode = async () => {
    const res = await getCaptcha()
    if (res) {
      setCaptchaImg(res?.captchaImg)
      setKey(res.key)
    }
  }

  useEffect(() => {
    getIdentifyCode()
  }, [])
  return (
    <div className={style.back}>
      <img src={LoginTopImg} className={style.topImg}></img>
      <div className={style.middle}>
        <div className={style.left_box}>
          <div className={style.topTitle}>管理学院专业分流系统</div>
          <div className={style.bottomTitle}>{title}</div>
        </div>
        <div className={style.right_box}>
          <div className={style.form_box}>
            <Form
              onFinish={loginClick}
              form={form}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
            >
              <Form.Item
                label='用户名'
                name='username'
                rules={[
                  { required: true, message: '用户名不为空' }
                ]}
              >
                <Input placeholder='请输入用户名'></Input>
              </Form.Item>
              <Form.Item
                label='密码'
                name='password'
                rules={[
                  { required: true, message: '密码不为空' },
                  { min: 6, max: 20, message: '长度为6-20位' }
                ]}
              >
                <Input placeholder='请输入密码'></Input>
              </Form.Item>
              <Form.Item
                label='验证码'
                name='identifyCode'
                rules={[
                  { required: true, message: '验证码不为空' }
                ]}
              >
                <Input placeholder='请输入验证码'></Input>
              </Form.Item>
              <Form.Item
              >
                <div className={style.identify_box}>
                  <img src={captchaImg} className={style.img_box}></img>
                  <a onClick={() => getIdentifyCode()}>刷新</a>
                </div>
              </Form.Item>
                <div className={style.btn_box}>
                  <Button type="primary" htmlType="submit">
                    确认
                  </Button>
                  <Button htmlType="button" onClick={() => form.resetFields()}>
                    取消
                  </Button>
                </div>
            </Form>
          </div>
        </div>
      </div>
      <img src={LoginBottomImg} className={style.bottom}></img>
    </div>
  )
}
