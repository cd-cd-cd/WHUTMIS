import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Image, Input, Modal, Table, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import excelImg from '../../../../assets/imgs/excel.png'
import { inputExcel, stuBasicInfo } from '../../../../api/main'
import Column from 'antd/lib/table/Column'
import { type IColumnData, type IStuBasicInfo } from '../../../../libs/model'
import { type RcFile } from 'antd/lib/upload'
import { useNavigate } from 'react-router-dom'

export default function MStuInfo () {
  const [file, setFile] = useState<RcFile>()
  const [isModal, setIsModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [stuName, setStuName] = useState('')
  const [infoList, setInfoList] = useState<any[]>()
  const [columnData, setColumnData] = useState<IColumnData[]>([])
  const navigator = useNavigate()
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

  const closeModal = () => {
    setIsModal(false)
    setFile(undefined)
  }

  const initClick = () => {
    setStuName('')
  }

  const beforeUpload = (file: RcFile) => {
    const isTypeTrue = file.type === 'application/vnd.ms-excel'
    if (!isTypeTrue) {
      message.error(`${file.name} 文件只能为xls格式`)
    } else {
      setFile(file)
    }
    return isTypeTrue
  }

  const clickInputExcel = async () => {
    if (file) {
      const data = new FormData()
      data.append('excel', file)
      const res = await inputExcel(data)
      if (typeof res !== 'undefined') {
        if (res) {
          message.info(res as string)
        }
        closeModal()
        setCurrent(1)
        setPageSize(20)
      }
    } else {
      message.info('请上传文件')
    }
  }

  useEffect(() => {
    getBasicInfos()
  }, [pageSize, current, stuName])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigator('/mainLogin')
    }
  }, [])
  return (
    <div>
      <div className={style.func_box}>
        <div className={style.searchBox}>
          <span className={style.label}>姓名：</span>
          <Input.Search placeholder="请输入学生姓名" allowClear onSearch={onSearch} style={{ width: 200 }} />
          <Button onClick={() => initClick()}>返回</Button>
        </div>
        <div className={style.file_func}>
          <Button onClick={() => setIsModal(true)}>选择文件上传</Button>
        </div>
      </div>
      <Modal
      title='上传excel文件'
      width={500}
      open={isModal}
      onOk={() => clickInputExcel()}
      onCancel={() => closeModal()}
      >
        <Image src={excelImg} width={450}></Image>
        <div className={style.modalText}>提示1：上传excel表格第一行为列名，请严格按照列名填写学生信息</div>
        <div className={style.modalText}>提示2：请上传xls格式文件</div>
        <div className={style.uploadline}>
        <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            accept='.xls'
            customRequest={() => { }}
          >
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
          <span className={style.fileName}>{file?.name}</span>
          </div>
      </Modal>
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
