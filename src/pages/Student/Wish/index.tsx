import React, { type ReactNode, useEffect, useState } from 'react'
import './index.css'
import style from './index.module.scss'
import { Button, Card, Col, List, Row, TreeSelect, message } from 'antd'
import { getSaveWish, getScore, getSubmitState, getWishInfo, saveWish, submit } from '../../../api/student'
import { DownOutlined } from '@ant-design/icons'
import { type IRenderValue } from '../../../libs/data'
import { type IGetWhish } from '../../../libs/model'

interface IRenderSaveWish {
  title: string
  value: string
}
export default function Wish () {
  const [infoString, setInfoString] = useState<string>('')
  const [value, setValue] = useState<string>()
  const [list, setList] = useState<React.ReactNode[]>()
  const [renderValue, setRenderValue] = useState<IRenderValue[]>([])
  const [getWish, setGetWish] = useState<IGetWhish>()
  const [saveWishInfo, setSaveWishInfo] = useState<IRenderSaveWish[]>([])

  const getWishInfoClick = async () => {
    const res = await getWishInfo()
    if (res) {
      const temp = res.replace(/'/g, '"')
      setGetWish(JSON.parse(temp))
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

  const saveClick = async () => {
    if (value?.length !== getWish?.BaseCount) {
      message.info('志愿未选全')
    } else {
      const id = localStorage.getItem('username')
      if (id && list) {
        const res = await saveWish(id, list.join(','))
        if (typeof res !== 'undefined') {
          message.success('保存成功')
          getSaveWishClick()
        }
      }
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
    getInfo()
    getWishInfoClick()
    getSaveWishClick()
  }, [])

  const onChange = (newValue: string, labelList: React.ReactNode[]) => {
    setValue(newValue)
    setList(labelList)
    const temp: IRenderValue[] = (newValue as unknown as string[]).reduce((pre: IRenderValue[], cur, index) => {
      pre.push({
        title: `第${index + 1}志愿`,
        value: cur,
        label: labelList[index] as string
      })
      return pre
    }, [])
    setRenderValue(temp)
  }
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
        {
          renderValue.length
            ? <div className={style.showBox}>
              <List
                grid={{ gutter: 0, column: 6 }}
                dataSource={renderValue}
                renderItem={item => (
                  <List.Item className={style.listItem}>
                    <Card title={item.title}>{item.label}</Card>
                  </List.Item>
                )}
              />
            </div>
            : ''
        }
        <div className={style.treeBox}>
          <TreeSelect
            style={{ width: '100%' }}
            switcherIcon={<DownOutlined />}
            showCheckedStrategy="SHOW_ALL"
            onChange={onChange}
            treeData={getWish?.wishTree}
            treeDefaultExpandAll={true}
            value={value}
            allowClear
            multiple
          />
        </div>
        <div className={style.bottom}>
          <div className={style.warn_text}>提示: 选择志愿后，请点击保存。保存后，如有修改，需再次点击保存。</div>
          <div className={style.btn_box}>
            <Button onClick={() => saveClick()}>保存</Button>
            <Button danger type='primary' onClick={() => { setValue(undefined); setRenderValue([]) }}>重置</Button>
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
