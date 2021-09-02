import React, { Component } from 'react'
import { TextareaItem, NavBar, Icon, WhiteSpace, ImagePicker, WingBlank, Button, Toast } from 'antd-mobile';
import './index.css'
import Weather from '@components/weather'
import { WAjax } from 'wsm-common'
import {publishDetailImg} from '@api/basic/LoginApi'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: [],
      weather: '#icon-xiaxue',
      isShowWeather: true,
      IPAddress: '',
      textArea:'',
      config: {
        src: '',
        weather: [],
        size: '',
        word: '',
        isShowWord: false,
        action: (e) => {
          this.setState({
            weather: e
          })
        }
      }
    }
  }
  componentDidMount() {
    this.setState({
      isShowWeather: false
    })
    this.ip()
  }
  render() {
    const state = this.state;
    return (
      <div className='publish'>
        <NavBar
          mode="light"
          icon={<Icon key={Math.random()} type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[<Button key={Math.random()} disabled={!state.textArea.length} type="primary" size="small">确认发表</Button>]}
        >
          发表
        </NavBar>
        <WhiteSpace size='md' />
        <TextareaItem
          rows={5}
          count={100}
          onChange={e=>this.setState({textArea:e})}
        />
        <ImagePicker
          files={state.avatar}
          onChange={this.onChange}
          selectable={state.avatar.length < 6}
          // multiple={this.state.multiple}
        />
        <WingBlank size="lg">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            心情：
            <svg className="icon" aria-hidden="true" onClick={this.changeWeather}>
              <use xlinkHref={state.weather}></use>
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            定位：{state.IPAddress}
          </div>
          {
            state.isShowWeather ?
              <div className="weather">
                <Weather {...state.config} />
              </div>
              : ''
          }
        </WingBlank>
      </div>
    )
  }
  changeWeather = () => {
    this.setState({
      isShowWeather: true
    }, () => {
      setTimeout(() => {
        this.setState({
          isShowWeather: false
        })
      }, 2000);
    })
  }
  ip = () => {
    WAjax('https://tianqiapi.com/api?version=v61&appid=44148117&appsecret=cYkMG4cL').then(res => {
      this.setState({
        IPAddress: res.data.city
      })
    })
  }
  onChange = async (files, type, index) => {
    if (type === 'remove') {
      this.setState({
        avatar: []
      })
    } else if (type === 'add') {
      const result = await publishDetailImg(files[this.state.avatar.length].file)
      if (result.data.code) {
        Toast.success(result.data.msg)
        this.setState({
          avatar: [...this.state.avatar,{ url: result.data.data, id: Math.random() }],
        })
      } else {
        Toast.fail(result.data.msg)
      }
    }
  }
}
