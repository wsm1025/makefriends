import { NavBar, Icon, Button, WingBlank, InputItem, Toast } from "antd-mobile";
import Password from "../login/password";
import { useRef, useState } from 'react'
import './index.css'
import { checkEmail, updatePasswordFromCode } from '@api/basic/LoginApi'
import MD5 from 'md5'
function Index(props) {
  const password = useRef(null);
  const code = useRef(null);
  const user_name = useRef(null);
  let [isShow, stateisShow] = useState(true);
  return (
    <div className='forgetPassword'>
      <NavBar
        mode="light"
        icon={<Icon key={Math.random()} type="left" />}
        onLeftClick={() => props.history.go(-1)}
      >
        忘记密码
      </NavBar>
      <WingBlank size="lg">
        <form className="form">
          <InputItem
            clear
            ref={user_name}
            placeholder="请输入账户"
          >账户</InputItem>
          <Password ref={password} name='密码' placeholder='请输入密码' />
          <Password text maxLength={6} ref={code} errmsg={'验证码不少于6位'} name='验证码' placeholder='请输入验证码' slot={<Button onClick={sendCode} size='small'>验证码</Button>} />
        </form>
        <div className="buttons">
          <Button
            style={{ backgroundColor: "#45b97c" }}
            onClick={submit}
            disabled={isShow}
          >
            确认
          </Button>
          <Button style={{ backgroundColor: "white" }} onClick={reset}>
            重置
          </Button>
        </div>
      </WingBlank>
    </div>
  )
  function sendCode() {
    if (user_name.current.state.value.length <= 0) {
      return Toast.fail('账户为空')
    }
    checkEmail({ user_name: user_name.current.state.value }).then(res => {
      if (res.data.code) {
        Toast.success(res.data.msg)
        stateisShow(false)
      } else {
        Toast.fail(res.data.msg)
        stateisShow(true)
      }
    })
  }
  function submit() {
    if (user_name.current.state.value && password.current.state.value && code.current.state.value && user_name.current.state.value.length>=5 && password.current.state.value.length>5&&code.current.state.value.length === 6) {
      updatePasswordFromCode({
        user_name: user_name.current.state.value,
        pass_word: MD5(MD5(password.current.state.value)),
        code: code.current.state.value
      }).then(res=>{
        if (res.data.code) {
          Toast.success(res.data.msg)
          props.history.push('/login')
        } else {
          Toast.fail(res.data.msg)
        }
      })
    }else{
      Toast.fail('请填写必填项')
    }
  }
  function reset() {
    user_name.current.clearInput();
    password.current.Password.clearInput();
    code.current.Password.clearInput()
  }
}
export default Index