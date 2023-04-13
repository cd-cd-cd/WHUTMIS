import request from '../utils/request'

interface IGetSelfInfo {
  id: string
  password: string
  username: string
}

// 得到admin基本信息
export const getSelfInfo = async (id: string) => {
  return await request<IGetSelfInfo>({
    url: `/admin/${id}`,
    method: 'GET'
  })
}
