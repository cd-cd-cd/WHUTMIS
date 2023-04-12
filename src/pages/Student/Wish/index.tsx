import React from 'react'
import style from './index.module.scss'
import { Col, Row, Select } from 'antd'
export default function Wish () {
  return (
    <div>
      <div className={style.showBoard}>
        <div className={style.title}>志愿选择</div>
        <div className={style.selfInfo}>
          <Row>
            <Col className={style.col} span={8}>成绩：29.498</Col>
            <Col className={style.col} span={8}>附加分：0.3</Col>
            <Col className={style.col} span={8}>总分：29.798</Col>
          </Row>
        </div>
        <div className={style.label}>
          <Row>
            <Col className={style.col} span={8}>专业</Col>
            <Col className={style.col} span={8}>方向</Col>
            <Col className={style.col} span={8}>班级</Col>
          </Row>
        </div>
        <div className={style.major_box}>
          <div className={style.firstLevel}>
            <Row gutter={[8, 8]}>
              <Col span={3} className={style.label}>会计学：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}>大数据会计：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}>大数据会计1：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
              <Col span={3} className={style.label}>大数据会计2：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
              <Col span={3} className={style.label}>管理会计：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
            </Row>
          </div>
          <div className={style.firstLevel}>
            <Row gutter={[8, 8]}>
              <Col span={3} className={style.label}>工商管理：</Col>
              <Col span={5}><Select className={style.select}/></Col>
            </Row>
          </div>
        </div>
        <div className={style.firstLevel}>
            <Row gutter={[8, 8]}>
              <Col span={3} className={style.label}>财务管理：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}>智能财务：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} offset={16} className={style.label}>公司金融：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}>大数据会计2：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
              <Col span={3} className={style.label}>管理会计：</Col>
              <Col span={5}><Select className={style.select}/></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
            </Row>
          </div>
      </div>
      <div>
      </div>
    </div>
  )
}
