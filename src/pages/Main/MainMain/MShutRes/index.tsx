import { Button, Input } from 'antd'
import React from 'react'
import style from './index.module.scss'

export default function MShutRes () {
  const onSearch = (value: string) => {
    console.log(value)
  }
  return (
    <div className={style.func_box}>
      <div className={style.searchBox}>
        <span className={style.label}>姓名：</span>
        <Input.Search placeholder="请输入学生姓名" allowClear onSearch={onSearch} style={{ width: 200 }} />
      </div>
      <div className={style.out_func}>
        <Button>导出EXCEL文件</Button>
      </div>
    </div>
  )
}
