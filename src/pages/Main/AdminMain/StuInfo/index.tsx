import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Input, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { type IStuBasicInfo } from '../../../../libs/model'
import { getNotSubmitList, studentBaseInfo } from '../../../../api/admin'
import Mask from '../../../../components/Mask'

export default function StuInfo () {
  const [loading, setLoading] = useState(false)
  const [isMask, setIsMask] = useState(false)
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [isAll, seIsAll] = useState(true)
  const [stuName, setStuName] = useState('')
  const [showName, setShowName] = useState('')
  const [infoList, setInfoList] = useState<any[]>()
  const [columnData, setColumnData] = useState<any[]>([])

  // 初始化pagination
  const initPagination = () => {
    setCurrent(1)
    setPageSize(20)
  }

  // 搜索显示该学生名单
  const onSearch = (value: string) => {
    seIsAll(true)
    initPagination()
    setStuName(value.trim())
  }

  // 点击未提交名单/提交名单 清除搜索学生操作
  const clearSearchBtn = () => {
    onSearch('')
    setShowName('')
    initPagination()
  }

  // 点击显示未提交名单
  const unsubmitted = () => {
    clearSearchBtn()
    seIsAll(false)
  }

  // 点击显示全部名单
  const allData = () => {
    clearSearchBtn()
    seIsAll(true)
  }

  // 导出未提交名单
  const clickOutput = async () => {
    setIsMask(true)
    const res = await getNotSubmitList()
    if (res) {
      const a = document.createElement('a')
      const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      const url = URL.createObjectURL(blob)
      a.setAttribute('href', url)
      a.setAttribute('download', '未提交名单')
      a.click()
    }
    setIsMask(false)
  }

  // 得到infoList
  const getBasicInfos = async () => {
    setLoading(true)
    const res = await studentBaseInfo(stuName, !isAll, current, pageSize)
    if (res) {
      // 注意后端传的是json string 而且需要将‘ 转为 “ 否则会报错
      const temp: IStuBasicInfo = JSON.parse(res.replace(/'/g, '"'))
      setInfoList(temp.columnList)
      setColumnData(temp.columnData)
      setTotal(temp.total)
      setLoading(false)
    }
  }

  const paginationProps = {
    pageSize,
    current,
    total,
    onShowSizeChange: (current: number, pageSize: number) => {
      setCurrent(current)
      setPageSize(pageSize)
    },
    onChange: (pageNum: number) => {
      setCurrent(pageNum)
    }
  }

  useEffect(() => {
    getBasicInfos()
  }, [stuName, current, pageSize, isAll])
  return (
    <>
    {
      isMask ? <Mask></Mask> : ''
    }
    <div className={style.func_box}>
      <div className={style.searchBox}>
        <span className={style.label}>姓名：</span>
        <Input.Search value={showName} onChange={(e) => setShowName(e.target.value)} placeholder="请输入学生姓名" allowClear onSearch={onSearch} style={{ width: 200 }} />
        {
          !isAll
            ? <Button onClick={() => allData()}>点击显示全部名单</Button>
            : ''
        }
      </div>
      <div className={style.out_func}>
        {isAll
          ? <Button onClick={() => unsubmitted()}>点击显示未提交名单</Button>
          : ''
        }
        <Button className={style.outBtn} disabled={isAll} onClick={() => clickOutput()}>导出未提交名单</Button>
      </div>
    </div>
    <div className={style.height}>
        <Table
          loading={loading}
          dataSource={infoList}
          pagination={paginationProps}
        >
          {
            columnData.map(item => <Column title={item.title} dataIndex={item.key} key={item.key} />)
          }
        </Table>
      </div>
    </>
  )
}
