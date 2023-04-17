import { Button, Input, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { type IStuBasicInfo, type IColumnData } from '../../../../libs/model'
import Column from 'antd/lib/table/Column'
import { getKey, wishResult } from '../../../../api/main'

export default function MShutRes () {
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [stuName, setStuName] = useState('')
  const [infoList, setInfoList] = useState<any[]>()
  const [columnData, setColumnData] = useState<IColumnData[]>([])
  const [isModal, setIsModal] = useState(false)
  const onSearch = async (value: string) => {
    setCurrent(1)
    setPageSize(20)
    setStuName(value.trim())
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

  const getInfos = async () => {
    setLoading(true)
    const res = await wishResult(stuName, current, pageSize)
    if (res) {
      // 注意后端传的是json string 而且需要将‘ 转为 “ 否则会报错
      const temp: IStuBasicInfo = JSON.parse(res.replace(/'/g, '"'))
      setInfoList(temp.columnList)
      setColumnData(temp.columnData)
      setTotal(temp.total)
      setLoading(false)
    }
  }

  const initClick = () => {
    setStuName('')
  }

  const clickOpenModal = async () => {
    setIsModal(true)
    // const res = await getKey()
    // if (res) {
    //   console.log(res)
    // }
  }

  const closeModal = () => {
    setIsModal(false)
  }

  useEffect(() => {
    getInfos()
  }, [pageSize, current, stuName])
  return (
    <>
      <div className={style.func_box}>
        <div className={style.searchBox}>
          <span className={style.label}>姓名：</span>
          <Input.Search placeholder="请输入学生姓名" allowClear onSearch={onSearch} style={{ width: 200 }} />
          <Button onClick={() => initClick()}>返回</Button>
        </div>
        <div className={style.out_func}>
          <Button onClick={() => clickOpenModal()}>导出EXCEL文件</Button>
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
      <Modal open={isModal} onCancel={() => closeModal()}>
      </Modal>
    </>
  )
}
