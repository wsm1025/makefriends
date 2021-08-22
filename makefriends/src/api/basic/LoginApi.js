import http from '@utils/http'
const Login = (userInfo) => http.post('/users/login', userInfo)
const getAttribute = (key) => http.get(`/users/getAttribute?key=${key}`)
const avatarImgUpload = async (key) => {
    var formData = new FormData()
    formData.append('file', key)
    const res = await http.post(`/users/avatarImgUpload`, formData)
    return res
}
export {
    Login,
    getAttribute,
    avatarImgUpload
}