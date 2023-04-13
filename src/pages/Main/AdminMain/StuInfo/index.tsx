import React, { useState } from 'react'
import style from './index.module.scss'
import { Button, Input } from 'antd'

export default function StuInfo () {
  const [isAll, seIsAll] = useState(true)
  const onSearch = (value: string) => {
    console.log(value)
  }

  const unsubmitted = () => {
    seIsAll(false)
  }

  const allData = () => {
    seIsAll(true)
  }
  return (
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
  )
}
