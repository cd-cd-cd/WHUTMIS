import React, { type ReactNode, useEffect, useState } from 'react'
import './index.css'
import style from './index.module.scss'
import { Button, Card, Col, List, Row, Select, TreeSelect, message } from 'antd'
import { getSaveWish, getScore, getSubmitState, getWishInfo, saveWish, submit } from '../../../api/student'
import { type IGetWhish } from '../../../libs/model'
import { useNavigate } from 'react-router-dom'
import { type IMajorRank, majorRank, type IMajorNode, MajorData, accountantDirectionRank, financialDirectionRank, marketDirectionRank, classRank } from '../../../libs/data'

interface IRenderSaveWish {
  title: string
  value: string
}
export default function Wish () {
  const [getWish, setGetWish] = useState<IGetWhish>()
  const [majorData, setMajorData] = useState<IMajorNode[]>(MajorData)
  const [saveWishInfo, setSaveWishInfo] = useState<IRenderSaveWish[]>([])
  const navigator = useNavigate()

  // 改变专业select
  const changeMajorSelect = (value: number, label: string) => {
    setMajorData(majorData.map(item => {
      if (item.label === label) {
        item.value = value
      }
      return item
    }))
    majorRank.forEach((ele) => {
      ele.disabled = false
      majorData.forEach((element) => {
        if (ele.value === element.value) {
          ele.disabled = true
        }
      })
    })
  }

  // 改变方向
  const changeDirectionSelect = (value: number, label: string, rank: IMajorRank[], position: IMajorNode[]) => {
    setMajorData(majorData.map(firstItem => {
      if (firstItem.children) {
        firstItem.children.map(item => {
          if (item.label === label) {
            item.value = value
          }
          return item
        })
      }
      return firstItem
    }))
    rank.forEach((ele) => {
      ele.disabled = false
      if (ele.value === position[0].value || ele.value === position[1].value) {
        ele.disabled = true
      }
    })
  }

  // 改变班级
  const changeClassSelect = (value: number, label: string, rank: IMajorRank[], position: IMajorNode[]) => {
    setMajorData(majorData.map(firstItem => {
      if (firstItem.children) {
        firstItem.children.map(secondItem => {
          if (secondItem.children) {
            secondItem.children.map(item => {
              if (item.label === label) {
                item.value = value
              }
              return item
            })
          }
          return secondItem
        })
      }
      return firstItem
    }))
    rank.forEach((ele) => {
      ele.disabled = false
      if (ele.value === position[0].value || ele.value === position[1].value) {
        ele.disabled = true
      }
    })
  }

  const resetOption = (rank: IMajorRank[]) => {
    rank.map(item => {
      item.disabled = false
      return item
    })
  }

  // 重置
  const reset = () => {
    setMajorData(majorData.map(firstItem => {
      firstItem.value = null
      if (firstItem.children) {
        firstItem.children.map(secondItem => {
          secondItem.value = null
          if (secondItem.children) {
            secondItem.children.map(thirdItem => {
              thirdItem.value = null
              return thirdItem
            })
          }
          return secondItem
        })
      }
      return firstItem
    }))

    resetOption(majorRank)
    resetOption(accountantDirectionRank)
    resetOption(financialDirectionRank)
    resetOption(marketDirectionRank)
    resetOption(classRank)
  }

  // 保存检查
  const checkData = () => {
    for (const firstItem of majorData) {
      if (!firstItem.value) {
        return false
      }
      if (firstItem.children) {
        for (const secondItem of firstItem.children) {
          if (!secondItem.value) {
            return false
          }
          if (secondItem.children) {
            for (const thirdItem of secondItem.children) {
              if (!thirdItem.value) {
                return false
              }
            }
          }
        }
      }
    }
    return true
  }

  // 排序
  const sort = () => {
    const temp: string[] = []
    const newData: IMajorNode[] = JSON.parse(JSON.stringify(majorData))
    newData.sort(function (a, b) {
      return a.value! - b.value!
    })
    newData.forEach(firstItem => {
      if (firstItem.children) {
        firstItem.children.forEach(secondItem => {
          if (secondItem.children) {
            secondItem.children.sort(function (a, b) {
              return a.value! - b.value!
            })
          }
        })
        firstItem.children.sort(function (a, b) {
          return a.value! - b.value!
        })
      }
    })
    newData.forEach(firstItem => {
      if (firstItem.children) {
        firstItem.children.forEach(secondItem => {
          if (secondItem.children) {
            secondItem.children.forEach(thirdItem => temp.push(thirdItem.label))
          } else {
            temp.push(secondItem.label)
          }
        })
      } else {
        temp.push(firstItem.label)
      }
    })
    return temp
  }

  // 保存
  const save = () => {
    if (checkData()) {
      const arr = sort()
    } else {
      message.info('志愿请填写完全')
    }
  }

  const getWishInfoClick = async () => {
    const res = await getWishInfo()
    if (res) {
      const temp = res.replace(/'/g, '"')
      setGetWish(JSON.parse(temp))
    }
  }

  const submitClick = async () => {
    const id = localStorage.getItem('username')
    if (id) {
      const res = await submit(id)
      if (typeof res !== 'undefined') {
        message.success('提交成功')
        getSaveWishClick()
      }
    }
  }

  const getSaveWishClick = async () => {
    const id = localStorage.getItem('username')
    if (id) {
      const res = await getSaveWish(id)
      if (res) {
        const temp = res.split(',').reduce((pre: IRenderSaveWish[], cur, index) => {
          pre.push({
            title: `第${index + 1}志愿`,
            value: cur
          })
          return pre
        }, [])
        const res2 = await getSubmitState(id)
        if (res2) {
          temp.push({ title: '是否提交', value: res2 })
          setSaveWishInfo(temp)
        }
      }
    }
  }

  useEffect(() => {
    getWishInfoClick()
    getSaveWishClick()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigator('/studentLogin')
    }
  }, [])
  return (
    <div>
      <div className={style.showBoard}>
        <div className={style.title}>志愿选择</div>
        <Row>
          <Col span={8} className={style.nav_col}>专业</Col>
          <Col span={8} className={style.nav_col}>方向</Col>
          <Col span={8} className={style.nav_col}>班级</Col>
        </Row>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>会计学：</Col>
            <Col span={5}><Select className={style.select} options={majorRank} placeholder='请选择专业志愿' value={majorData[0].value} onChange={(value) => changeMajorSelect(value, '会计学')} /></Col>
            <Col span={3} className={style.label}>大数据会计：</Col>
            <Col span={5}><Select className={style.select} options={accountantDirectionRank} placeholder='请选择方向志愿' value={(majorData[0].children)![0].value} onChange={(value) => changeDirectionSelect(value, '大数据会计', accountantDirectionRank, majorData[0].children!)} /></Col>
            <Col span={3} className={style.label}>大数据会计1：</Col>
            <Col span={5}><Select className={style.select} options={classRank} placeholder='请选择班级' value={((majorData[0].children)![0].children)![0].value} onChange={(value) => changeClassSelect(value, '大数据会计1', classRank, (majorData[0].children)![0].children!)} /></Col>
            <Col span={3} className={style.label} offset={16}>大数据会计2：</Col>
            <Col span={5}><Select className={style.select} options={classRank} placeholder='请选择班级' value={((majorData[0].children)![0].children)![1].value} onChange={(value) => changeClassSelect(value, '大数据会计2', classRank, (majorData[0].children)![0].children!)} /></Col>
            <Col span={3} className={style.label} offset={8} >管理会计：</Col>
            <Col span={5}><Select className={style.select} options={accountantDirectionRank} placeholder='请选择方向志愿' value={(majorData[0].children)![1].value} onChange={(value) => changeDirectionSelect(value, '管理会计', accountantDirectionRank, majorData[0].children!)} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>工商管理：</Col>
            <Col span={5}><Select className={style.select} options={majorRank} placeholder='请选择专业志愿' value={majorData[1].value} onChange={(value) => changeMajorSelect(value, '工商管理')} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>财务管理：</Col>
            <Col span={5}><Select className={style.select} options={majorRank} placeholder='请选择专业志愿' value={majorData[2].value} onChange={(value) => changeMajorSelect(value, '财务管理')} /></Col>
            <Col span={3} className={style.label}>智能财务：</Col>
            <Col span={5}><Select className={style.select} options={financialDirectionRank} placeholder='请选择方向志愿' value={(majorData[2].children)![0].value} onChange={(value) => changeDirectionSelect(value, '智能财务', financialDirectionRank, majorData[2].children!)} /></Col>
            <Col span={3} offset={8} className={style.label}>公司金融：</Col>
            <Col span={5}><Select className={style.select} options={financialDirectionRank} placeholder='请选择方向志愿' value={(majorData[2].children)![1].value} onChange={(value) => changeDirectionSelect(value, '公司金融', financialDirectionRank, majorData[2].children!)} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>会计ACCA：</Col>
            <Col span={5}><Select className={style.select} value={majorData[3].value} options={majorRank} placeholder='请选择专业志愿' onChange={(value) => changeMajorSelect(value, '会计ACCA')} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>市场营销: </Col>
            <Col span={5}><Select className={style.select} options={majorRank} placeholder='请选择专业志愿' value={majorData[4].value} onChange={(value) => changeMajorSelect(value, '市场营销')} /></Col>
            <Col span={3} className={style.label}>数字营销：</Col>
            <Col span={5}><Select className={style.select} options={marketDirectionRank} placeholder='请选择方向志愿' value={(majorData[4].children)![0].value} onChange={(value) => changeDirectionSelect(value, '数字营销', marketDirectionRank, majorData[4].children!)} /></Col>
            <Col span={3} offset={8} className={style.label}>产业营销：</Col>
            <Col span={5}><Select className={style.select} options={marketDirectionRank} placeholder='请选择方向志愿' value={(majorData[4].children)![1].value} onChange={(value) => changeDirectionSelect(value, '产业营销', marketDirectionRank, majorData[4].children!)} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>人力资源管理：</Col>
            <Col span={5}><Select className={style.select} options={majorRank} placeholder='请选择专业志愿' value={majorData[5].value} onChange={(value) => changeMajorSelect(value, '人力资源管理')} /></Col>
          </Row>
        </div>
        <div className={style.firstLevel}>
          <Row gutter={[8, 8]}>
            <Col span={3} className={style.label}>创业管理</Col>
            <Col span={5}><Select className={style.select} options={majorRank} placeholder='请选择专业志愿' value={majorData[6].value} onChange={(value) => changeMajorSelect(value, '创业管理')} /></Col>
          </Row>
        </div>
        <div className={style.bottom}>
          <div className={style.warn_text}>提示: 选择志愿后，请点击保存。保存后，如有修改，需再次点击保存。</div>
          <div className={style.btn_box}>
            <Button onClick={() => save()}>保存</Button>
            <Button danger type='primary' onClick={() => reset()}>重置</Button>
          </div>
        </div>
      </div>
      <div className={style.showBoard}>
        <div className={style.title}>已保存志愿</div>
        <div className={style.saveBottom}>
          {
            saveWishInfo.length
              ? <div className={style.showBox}>
                <List
                  grid={{ gutter: 0, column: getWish?.BaseCount ? getWish.BaseCount + 1 : 0 }}
                  dataSource={saveWishInfo}
                  renderItem={item => (
                    <List.Item className={style.listItem}>
                      <Card title={item.title}>{item.value}</Card>
                    </List.Item>
                  )}
                />
              </div>
              : ''
          }
          <div className={style.warn_text}>提示:保存志愿后，务必点击提交。未提交志愿的默认服从学院分配。已提交志愿后，不能修改!</div>
          <Button onClick={() => submitClick()}>提交</Button>
        </div>
      </div>
    </div>
  )
}
