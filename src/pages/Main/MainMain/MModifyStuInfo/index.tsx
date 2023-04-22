import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Form, Input, InputNumber, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { changeStudentScore, repairStudentSubmit } from '../../../../api/main'
import { useNavigate } from 'react-router-dom'
interface IChangeScore {
  studentId: string
  baseScore: number
  extraScore: number
}
export default function MModifyStuInfo () {
  const [form] = useForm()
  const navigator = useNavigate()
  // 记录取消学生志愿提交
  const [username, setUsername] = useState('')

  const changeScore = async (values: IChangeScore) => {
    const res = await changeStudentScore(values.studentId, values.baseScore, values.extraScore)
    if (typeof res !== 'undefined') {
      message.success('学生成绩修改成功')
      form.resetFields()
    }
  }

  const cancelWish = async () => {
    if (!username) {
      message.info('学号不为空')
    } else {
      const res = await repairStudentSubmit(username.trim())
      if (typeof res !== 'undefined') {
        message.success('取消志愿成功')
        setUsername('')
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigator('/mainLogin')
    }
  }, [])
  return (
    <div className={style.back}>
      <div className={style.box}>
        <div className={style.title_text}>设置学生成绩</div>
        <div className={style.main}>
          <div className={style.funBox}>
            <Form
              onFinish={changeScore}
              form={form}
              labelAlign='left'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label='学生学号'
                name='studentId'
                rules={[
                  { required: true, message: '学生学号不为空' }
                ]}
              >
                <Input className={style.input} placeholder='请输入学生学号'></Input>
              </Form.Item>
              <Form.Item
                label='基本分'
                name='baseScore'
                rules={[
                  { required: true, message: '基本分不为空' }
                ]}
              >
                <InputNumber className={style.input} placeholder='请输入基本分'></InputNumber>
              </Form.Item>
              <Form.Item
                label='额外分'
                name='extraScore'
                rules={[
                  { required: true, message: '额外分不为空' }
                ]}
              >
                <InputNumber className={style.input} placeholder='请输入额外分'></InputNumber>
              </Form.Item>
              <div className={style.btn_box}>
              <Button htmlType="submit" className={style.submitBtn}>
                确定修改
              </Button>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                取消修改
              </Button>
            </div>
            </Form>
          </div>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.title_text}>取消学生志愿提交</div>
        <div className={style.main}>
          <div className={style.funBox}>
            <span>学生学号：</span>
            <Input
              className={style.Input}
              placeholder='请输入学生学号'
              onChange={(e) => setUsername(e.target.value.trim())}
              value={username}
            ></Input>
            <Button onClick={() => cancelWish()}>确定</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
