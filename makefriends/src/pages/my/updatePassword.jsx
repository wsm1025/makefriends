import React, { Component } from 'react'
import { NavBar, Icon, Button, InputItem, Toast } from "antd-mobile";
import { getPassword, updatePasswordApi  } from '@api/basic/LoginApi'
import MD5 from 'md5';
import './updatePassword.css'
import { localDB } from 'wsm-common';
export default class updatePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: "",
      againpassword: "",
    }
  }
  render() {
    const state = this.state;
    return (
      <div className="updatePassword">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >修改密码</NavBar>
          <InputItem
            type="password"
            value={state.password}
            onChange={this.passwordAction}
          >密码</InputItem>
          <InputItem
            type="password"
            value={state.againpassword}
            onChange={this.againpasswordAction}
          >确认密码</InputItem>
          <div className="button">
            <Button
              style={{ backgroundColor: "#45b97c" }}
              onClick={this.update}
            >
              确认
            </Button>
            <Button style={{ backgroundColor: "white" }} onClick={this.reset}>
              重置
            </Button>
          </div>
      </div>
    )
  }
  passwordAction = (e) => {
    this.setState({
      password: e
    })
  }
  againpasswordAction = (e) => {
    this.setState({
      againpassword: e
    })
  }
  reset = () => {
    this.setState({
      againpassword: '',
      password: ''
    })
  }
  update = () => {
    if (this.state.password.length < 6 || this.state.againpassword.length < 6) {
      return Toast.fail('密码至少6位')
    }
    if(this.state.password === this.state.againpassword){
      return Toast.info('两次密码一致')
    }
    try{
      getPassword(MD5(MD5(this.state.password))).then(res => {
        if (res.data.code) {
          updatePasswordApi(MD5(MD5(this.state.againpassword))).then(res=>{
            if (res.data.code) {
              Toast.success(res.data.msg)
              localDB.clear()
              this.props.history.replace('/login')
            }else{
              Toast.fail(res.data.msg)
            }
          })
        } else {
          Toast.fail(res.data.msg)
        }
      })
    } catch(err) {
      Toast.fail('错误')
    }
  }
}
