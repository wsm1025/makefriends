import React, { Component } from 'react'
import { publishOneDeatail } from '@api/basic/LoginApi'
import { TextareaItem, NavBar, Icon, WhiteSpace, ImagePicker, WingBlank, Button, Toast, Modal } from 'antd-mobile';
import { delpublish } from '@api/basic/LoginApi'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      avatar: [],
      weather: '#icon-xiaxue',
      IPAddress: '',
      textArea: '',
      isOwn: false,
      isNull: false,
      isEdit: false,
      isDel: false
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.location.search.split('=')[1]
    }, () => {
      publishOneDeatail(this.state.id).then(res => {
        if (!res.data.data.hasOwnProperty('id')) {
          this.setState({
            isNull: true
          })
          setTimeout(() => {
            this.props.history.replace('/home')
          }, 1000);
        }
        if (res.data.code) {
          const Res = res.data.data;
          const imgs = [];
          if (Res.imgs) {
            Res.imgs.split(',').forEach(element => {
              imgs.push({
                id: Math.random(),
                url: element
              })
            });
          }
          this.setState({
            textArea: Res.content,
            IPAddress: Res.position,
            weather: Res.weather,
            avatar: imgs,
            isOwn: Res.user_name === (localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info')).user_name : ''),
            isEdit: Res.isEdit,
            isDel: Res.isDel,
          })
        } else {
          Toast.fail(res.data.msg)
        }
      })
    })
  }
  render() {
    const state = this.state;
    return (
      !state.isNull ?
        <div className='publish'>
          <NavBar
            mode="light"
            icon={<Icon key={Math.random()} type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
            rightContent={this.state.isOwn ?
              [state.isEdit === 'false' ? <Button style={{ marginRight: 10 }} key={Math.random()} type="primary" size="small" onClick={() => this.props.history.push(`/home/edit/${this.state.id}`)}>编辑</Button> : <Button style={{ marginRight: 10 }} key={Math.random()} type="primary" size="small" disabled>已编辑</Button>,
              <Button key={Math.random()} type="primary" size="small" onClick={() => this.del}>删除</Button>]
              : ''}
          >
            详情
          </NavBar>
          <WhiteSpace size='md' />
          <TextareaItem
            disabled
            rows={5}
            value={this.state.textArea}
            count={300}
          />
          {state.avatar.length?
          <ImagePicker
            files={state.avatar}
          />
          :''}
          <WingBlank size="lg">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              心情：
              <svg className="icon" aria-hidden="true">
                <use xlinkHref={state.weather}></use>
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              定位：{state.IPAddress}
            </div>
          </WingBlank>
        </div >
        :
        <div>
          已被删除
        </div>
    )
  }
  del = () => {
    const alert = Modal.alert;
    alert('删除', '确认删除该发表内容???', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          delpublish(this.state.id).then(res => {
            if (res.data.code) {
              this.props.history.replace('/home')
              Toast.success(res.data.msg)
            } else {
              Toast.fail(res.data.msg)
            }
          })
        }
      },
    ])
  }
}
