import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Col, Row, Select } from 'antd'
import { getScore } from '../../../api/student'
const testData: INode[] = [
  {
    label: '会计学',
    value: 'accountancy',
    children: [
      {
        label: '大数据会计',
        value: 'bigDataAccount',
        children: [
          {
            label: '大数据会计1',
            value: 'one'
          },
          {
            label: '大数据会计1',
            value: 'two'
          }
        ]
      },
      {
        label: '管理会计',
        value: 'managementAccount'
      }
    ]
  },
  {
    label: '工商管理',
    value: 'businessAdministration'
  },
  {
    label: '财务管理',
    value: 'financialManagement',
    children: [
      {
        label: '智能财务',
        value: 'intelligentFinance'
      },
      {
        label: '公司金融',
        value: 'corporateFinance'
      }
    ]
  }
]

interface INode {
  label: string
  value: string
  children?: INode[]
}
export default function Wish () {
  const [infoString, setInfoString] = useState<string>('')
  const render = (data: INode[]) => {
    // eslint-disable-next-line no-unreachable-loop
    for (const temp of data) {
      console.log(temp, data)
      if (temp.children) {
        return <>
          <div>{temp.label}</div>
          <div>{render(temp.children)}</div>
        </>
      } else {
        return <div key={temp.value}>{temp.label}</div>
      }
    }
  }

  const getInfo = async () => {
    const id = localStorage.getItem('username')
    if (id) {
      const res = await getScore(id)
      if (res) {
        setInfoString(res)
      }
    }
  }

  useEffect(() => {
    getInfo()
  }, [])
  return (
    <div>
      <div className={style.showBoard}>
        <div className={style.title}>志愿选择</div>
        <div className={style.selfInfo}>
          <Row>
            {
              infoString.split('    ').slice(0, 3).map(item => <Col key={item} className={style.col} span={8}>{item}</Col>)
            }
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
              <Col span={5}><Select className={style.select} /></Col>
              <Col span={3} className={style.label}>大数据会计：</Col>
              <Col span={5}><Select className={style.select} /></Col>
              <Col span={3} className={style.label}>大数据会计1：</Col>
              <Col span={5}><Select className={style.select} /></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
              <Col span={3} className={style.label}>大数据会计2：</Col>
              <Col span={5}><Select className={style.select} /></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
              <Col span={3} className={style.label}>管理会计：</Col>
              <Col span={5}><Select className={style.select} /></Col>
              <Col span={3} className={style.label}></Col>
              <Col span={5}></Col>
            </Row>
          </div>
          <div className={style.firstLevel}>
            <Row gutter={[8, 8]}>
              <Col span={3} className={style.label}>工商管理：</Col>
              <Col span={5}><Select className={style.select} /></Col>
            </Row>
          </div>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>财务管理：</Col>
            <Col span={5}><Select className={style.select} /></Col>
            <Col span={3} className={style.label}>智能财务：</Col>
            <Col span={5}><Select className={style.select} /></Col>
            <Col span={3} offset={8} className={style.label}>公司金融：</Col>
            <Col span={5}><Select className={style.select} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>人力资源管理：</Col>
            <Col span={5}><Select className={style.select} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>市场营销：</Col>
            <Col span={5}><Select className={style.select} /></Col>
            <Col span={3} className={style.label}>数字营销：</Col>
            <Col span={5}><Select className={style.select} /></Col>
            <Col span={3} offset={8} className={style.label}>产业营销：</Col>
            <Col span={5}><Select className={style.select} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>会计管理：</Col>
            <Col span={5}><Select className={style.select} /></Col>
          </Row>
        </div>
        <div className={style.bottom}>
          <div className={style.warn_text}>提示: 选择志愿后，请点击保存。保存后，如有修改，需再次点击保存。</div>
          <div className={style.btn_box}>
            <Button>保存</Button>
            <Button danger type='primary'>重置</Button>
          </div>
        </div>
      </div>
      <div className={style.showBoard}>
        <div className={style.title}>已保存志愿</div>
        <div className={style.saveBottom}>
          <div className={style.warn_text}>提示:保存志愿后，务必点击提交。未提交志愿的默认服从学院分配。已提交志愿后，不能修改!</div>
          <Button>提交</Button>
        </div>
      </div>
    </div>
  )
}
