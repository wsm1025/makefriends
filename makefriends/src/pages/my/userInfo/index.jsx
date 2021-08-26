import React, { Component } from 'react'
import { NavBar, Icon, List, InputItem, Toast, ImagePicker, Button, Tag, DatePicker, Picker, Stepper, Drawer, SearchBar } from 'antd-mobile';
import { localDB } from 'wsm-common'
import Preview from '@components/preview/index'
import { getAttribute, avatarImgUpload, updateInfo as updateInfoApi } from '@api/basic/LoginApi'
import "./index.css";
export default class userinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      imgisShow: false,
      age: '',
      Addlabel: '',
      open: false,
      avatar: [{}],
      imgURL: [],
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
    const sidebar = (<List>
      <SearchBar placeholder="输入关键字" value={state.Addlabel} onChange={e => this.setState({ Addlabel: e })} onSubmit={this.addLabel} onClear={this.clearLabel} maxLength={4} />
      {state.label.split(',').map((i, index) => {
        if (index < 6) {
          return (
            <span key={index} onClick={this.delLabel}>
              <Tag style={{ margin: '9px' }} 
              >{i}</Tag>
            </span>
          )
        }
        return null
      })}
    </List>);
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
            type="text"
            value={state.email}
            error={this.state.hasError}
            onErrorClick={this.onErrorClick}
            placeholder="xxx@126.com"
            onChange={this.emailChange}
          >email</InputItem>
          <Picker
            data={state.selectSex}
            value={state.sex}
            cols={1}
            onChange={(e) => {
              this.setState({
                sex: e
              })
            }}
          >
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
          <List.Item
            wrap
            extra={
              <Stepper
                style={{ width: '100%', minWidth: '100px' }}
                showNumber
                max={100}
                min={10}
                value={state.age}
                onChange={e => this.setState({ age: e })}
              />}
          >
            年龄
          </List.Item>
          <InputItem
            type="text"
            value={state.signature}
            onChange={e => this.setState({ signature: e })}
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
            onChange={e => this.setState({ home: e })}
          >住址</InputItem>
          <List.Item
            className='label'
            onClick={() => { this.setState({ open: true }) }}
            wrap
            extra={
              state.label.split(',').map(val => {
                return (
                  <span key={Math.random()} style={{ padding: '0 4px' }}>{val}</span>
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
            onImageClick={(index, fs) => this.setState({ imgisShow: true })}
            selectable={state.avatar.length < 1}
            multiple={this.state.multiple}
          />
        </List>
        <Preview isshow={state.imgisShow} url={state.imgURL} />
        {
          this.state.open ?
            <Drawer
              className="my-drawer"
              style={{ minHeight: document.documentElement.clientHeight }}
              enableDragHandle
              contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
              sidebar={sidebar}
              open={state.open}
              onOpenChange={() => { this.setState({ open: false }) }}
            >
              ''
            </Drawer>
            : ""
        }

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
          imgURL: info.avatar,
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
  updateInfo = () => {
    if (!this.state.avatar.length) {
      this.setState({
        avatar: [{
          url: this.state.imgURL,
          id: Math.random()
        }]
      }, () => {
        this.update_repete()
      })
    } else {
      this.update_repete()
    }
  }
  update_repete = async () => {
    if (this.state.hasError) {
      return Toast.info('请输入正确的邮箱');
    }
    delete this.state.selectSex;
    try {
      const { data: { code, msg } } = await updateInfoApi(this.state);
      if (code) {
        Toast.success(msg)
        setTimeout(() => {
          this.props.history.replace('/my')
        }, 1000);
      } else {
        Toast.fail(msg)
      }
    } catch (err) {
      console.log(err)
    }
  }
  emailChange = (e) => {
    if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e)) {
      this.setState({
        hasError: false,
      });
    } else {
      this.setState({
        hasError: true,
      });
    }
    this.setState({ email: e });
  }
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('请输入正确的邮箱');
    }
  }
  addLabel = (e) => {
    var res = this.state.label
    if(this.state.label.split(',').length>=5){
      return Toast.info('至多五个标签')
    }
    this.setState({
      label: res + ',' + e
    })
    this.clearLabel()
  }
  clearLabel = () => {
    this.setState({
      Addlabel: ''
    })
  }
  delLabel=(e)=>{
    var res = this.state.label.split(',')
    res.splice( res.indexOf(e.target.innerText) ,1)
    res = res.join(',')
    if(this.state.label.split(',').length<=1){
      return Toast.info('至少留一个标签')
    }
    this.setState({
      label: res
    })
  }
}
