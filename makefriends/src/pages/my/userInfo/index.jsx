import React, { Component } from 'react'
import { NavBar, Icon, List, InputItem, Toast, ImagePicker, Button, DatePicker, Picker, Stepper  } from 'antd-mobile';
import { localDB } from 'wsm-common'
import { getAttribute, avatarImgUpload } from '@api/basic/LoginApi'
import "./index.css";
export default class userinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      avatar: [{}],
      birthday: null,
      email: '',
      home: '',
      label: '',
      sex: [1],
      signature: '',
      user_name: '',
      selectSex:
        [
          {
            label:
              (<div key={Math.random()}>
                <span>男</span>
              </div>),
            value: '1'
          },
          {
            label:
              (<div key={Math.random()}>
                <span>女</span>
              </div>),
            value: '0'
          }
        ]
    };
  }
  componentDidMount() {
    if (localDB.get('makeFriendsToken')) {
      this.getinfo();
    } else {
      this.props.history.replace('/login')
    }
  }
  render() {
    const state = this.state;
    return (
      <div className='form-edit'>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <Button size="small" key={Math.random()} onClick={this.updateInfo} type="primary">确认</Button>
          ]}
        >修改个人信息</NavBar>
        <List renderHeader={() => '个人信息如下'}>
          <InputItem
            type="text"
            disabled
            value={state.user_name}
          >用户名</InputItem>
          <InputItem
            type="email"
            disabled
            value={state.email}
            placeholder="xxx@126.com"
          >email</InputItem>
          <Picker
            data={state.selectSex}
            value={state.sex}
            cols={1}
            onChange={this.onChangeSex}
          >
          <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
          <List.Item
          wrap
          extra={
            <Stepper
              style={{ width: '100%', minWidth: '100px'}}
              showNumber
              max={100}
              min={10}
              value={state.age}
              onChange={e=>this.setState({age:e})}
            />}
        >
       年龄
        </List.Item>
          <InputItem
            type="text"
            value={state.signature}
            onChange={e=>this.setState({signature:e})}
          >个性签名</InputItem>
          <DatePicker
            mode="date"
            minDate={new Date(1945, 1, 1, 0, 0, 0)}
            value={state.birthday}
            // Date Sun Aug 22 2021 19:38:50 GMT+0800 (中国标准时间)
            onChange={date => this.setState({ birthday: date })}
          >
            <List.Item arrow="horizontal">生日</List.Item>
          </DatePicker>
          <InputItem
            type="text"
            value={state.home}
            onChange={e=>this.setState({home:e})}
          >住址</InputItem>
          <List.Item
          className='label'
          wrap
          extra={
            state.label.split(',').map(val=>{
              return (
                <span style={{padding:'0 4px'}}>{val}</span>
              )
            })
           }
        >
       标签
        </List.Item>
          <div className='am-list-item am-input-item am-list-item-middle'>
            <div className='am-input-label am-input-label-5'>头像</div>
          </div>
          <ImagePicker
            files={state.avatar}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={state.avatar.length < 1}
            multiple={this.state.multiple}
          />
          {/* <InputItem
            type="text"
            value={state.label}
          >标签</InputItem> */}
        </List>
      </div>
    )
  }
  getinfo = () => {
    getAttribute('age,avatar,birthday,email,home,label,sex,signature,user_name').then(res => {
      if (res.data.code) {
        let info = res.data.data;
        localDB.set('info', JSON.stringify(info))
        this.setState({
          age: info.age,
          avatar: [{ url: info.avatar, id: Math.random() }],
          birthday: new Date(Date.parse(info.birthday)),
          email: info.email,
          home: info.home,
          label: info.label,
          sex: [info.sex],
          signature: info.signature,
          user_name: info.user_name,
        })
      } else {
        Toast.fail(res.data.msg)
      }
    })
  }
  onChange = async (files, type, index) => {
    if (type === 'remove') {
      this.setState({
        avatar: []
      })
    } else if (type === 'add') {
      const result = await avatarImgUpload(files[0].file)
      if (result.data.code) {
        Toast.success(result.data.msg)
        this.getinfo()
        this.setState({
          avatar: [{ url: result.data.data, id: Math.random() }],
        })
      } else {
        Toast.fail(result.data.msg)
      }
    }
  }
  onChangeSex = (val) => {
    this.setState({
      sex: val
    });
  };
  updateInfo=()=>{
    console.log(this.state)
  }
}
