import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Card, List, message } from 'antd'
import { type IGetWhish } from '../../../libs/model'
import './index.css'
import { getSaveWish, getSubmitState, getWishInfo, saveWish, submit } from '../../../api/student'

interface IRenderSaveWish {
  title: string
  value: string
}
const nameMap: any = {}
export default function AutoWish () {
  let wishResultArr: string[] = []
  const [getWish, setGetWish] = useState<IGetWhish>()
  const [saveWishInfo, setSaveWishInfo] = useState<IRenderSaveWish[]>([])
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
  const [TopFatherNode, setTopFatherNode] = useState<any>()

  function getDeep (node: any) {
    let deep = 0
    if (node.son.length > 0) {
      for (let i = 0; i < node.son.length; i++) {
        const sonDeep = getDeep(node.son[i])
        if (sonDeep + 1 > deep) { deep = sonDeep + 1 }
      }
    } else {
      deep = 1
    }
    return deep
  }
  function createNode (name: any) {
    const obj: any = {}
    obj.name = name
    obj.father = null
    obj.son = []
    obj.brother = 0
    obj.positionOfWish = -1
    nameMap[name] = obj
    return obj
  }

  function fatherAndSon (obj1: any, obj2: any) {
    obj2.father = obj1
    obj1.son.push(obj2)
    for (let i = 0; i < obj1.son.length; i++) {
      obj1.son[i].brother = obj1.son.length
    }
  }
  const [deep, setDeep] = useState(0)

  function createTree (data: any) {
    const topFatherNode = createNode('topFatherNode')
    for (const father of data) {
      const fatherNode = createNode(father.title)
      fatherAndSon(topFatherNode, fatherNode)
      createTreeByFather(father)
    }
    setTopFatherNode(topFatherNode)
    // 计算深度
    const Deep = getDeep(topFatherNode) - 1
    setDeep(Deep)
  }

  function createTreeByFather (father: any) {
    const fatherNodeObj = nameMap[father.title]
    if (father.children) {
      for (const child of father.children) {
        const childNodeObj = createNode(child.title)
        fatherAndSon(fatherNodeObj, childNodeObj)
        createTreeByFather(child)
      }
    }
  }

  const init = async () => {
    const res = await getWishInfo()
    if (res) {
      const data = (JSON.parse(res.replace(/'/g, '"')).wishTree)
      createTree(data)
    }
  }

  const initRender = () => {
    const wishTable = window.document.getElementById('wishTable')
    if (wishTable) {
      wishTable.innerHTML += "<div class='wishTableHeadRow' id='wishTableHeadRow'></div>"
      renderWishTableHeaderRow()
      renderWishTableRow(wishTable)
      renderRowCol()
      putNodeIntoHTML(TopFatherNode)
      addFunc()
    }
  }

  // 创建表头
  const renderWishTableHeaderRow = () => {
    const wishTableHeadRow = window.document.getElementById('wishTableHeadRow')!
    for (let i = 0; i < deep; i++) {
      wishTableHeadRow.innerHTML += "<div class='wishTableHeadCol' style='width: " + 100 / deep + "%'>第" + (i + 1) + '层</div>'
    }
  }

  // 创建表的行（数
  const renderWishTableRow = (wishTable: any) => {
    if (TopFatherNode) {
      for (let i = 0; i < TopFatherNode.son.length; i++) {
        wishTable.innerHTML += "<div class='wishTableRow' id='wsRow" + i + "'></div>"
      }
    }
  }

  // 创造行里的列
  const renderRowCol = () => {
    const wishTableRowList = window.document.querySelectorAll('.wishTableRow')
    for (const wishTableRow of wishTableRowList) {
      for (let i = 0; i < deep; i++) {
        wishTableRow.innerHTML += "<div class='wishTableCol' style='width: " + 100 / deep + "%' id='wsCol" + i + "'></div>"
      }
    }
  }

  // 把顶级父结点放入这个函数，这个函数会按照父子关系与位置把每一个Node的数据生成进表格中并生成select
  function putNodeIntoHTML (topFather: any) {
    let count = 0
    for (const father of topFather.son) {
      putNodeFatherIntoBlock(father, count, 0)
      count++
    }
  }

  // 用来把father直接放进block，row和col是father对应的位置
  function putNodeFatherIntoBlock (father: any, row: any, col: any) {
    const wsRow = window.document.getElementById('wsRow' + row)
    let wsCol = null
    if (wsRow && wsRow.children) {
      for (const child of wsRow.children) {
        if ('wsCol' + col === child.id) {
          wsCol = child
          break
        }
      }
      if (wsCol !== null) {
        wsCol.innerHTML += `<div class='wishTableWishDiv' id='wish${father.name}' >` +
          "<div class='labelCSS'>" + father.name + ':</div></div>'
        const node = father
        const wish = window.document.getElementById('wish' + node.name)
        if (wish) {
          wish.innerHTML += `<select style='width: 220px' id='select${node.name}' class='layui-input placeholder'></select>`
          const select = window.document.getElementById('select' + node.name)
          if (select) {
            select.innerHTML += "<option value='-1' class='option'>请选择志愿顺序</option>"
            const nodeObj = nameMap[node.name]
            if (nodeObj !== null) {
              for (let i = 0; i < nodeObj.brother; i++) {
                select.innerHTML += `<option class='option' value=${i}>第${i + 1}志愿</option>`
              }
            }
          }
          putNodeIntoBlock(father, row, col + 1)
        }
      }
    }
  }

  // 把father的所有son都放进表格中，col不是father的层级，是father的son的层级
  function putNodeIntoBlock (father: any, row: any, col: any) {
    const wsRow = window.document.getElementById('wsRow' + row)
    let wsCol
    if (wsRow) {
      for (const child of wsRow.children) {
        if ('wsCol' + col === child.id) {
          wsCol = child
          break
        }
      }
    }
    if (wsCol != null) {
      for (const son of father.son) {
        wsCol.innerHTML += `<div class='wishTableWishDiv' id='wish${son.name}'>` + "<div class='labelCSS'>" +
          son.name + ':</div>' +
          '</div>'
        const node = son
        const wish = window.document.getElementById('wish' + node.name)
        if (wish) {
          wish.innerHTML += "<select style='width: 220px' class='layui-input placeholder' id='select" + node.name + "'></select>"
          const select = window.document.getElementById('select' + node.name)
          if (select) {
            select.innerHTML += "<option value='-1' class='option'>请选择志愿顺序</option>"
            const nodeObj = nameMap[node.name]
            if (nodeObj != null) {
              for (let i = 0; i < nodeObj.brother; i++) {
                select.innerHTML += `<option value=${i} class='option'>第${i + 1}志愿</option>`
              }
            }
            putNodeIntoBlock(node, row, col + 1)
          }
        }
      }
    }
  }

  const addFunc = () => {
    const selects = window.document.querySelectorAll('select')
    selects.forEach(select => {
      select.addEventListener('change', (e) => selectOnChange(e.target))
    })
  }

  // 修改了select时的处理函数
  function selectOnChange (obj: any) {
    const ws = obj.id.split('select')[1]
    const nodeObj = nameMap[ws]
    const father = nodeObj.father
    let bool = false
    for (const son of father.son) {
      if (son.positionOfWish === -1) continue
      // eslint-disable-next-line eqeqeq
      if (son.positionOfWish == obj.value) {
        bool = true
        break
      }
    }
    if (bool) {
      obj.value = -1
      nodeObj.positionOfWish = -1
      message.info('该志愿位置已被选择')
    } else {
      nodeObj.positionOfWish = obj.value
    }
  }

  // 递归函数，获得最底层志愿，会把结果写入wishResultArr，返回判断值，如果为false说明获取失败，有志愿未完成选择
  function getTrueWish (node: any): boolean {
    if (node.son.length === 0) {
      wishResultArr.push(node.name)
      return true
    }
    let resultBool = true
    for (let count = 0; count < node.son.length; count++) {
      let target = null
      for (const son of node.son) {
        if (son.positionOfWish === -1) {
          // console.log(node.name + ':son.positionOfWish===-1')
          return false
        }
        if (son.positionOfWish === count.toString()) {
          target = son
        }
      }
      if (target === null) {
        // console.log(node.name + ':target==null')
        return false
      }
      resultBool = resultBool && getTrueWish(target)
      if (!resultBool) {
        // console.log(node.name + ':target==null')
        return false
      }
    }
    return resultBool
  }

  // 调用getTrueWish生成所有底层志愿的总函数
  const getWishResult = async () => {
    wishResultArr = []
    const bool = getTrueWish(TopFatherNode)
    if (!bool) {
      message.info('志愿未选择完全')
    } else {
      const id = localStorage.getItem('username')
      if (id) {
        const res = await saveWish(id, wishResultArr.join(','))
        if (typeof res !== 'undefined') {
          message.success('保存成功')
          getSaveWishClick()
        }
      }
    }
  }

  const getWishInfoClick = async () => {
    const res = await getWishInfo()
    if (res) {
      const temp = res.replace(/'/g, '"')
      setGetWish(JSON.parse(temp))
    }
  }

  function resetTopFatherNode (node: any) {
    if (node.son.length !== 0) {
      for (const son of node.son) {
        const obj = nameMap[son.name]
        obj.positionOfWish = -1
        resetTopFatherNode(son)
      }
    }
  }

  function restOption () {
    const selects = window.document.querySelectorAll('select')
    selects.forEach(select => {
      select.value = '-1'
    })
  }

  function reset () {
    resetTopFatherNode(TopFatherNode)
    restOption()
  }

  useEffect(() => {
    init()
    getWishInfoClick()
    getSaveWishClick()
  }, [])

  useEffect(() => {
    if (TopFatherNode) {
      initRender()
    }
  }, [deep])
  return (
    <div>
      <div className={style.showBoard}>
        <div className={style.title}>志愿选择</div>
        <div id='wishTable' className={style.wishTable}>
        </div>
        <div className={style.bottom}>
          <div className={style.warn_text}>提示: 选择志愿后，请点击保存。保存后，如有修改，需再次点击保存。</div>
          <div className={style.btn_box}>
            {
              TopFatherNode ? <><Button onClick={() => getWishResult()}>保存</Button><Button danger type='primary' onClick={() => reset()}>重置</Button></> : ''
            }
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
      </div></div>
  )
}
