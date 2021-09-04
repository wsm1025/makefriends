import http from '@utils/http'
const Login = (userInfo) => http.post('/users/login', userInfo)
const getAttribute = (key,id) => http.get(`/users/getAttribute?key=${key}&id=${id}`)
const avatarImgUpload = async (key) => {
    var formData = new FormData()
    formData.append('file', key)
    const res = await http.post(`/users/avatarImgUpload`, formData)
    return res
}
const updateInfo = (userInfo) => http.post('/users/updateInfo', userInfo)
const getPassword = (key) => http.post('/users/getPasswrod',{password:key})

const updatePasswordApi = (pass_word) => http.post('/users/updatePassword',{pass_word})
const register = (userInfo) => http.post('/users/register',userInfo)
const checkEmail = (userInfo) => http.post('/users/checkEmail',userInfo)
const updatePasswordFromCode = (userInfo) => http.post('/users/updatePasswordFromCode',userInfo)
const publishDetailImg = async (key) => {
    var formData = new FormData()
    formData.append('file', key)
    const res = await http.post(`/users/publishDetailImg`, formData)
    return res
}
const publishContent =(data)=>http.post('/users/publishContent',data)

const publishDeatail =(num,size)=>http.get(`/users/publishDeatail?num=${num}&size=${size}`)
const publishOneDeatail =(id)=>http.get(`/users/publishOneDeatail?id=${id}`)
const delpublish =(id)=>http.post(`/users/delpublish`,{id})
const publishEdit =(data)=>http.post(`/users/publishEdit`,data)






export {
    Login,
    getAttribute,
    avatarImgUpload,
    updateInfo,
    getPassword,
    updatePasswordApi,
    register,
    checkEmail,
    updatePasswordFromCode,
    publishDetailImg,
    publishContent,
    publishDeatail,
    publishOneDeatail,
    delpublish,
    publishEdit
}