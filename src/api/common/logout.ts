import request from '../../utils/request'

// 注销
// admin logout
export const adminLogout = async (id: string | null) => {
  return await request({
    url: '/admin/logout',
    method: 'POST',
    params: {
      id
    }
  })
}

// main logout
export const mainLogout = async (id: string | null) => {
  return await request({
    url: '/new/main/logout',
    method: 'POST',
    params: {
      id
    }
  })
}
