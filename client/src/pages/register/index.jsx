import React, { Component } from 'react'
import { NavBar, Icon, Button, WingBlank, InputItem, Toast } from "antd-mobile";
import "./index.css";
import Password from '@pages/login/password'
import { register } from '@api/basic/LoginApi'
import MD5 from 'md5'
export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
    }
    this.password = '';
    this.passwordAgain = ''
  }
  render() {
    const state = this.state;
    return (
      <div className='register'>
        <NavBar
          mode="light"
          icon={<Icon key={Math.random()} type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[<Button size='small' key={Math.random()} onClick={() => this.props.history.push('/login')}>登录</Button>]}
        >
          注册
        </NavBar>
        <WingBlank size="lg">
          <form className="form">
            <InputItem
              clear
              placeholder="请输入账户"
              value={state.user_name}
              onChange={e => this.setState({ user_name: e })}
            >账户</InputItem>
            <Password name='密码' placeholder='请输入密码' ref={(el) => (this.password = el)} />
            <Password name='确认密码' placeholder='请再次输入密码' ref={(el) => (this.passwordAgain = el)} />
            {/* <InputItem
            clear
            placeholder="请输入验证码"
            extra={
              <Button size='small'
            >获取</Button>
            }
          >验证码</InputItem> */}
          </form>
          <div className="buttons">
            <Button
              style={{ backgroundColor: "#45b97c" }}
              onClick={this.login}
            >
              确认
            </Button>
            <Button style={{ backgroundColor: "white" }} onClick={this.reset}>
              重置
            </Button>
          </div>
        </WingBlank>
      </div>
    )
  }
  login = () => {
    if(this.state.user_name.length<=5){
     return Toast.fail('用户名至少6位')
    }
    if (!this.state.user_name || !this.password.Password.state.value) {
      Toast.fail('用户名或密码为空')
    } else if (this.passwordAgain.Password.state.value !== this.password.Password.state.value) {
      Toast.fail('两次密码不一致')
    } else if (this.passwordAgain.Password.state.value.length < 6 || this.password.Password.state.value.length < 6) {
      Toast.fail('密码长度不足')
    } else {
      register(
        {
          user_name: this.state.user_name,
          pass_word: MD5(MD5(this.passwordAgain.Password.state.value))
        }
      ).then(res => {
        if (res.data.code) {
          Toast.success(res.data.msg)
          this.props.history.push('/login')
        } else {
          Toast.fail(res.data.msg)
        }
      })
    }
  }
  reset = () => {
    this.setState({
      user_name: null,
    });
    // setState存在于组件实例上面
    this.password.setState({
      value: null,
    });
    this.passwordAgain.setState({
      value: null,
    });
  };
}
