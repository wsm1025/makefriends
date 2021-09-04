import React, { Component } from 'react'
import { TextareaItem, NavBar, Icon, WhiteSpace, ImagePicker, WingBlank, Button, Toast } from 'antd-mobile';
import Weather from '@components/weather'
import { WAjax } from 'wsm-common'
import { publishDetailImg, publishOneDeatail, publishEdit as publishEditApi } from '@api/basic/LoginApi'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: [],
      weather: '#icon-xiaxue',
      isShowWeather: true,
      IPAddress: '',
      textArea: '',
      id: 0,
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
          const imgs = []
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
            isOwn: Res.user_name === JSON.parse(localStorage.getItem('info')).user_name || ''
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
      <div className='publish'>
        <NavBar
          mode="light"
          icon={<Icon key={Math.random()} type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[<Button key={Math.random()} disabled={!state.textArea.length} type="primary" size="small" onClick={this.publishEdit}>确认发表</Button>]}
        >
          编辑
        </NavBar>
        <WhiteSpace size='md' />
        <TextareaItem
          rows={5}
          count={300}
          value={this.state.textArea}
          onChange={e => this.setState({ textArea: e })}
        />
        <ImagePicker
          files={state.avatar}
          onChange={this.onChange}
          selectable={state.avatar.length < 6}
          multiple
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
      const avatar = this.state.avatar;
      avatar.splice(index, 1)
      this.setState({
        avatar
      })
    } else if (type === 'add') {
      const result = await publishDetailImg(files[this.state.avatar.length].file)
      if (result.data.code) {
        Toast.success(result.data.msg, 1)
        this.setState({
          avatar: [...this.state.avatar, { url: result.data.data, id: Math.random() }],
        }, () => {
          console.log(this.state.avatar)
        })
      } else {
        Toast.fail(result.data.msg)
      }
    }
  }
  publishEdit = () => {
    const data = this.state;
    delete data.config
    publishEditApi(data).then(res => {
      if (res.data.code) {
        Toast.success(res.data.msg)
        setTimeout(() => {
          this.props.history.replace(`/home/detail?id=${this.state.id}`)
        }, 500);
      } else {
        Toast.fail(res.data.msg)
      }
    })
  }
}
