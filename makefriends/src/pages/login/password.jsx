import React, { Component } from "react";
import { InputItem,Toast } from "antd-mobile";
// 提取组件到外部，点击小锁，render会重新执行，故提取出去
class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPassword: true,
      value: null,
      hasError: false,
    };
    this.Password = "";
  }
  render() {
    return (
      <InputItem
        ref={(el) => {
          this.Password = el;
        }}
        autoComplete='off'
        key={Math.random()}
        type={this.state.isPassword ? "password" : "text"}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onErrorClick={()=>{Toast.info('密码至少6位')}}
        error={this.state.hasError}
        onChange={(val) => {
          if (val.length < 6) {
            this.setState({
              hasError: true,
            });
          } else {
            this.setState({
              hasError: false,
            });
          }
          //此处放在回调中异步执行
          this.setState(
            {
              value: val,
            },
            () => {
              this.Password.focus();
            }
          );
        }}
        extra={
          <i
            className={
              this.state.isPassword
                ? "iconfont icon-jiesuo"
                : "iconfont icon-ali-jiesuo"
            }
            onClick={() => {
              //记录密码
              this.setState({
                isPassword: !this.state.isPassword,
              });
            }}
          ></i>
        }
      >
        {this.props.name}
      </InputItem>
    );
  }
}

export default Password;
