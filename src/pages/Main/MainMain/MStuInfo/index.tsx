import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Input, Table, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { stuBasicInfo } from '../../../../api/main'
import Column from 'antd/lib/table/Column'
import { type IColumnData, type IStuBasicInfo } from '../../../../libs/model'

export default function MStuInfo () {
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [stuName, setStuName] = useState('')
  const [infoList, setInfoList] = useState<any[]>()
  const [columnData, setColumnData] = useState<IColumnData[]>([])
  const onSearch = async (value: string) => {
    setCurrent(1)
    setPageSize(20)
    setStuName(value.trim())
  }

  const getBasicInfos = async () => {
    setLoading(true)
    const res = await stuBasicInfo(stuName, current, pageSize)
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

  const initClick = () => {
    setStuName('')
  }

  useEffect(() => {
    getBasicInfos()
  }, [pageSize, current, stuName])
  return (
    <div>
      <div className={style.func_box}>
        <div className={style.searchBox}>
          <span className={style.label}>姓名：</span>
          <Input.Search placeholder="请输入学生姓名" allowClear onSearch={onSearch} style={{ width: 200 }} />
          <Button onClick={() => initClick()}>返回</Button>
        </div>
        <div className={style.file_func}>
          <Upload
            showUploadList={false}
            // beforeUpload={beforeUpload}
            accept='.excel'
            customRequest={() => { }}
          >
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
          <Button>立即上传</Button>
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
    </div>
  )
}
