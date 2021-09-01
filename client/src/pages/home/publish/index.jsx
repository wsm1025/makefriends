import React, { Component } from 'react'
import { TextareaItem, NavBar, Icon, WhiteSpace, ImagePicker, WingBlank } from 'antd-mobile';
import './index.css'
import Weather from '@components/weather'
import {WAjax} from 'wsm-common'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: [],
      weather: '#icon-xiaxue',
      isShowWeather: true,
      IPAddress:'',
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
  componentDidMount(){
    this.setState({
      isShowWeather:false
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
        >
          发表
        </NavBar>
        <WhiteSpace size='md' />
        <TextareaItem
          rows={5}
          count={100}
        />
        <ImagePicker
          files={state.avatar}
          onChange={this.onChange}
          onImageClick={(index, fs) => this.setState({ imgisShow: true })}
          selectable={state.avatar.length < 6}
          multiple={this.state.multiple}
        />
        <div style={{display:'flex',alignItems:'center' }}>
          心情：
          <svg className="icon" aria-hidden="true" onClick={this.changeWeather}>
            <use xlinkHref={state.weather}></use>
          </svg>
        </div>
        <div style={{display:'flex',alignItems:'center' }}>
          定位：{state.IPAddress}
        </div>
        <WingBlank>
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
  changeWeather=()=>{
    this.setState({
      isShowWeather:true
    },()=>{
      setTimeout(() => {
        this.setState({
          isShowWeather:false
        })
      }, 2000);
    })
  }
  ip=()=>{
    WAjax('https://tianqiapi.com/api?version=v61&appid=44148117&appsecret=cYkMG4cL').then(res=>{
      this.setState({
        IPAddress:res.data.city
      })
    })
  }
}
