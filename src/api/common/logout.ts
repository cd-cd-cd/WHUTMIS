import request from '../../utils/request'

// 注销
// admin logout
export const adminLogout = async (id: string | null) => {
  return await request({
    url: '/admin/logout',
    method: 'DELETE',
    params: {
      id
    }
  })
}

// main logout
export const mainLogout = async (id: string | null) => {
  return await request({
    url: '/main/logout',
    method: 'DELETE',
    params: {
      id
    }
  })
}
