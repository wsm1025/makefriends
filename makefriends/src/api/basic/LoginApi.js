import http from '@utils/http'
const  Login = (userInfo)=> http.post('/users/login',userInfo) 
export{
    Login
}