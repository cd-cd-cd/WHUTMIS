import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, DatePicker, InputNumber, Modal, Table, message } from 'antd'
import Column from 'antd/lib/table/Column'
import { type IResGetTime, getTime, changeSystemTime, getDepartmentInfo, type IGetDepartmentInfo, changeDepartment, doWishDistribution } from '../../../../api/main'
import { type RangePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import Mask from '../../../../components/Mask'

export default function MShutSetting () {
  const [maskLoading, setMaskLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editMajorInfo, setEditMajorInfo] = useState<IGetDepartmentInfo>()
  const [editNumber, setEditNumber] = useState<number | null>()
  const [isModal, setIsModal] = useState(false)
  const [showTime, setShowTime] = useState<IResGetTime>()
  const [time, setTime] = useState<RangePickerProps['value']>()
  const [tableInfo, setTableInfo] = useState<IGetDepartmentInfo[]>([])
  const clickEditBtn = (record: IGetDepartmentInfo) => {
    setEditMajorInfo(record)
    setIsModal(true)
  }

  // 关闭窗口
  const cancelModal = () => {
    setEditNumber(null)
    setEditMajorInfo(undefined)
    setIsModal(false)
  }

  // 获取时间
  const getTimeClick = async () => {
    const res = await getTime()
    setShowTime(res)
  }

  const onChange = (
    value: RangePickerProps['value'],
    _: any
  ) => {
    setTime(value)
  }

  const changeTime = async () => {
    if (!time?.[0] || !time[1]) {
      message.info('时间不为空')
    } else {
      const res = await changeSystemTime(dayjs(time?.[0]?.toDate()).format('YYYY-MM-DD HH:mm:ss'), dayjs(time?.[1]?.toDate()).format('YYYY-MM-DD HH:mm:ss'))
      if (typeof res !== 'undefined') {
        message.success('时间修改成功')
        getTimeClick()
        setTime(undefined)
      }
    }
  }

  const departmentInfo = async () => {
    setLoading(true)
    const res = await getDepartmentInfo()
    if (res) {
      setTableInfo(res)
      setLoading(false)
    }
  }

  const changeNum = async () => {
    if (editMajorInfo && editNumber) {
      const res = await changeDepartment(editMajorInfo.departmentName, editNumber)
      if (typeof res !== 'undefined') {
        setIsModal(false)
        departmentInfo()
        message.success('专业人数修改成功')
        setEditNumber(null)
        setEditMajorInfo(undefined)
      }
    } else if (!editNumber) {
      message.info('人数不为空')
    }
  }

  const wishDistributionClick = async () => {
    setMaskLoading(true)
    const res = await doWishDistribution()
    if (typeof res !== 'undefined') {
      message.success('分流成功')
      setMaskLoading(false)
    }
  }

  useEffect(() => {
    getTimeClick()
    departmentInfo()
  }, [])
  return (
    <div className={style.back}>
      <div className={style.box}>
        <div className={style.title_text}>开始分流</div>
        <div className={style.main}>
          {
            maskLoading ? <Mask /> : ''
          }
          <div className={style.funBox}>
            <Button onClick={() => wishDistributionClick()}>专业分流</Button>
            <span className={style.warnText}>提示：时间截止学生填写完毕后，再点击此按钮进行专业分流</span>
          </div>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.title_text}>申请时间设置</div>
        <div className={style.main}>
          <div className={style.funBox}>
            <span className={style.timeLabel}>选择时间：</span>
            <DatePicker.RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              onChange={onChange}
              value={time}
            />
            <Button className={style.time_btn} onClick={() => changeTime()}>确定</Button>
          </div>
          <div className={style.warn_time_text}>(志愿申请设置的时间为： {showTime?.startTime.replace('.0', '')} ---- {showTime?.endTime.replace('.0', '')})</div>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.title_text}>专业设置</div>
        <Table
          loading={loading}
          className={style.table}
          dataSource={tableInfo}
          pagination={false}
        >
          <Column title="专业" align='center' dataIndex="departmentName" key="departmentName" />
          <Column title="人数" align='center' dataIndex="studentCount" key="studentCount" />
          <Column title="操作" align='center' render={(_: any, record: IGetDepartmentInfo) => <a onClick={() => clickEditBtn(record)}>编辑</a>} />
        </Table>
      </div>
      <Modal title={editMajorInfo?.departmentName} onOk={() => changeNum()} open={isModal} onCancel={() => cancelModal()}>
        <div className={style.modalText}>请输入人数</div>
        <InputNumber
          min={1}
          className={style.numberInput}
          onChange={(e) => setEditNumber(e)}
          value={editNumber}
        ></InputNumber>
      </Modal>
    </div>
  )
}
