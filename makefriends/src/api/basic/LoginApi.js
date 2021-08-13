import http from '@utils/http'
const  Login = (userInfo)=> http.post('/users/login',userInfo) 
const  getAttribute = (key)=> http.get(`/users/getAttribute?key=${key}`) 
export{
    Login,
    getAttribute
}