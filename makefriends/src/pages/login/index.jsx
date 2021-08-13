import React, { Component } from "react";
import { NavBar, Icon, Button, WingBlank, InputItem, Toast } from "antd-mobile";
import "./index.css";
import Password from "./password";
import { authCode,localDB } from "wsm-common";
import {Login as UserLogin} from '../../api/basic/LoginApi'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      authcode: null,
      usernamehasError: false,
      authcodehasError: false,
      authcodema:null
    };
    this.username = "";
    this.authcode = "";
    this.password = "";
    this.options = {
      style: {
        backgroundColor: "skyblue",
        position: "absolute",
        top: "145px",
        right: "20px",
      },
      el: "#authcode",
      height: 40,
      width: 80,
      num: 5,
      position: {
        x: 40,
        y: 30,
      },
      font: "20px 楷体",
    };
  }
  componentDidMount() {
    authCode(this.options,res=>{
      this.setState({
        authcodema : res
      })
    });
  }
  render() {
    return (
      <div className="login">
        <NavBar
          mode="light"
          icon={<Icon key={Math.random()} type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[<Icon key={Math.random()} type={"loading"} />]}
        >
          登陆
        </NavBar>
        <WingBlank size="lg">
          <form className="form">
            <InputItem
              ref={(el) => (this.username = el)}
              key={Math.random()}
              type="text"
              autoComplete='off'
              placeholder="xxxx@126.com"
              error={this.state.usernamehasError}
              value={this.state.username}
              onErrorClick={() => {
                Toast.info("账号至少6位");
              }}
              onChange={(val) => {
                if (val.length < 5) {
                  this.setState({
                    usernamehasError: true,
                  });
                } else {
                  this.setState({
                    usernamehasError: false,
                  });
                }
                this.setState(
                  {
                    username: val,
                  },
                  () => {
                    this.username.focus();
                  }
                );
              }}
              clear
            >
              账号/邮箱
            </InputItem>
            <Password ref={(el) => (this.password = el)} />
            <InputItem
              ref={(el) => (this.authcode = el)}
              key={Math.random()}
              type="text"
              autoComplete='off'
              value={this.state.authcode}
              placeholder="请输入验证码"
              onChange={(val) => {
                if (val.length !== (this.options.num || 4)) {
                  this.setState({
                    authcodehasError: true,
                  });
                } else {
                  this.setState({
                    authcodehasError: false,
                  });
                }
                this.setState(
                  {
                    authcode: val,
                  },
                  () => {
                    this.authcode.focus();
                  }
                );
              }}
            >
              验证码
            </InputItem>
            <div id="authcode"></div>
            <div className="button">
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
          </form>
        </WingBlank>
      </div>
    );
  }
  login =async () => {
    if (
      !this.state.usernamehasError &&
      this.state.username &&
      this.state.authcode &&
      !this.state.authcodehasError &&
      this.password.Password.state.value.length >= 6
    ) {
      if(this.state.authcode.toLocaleLowerCase() === this.state.authcodema.toLocaleLowerCase()){
       let {data:{data,code,msg,info:{token}}} = await UserLogin({
          user_name:this.state.username,
          pass_word:this.password.Password.state.value
        })
        if(msg==='登陆成功'&&code){
          Toast.success(msg)
          localDB.set('makeFriendsToken',token)
          localDB.set('makeFriendsToken',token)
          localDB.set('info',JSON.stringify(data))
          this.props.history.replace('/home')
        }else{
          Toast.fail("登陆失败")
        }
      }else{
        Toast.fail('验证码错误！！！')
      }
    } else {
      Toast.fail("验证未通过！！！");
    }
  };
  reset = () => {
    this.setState({
      username: null,
      authcode: null,
      usernamehasError: false,
      authcodehasError: false,
    });
    // setState存在于组件实例上面
    this.password.setState({
      value: null,
    });
  };
}
