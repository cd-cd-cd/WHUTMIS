import React from 'react'
import style from './index.module.scss'
import { Button, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export default function MStuInfo () {
  const onSearch = (value: string) => {
    console.log(value)
  }
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
    </div>
  )
}
