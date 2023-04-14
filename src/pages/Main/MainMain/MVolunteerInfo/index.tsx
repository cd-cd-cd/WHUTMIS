import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Input, Table } from 'antd'
import Column from 'antd/lib/table/Column'

const test = [
  {
    username: '0129903920101',
    name: '测试101',
    sex: '男',
    formalClass: '1999',
    clarify: '工商类9901',
    status: '',
    isInSchool: '',
    basicScore: '15.92',
    extraScore: '0.202',
    totalScore: '16.122'
  },
  {
    username: '0129903920101',
    name: '测试101',
    sex: '男',
    formalClass: '1999',
    clarify: '工商类9901',
    status: '',
    isInSchool: '',
    basicScore: '15.92',
    extraScore: '0.202',
    totalScore: '16.122'
  },
  {
    username: '0129903920101',
    name: '测试101',
    sex: '男',
    formalClass: '1999',
    clarify: '工商类9901',
    status: '',
    isInSchool: '',
    basicScore: '15.92',
    extraScore: '0.202',
    totalScore: '16.122'
  },
  {
    username: '0129903920101',
    name: '测试101',
    sex: '男',
    formalClass: '1999',
    clarify: '工商类9901',
    status: '',
    isInSchool: '',
    basicScore: '15.92',
    extraScore: '0.202',
    totalScore: '16.122'
  },
  {
    username: '0129903920101',
    name: '测试101',
    sex: '男',
    formalClass: '1999',
    clarify: '工商类9901',
    status: '',
    isInSchool: '',
    basicScore: '15.92',
    extraScore: '0.202',
    totalScore: '16.122'
  }
]

const columnDataTest = [
  { title: '学号', key: 'username' },
  { title: '姓名', key: 'name' },
  { title: '性别', key: 'sex' },
  { title: '原班级', key: 'formalClass' },
  { title: '学生类别', key: 'clarify' },
  { title: '学籍状态', key: 'status' },
  { title: '是否在校', key: 'isInSchool' },
  { title: '基础成绩', key: 'basicScore' },
  { title: '加分项', key: 'extraScore' },
  { title: '总成绩', key: 'totalScore' }
]

export default function MVolunteerInfo () {
  const [isAll, seIsAll] = useState(true)
  const [infoList, setInfoList] = useState<any[]>()
  const [columnData, setColumnData] = useState<any[]>([])
  const onSearch = (value: string) => {
    console.log(value)
  }

  const unsubmitted = () => {
    seIsAll(false)
  }

  const allData = () => {
    seIsAll(true)
  }

  useEffect(() => {
    setInfoList(test)
    setColumnData(columnDataTest)
  }, [])
  return (
    <>
    <div className={style.func_box}>
      <div className={style.searchBox}>
        <span className={style.label}>姓名：</span>
        <Input.Search placeholder="请输入学生姓名" allowClear onSearch={onSearch} style={{ width: 200 }} />
      </div>
      <div className={style.out_func}>
        {isAll
          ? <Button onClick={() => unsubmitted()}>未提交名单</Button>
          : <Button type='primary' onClick={() => allData()}>全部名单</Button>
          }
        <Button className={style.outBtn} disabled={isAll}>导出名单</Button>
      </div>
    </div>
    <Table
        dataSource={infoList}
      >
        {
          columnData.map(item => <Column title={item.title} dataIndex={item.key} key={item.key} />)
        }
      </Table>
    </>
  )
}
