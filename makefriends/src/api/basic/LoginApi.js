import http from '@utils/http'
const Login = (userInfo) => http.post('/users/login', userInfo)
const getAttribute = (key) => http.get(`/users/getAttribute?key=${key}`)
const avatarImgUpload = async (key) => {
    var formData = new FormData()
    formData.append('file', key)
    const res = await http.post(`/users/avatarImgUpload`, formData)
    return res
}
const updateInfo = (userInfo) => http.post('/users/updateInfo', userInfo)
const getPassword = (key) => http.post('/users/getPasswrod',{password:key})

const updatePasswordApi = (pass_word) => http.post('/users/updatePassword',{pass_word})

export {
    Login,
    getAttribute,
    avatarImgUpload,
    updateInfo,
    getPassword,
    updatePasswordApi
}