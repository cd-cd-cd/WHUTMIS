import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Input, Table, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { type IColumnData, stuBasicInfo } from '../../../../api/main'
import Column from 'antd/lib/table/Column'

export default function MStuInfo () {
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [infoList, setInfoList] = useState<any[]>()
  const [columnData, setColumnData] = useState<IColumnData[]>([])
  const onSearch = (value: string) => {
    console.log(value)
  }

  const getBasicInfos = async () => {
    const res = await stuBasicInfo('', current, pageSize)
    if (res) {
      setInfoList(res.columnList)
      setColumnData(res.columnData)
      setTotal(res.total)
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
  }, [pageSize, current])
  return (
    <div>
      <div className={style.func_box}>
        <div className={style.searchBox}>
          <span className={style.label}>姓名：</span>
          <Input.Search placeholder="请输入学生姓名" allowClear onSearch={onSearch} style={{ width: 200 }} />
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
