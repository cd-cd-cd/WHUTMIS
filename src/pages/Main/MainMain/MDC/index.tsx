import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { admitData, mdcExcel, wishData } from '../../../../api/main'
import { type IStuBasicInfo } from '../../../../libs/model'
import { Button, Table, message } from 'antd'
import Column from 'antd/lib/table/Column'
import useExcel from '../../../../hooks/useExcel'
import { useNavigate } from 'react-router-dom'

export default function MDC () {
  const [dataAdmit, setDataAdmit] = useState<IStuBasicInfo>()
  const [dataWish, setDataWish] = useState<IStuBasicInfo>()
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const { outputFileExcel } = useExcel()
  const navigator = useNavigate()

  const getWishData = async () => {
    setLoading2(true)
    const res = await wishData()
    if (res) {
      setDataWish(JSON.parse(res.replace(/'/g, '"')))
    }
    setLoading2(false)
  }

  const getAdmitData = async () => {
    setLoading1(true)
    const res = await admitData()
    if (res) {
      const temp: IStuBasicInfo = JSON.parse(res.replace(/'/g, '"'))
      setDataAdmit(temp)
    }
    setLoading1(false)
  }

  const outPut = async () => {
    setLoading1(true)
    setLoading2(true)
    const res = await mdcExcel()
    console.log(res)
    if (res) {
      outputFileExcel(res, '数据中心')
    }
    setLoading1(false)
    setLoading2(false)
  }

  useEffect(() => {
    getWishData()
    getAdmitData()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigator('/mainLogin')
    }
  }, [])
  return (
    <div className={style.height}>
      <Button className={style.btn} onClick={() => outPut()}>输出EXCEL</Button>
      <Table
        className={style.table1}
        loading={loading2}
        dataSource={dataWish?.columnList}
        pagination={false}
      >
        {
          dataWish?.columnData.map(item => <Column title={item.title} dataIndex={item.key} key={item.key} />)
        }
      </Table>
      <Table
        className={style.table1}
        loading={loading1}
        dataSource={dataAdmit?.columnList}
        pagination={false}
      >
        {
          dataAdmit?.columnData.map(item => <Column title={item.title} dataIndex={item.key} key={item.key} />)
        }
      </Table>
    </div>
  )
}
