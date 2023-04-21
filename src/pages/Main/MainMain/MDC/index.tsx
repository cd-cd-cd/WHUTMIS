import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { admitData, wishData } from '../../../../api/main'
import { type IStuBasicInfo } from '../../../../libs/model'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'

export default function MDC () {
  const [dataAdmit, setDataAdmit] = useState<IStuBasicInfo>()
  const [dataWish, setDataWish] = useState<IStuBasicInfo>()
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const getWishData = async () => {
    setLoading2(true)
    const res = await wishData()
    if (res) {
      setDataWish(JSON.parse(res.replace(/'/g, '"')))
      setLoading2(false)
    }
  }

  const getAdmitData = async () => {
    setLoading1(true)
    const res = await admitData()
    if (res) {
      const temp: IStuBasicInfo = JSON.parse(res.replace(/'/g, '"'))
      setDataAdmit(temp)
      setLoading1(false)
    }
  }

  useEffect(() => {
    getWishData()
    getAdmitData()
  }, [])
  return (
    <div className={style.height}>
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
