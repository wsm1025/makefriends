import React, { Component } from 'react'
import './index.css'
export default class Weather extends Component {
  static weather=[
    {key:'#icon-xiaxue',value:'雪'},
    {key:'#icon-duoyun', value:'多云'},
    {key:'#icon-yintian', value:'阴'},
    {key:'#icon-qingtian',value:'晴'},
    {key:'#icon-feng',value:'风'},
    {key:'#icon-yutian',value:'雨天'},
    {key:'#icon-lighting',value:'闪电'},
  ];
  constructor(props) {
    super(props)
    this.state = {
      weather: !props.weather.length?Weather.weather
      :[...Weather.weather,...props.weather]
    }
  }
  componentDidMount() {
    if (!document.getElementById('w-weather-script-dafault')) {
      const icon = document.createElement('script');
      icon.setAttribute('id', 'w-weather-script-dafault');
      icon.src = '//at.alicdn.com/t/font_2781085_74bgcbq2ka8.js';
      console.log('加载w-weather-script-dafault')
      document.head.appendChild(icon);
    }
    if(this.props?.src.length>=10&&!document.getElementById('w-weather-script')){
      const icon = document.createElement('script');
      icon.setAttribute('id', 'w-weather-script');
      icon.src = this.props.src;
      console.log('加载w-weather-script')
      document.head.appendChild(icon);
    }
    const styleConfig = `
    .icon {
      width: ${!this.props.size?3:this.props.size}em;
      height: ${!this.props.size?3:this.props.size}em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    `;
    if (!document.getElementById('w-weather-style')) {
      const style = document.createElement('style');
      style.setAttribute('id', 'w-weather-style');
      console.log('加载w-weather-style');
      if (style.styleSheet) {
        style.styleSheet.cssText = styleConfig;
      } else {
        style.appendChild(document.createTextNode(styleConfig));
      }
      document.head.appendChild(style);
    }
  }
  render() {
    const state = this.state
    return (
      <div className='weather'>
        <p>{this.props.isShowWord?(!this.props.word.length?`心情:`:this.props.word):''}</p>
        <div className='list'>
          {
            state.weather.map((el, index) => {
              return (
                <svg onClick={()=>(this.props.action ? this.props.action(el[Object.keys(el)[0]]) : console.log(el[Object.keys(el)[1]]))} key={index} className="icon" aria-hidden="true">
                  <use xlinkHref={el[Object.keys(el)[0]]}></use>
                </svg>
              )
            })
          }
        </div>
      </div>
    )
  }
}
