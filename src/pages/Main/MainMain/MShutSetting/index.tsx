import React, { useState } from 'react'
import style from './index.module.scss'
import { Button, DatePicker, InputNumber, Modal, Table } from 'antd'
import { type ITableData, majorTableData } from '../../../../libs/data'
import Column from 'antd/lib/table/Column'

export default function MShutSetting () {
  const [editMajorInfo, setEditMajorInfo] = useState<ITableData>()
  const [editNumber, setEditNumber] = useState<number | null>()
  const [isModal, setIsModal] = useState(false)
  const clickEditBtn = (record: ITableData) => {
    setEditMajorInfo(record)
    setIsModal(true)
  }

  // 关闭窗口
  const cancelModal = () => {
    setEditNumber(null)
    setIsModal(false)
  }
  return (
    <div className={style.back}>
      <div className={style.box}>
        <div className={style.title_text}>开始分流</div>
        <div className={style.main}>
          <div className={style.funBox}>
            <Button>专业分流</Button>
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
            />
            <Button className={style.time_btn}>确定</Button>
          </div>
          <div className={style.warn_time_text}>(志愿申请设置的时间为： 2022-04-26 22:11:16 ---- 2022-04-30 22:10:43)</div>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.title_text}>专业设置</div>
        <Table
          className={style.table}
          dataSource={majorTableData}
          pagination={false}
        >
          <Column title="专业" align='center' dataIndex="major" key="major" />
          <Column title="人数" align='center' dataIndex="num" key="num" />
          <Column title="操作" align='center' render={(_: any, record: ITableData) => <a onClick={() => clickEditBtn(record)}>编辑</a>} />
        </Table>
      </div>
      <Modal title={editMajorInfo?.major} open={isModal} onCancel={() => cancelModal()}>
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
