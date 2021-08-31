import React, { Component } from 'react'
import { TextareaItem, NavBar, Icon, WhiteSpace, ImagePicker, WingBlank } from 'antd-mobile';
import './index.css'
import Weather from '@components/weather'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: [],
      key:'11',
      config:{
        src:'',
        weather:[],
        size:'',
        word:'',
        isShowWord:true,
        action:(e)=>{
          this.setState({
            key:e
          })
        }
      }
    }
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
          {state.key}
        <WingBlank>
          <div className="weather">
            <Weather {...state.config}/>
          </div>
        </WingBlank>
      </div>
    )
  }
}
