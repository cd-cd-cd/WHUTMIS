import request from '../utils/request'

export const changePassword = async (data: FormData) => {
  return await request({
    url: '/main/changePassword',
    method: 'POST',
    data
  })
}
