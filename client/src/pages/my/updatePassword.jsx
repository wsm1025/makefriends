import React, { Component } from 'react'
import { NavBar, Icon, Button, Toast } from "antd-mobile";
import { getPassword, updatePasswordApi  } from '@api/basic/LoginApi'
import MD5 from 'md5';
import './updatePassword.css'
import { localDB } from 'wsm-common';
import Password from '../login/password'
export default class updatePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.agopassword = '';
    this.nowpassword = ''
  }
  render() {
    return (
      <div className="updatePassword">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >修改密码</NavBar>
          {/* <InputItem
            type="password"
            value={state.password}
            onChange={this.passwordAction}
          >密码</InputItem>
          <InputItem
            type="password"
            value={state.againpassword}
            onChange={this.againpasswordAction}
          >确认密码</InputItem> */}
          <Password name='原密码' placeholder='请输入原密码' ref={(el) => (this.agopassword = el)}/>
          <Password name='更改密码' placeholder='请输入更改后密码'  ref={(el) => (this.nowpassword = el)}/>

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
  reset = () => {
    this.nowpassword.setState({
      value: null,
    });
    this.agopassword.setState({
      value: null,
    });
  }
  update = () => {
    if (this.agopassword.Password.state.value.length < 6 || this.nowpassword.Password.state.value.length < 6) {
      return Toast.fail('更改的密码至少6位')
    }
    if(this.agopassword.Password.state.value === this.nowpassword.Password.state.value){
      return Toast.info('两次密码一致,无需更改')
    }
    try{
      getPassword(MD5(MD5(this.agopassword.Password.state.value))).then(res => {
        if (res.data.code) {
          updatePasswordApi(MD5(MD5(this.nowpassword.Password.state.value))).then(res=>{
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
