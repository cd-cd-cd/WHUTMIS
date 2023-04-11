import React from 'react'
import style from './index.module.scss'
import { Button, DatePicker } from 'antd'

export default function MShutSetting () {
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
          </div>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.title_text}>专业设置</div>
      </div>
    </div>
  )
}
