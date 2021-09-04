import React, { Component } from 'react';
import { NavBar, Toast, WhiteSpace, WingBlank } from "antd-mobile";
import { localDB } from 'wsm-common';
import { publishDeatail as publishDeatailApi } from '@api/basic/LoginApi'
import moment from 'moment'
import './index.css'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            size: 5,
            list: [],
            isload: true,
            text: '加载完成'
        }
    }
    componentDidMount() {
        this.publishDeatail()
        this.addevent()
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.f)
    }
    render() {
        const state = this.state;
        return (
            <div className="home">
                <NavBar
                 icon={<i className='iconfont icon-shuaxin_huaban1'></i>}
                 onLeftClick={this.refesh}
                    mode="light"
                    rightContent={[<i onClick={this.Publish} style={{ fontSize: 25 }} key={Math.random()} className='iconfont icon-icon-' />]}
                >
                    首页
                </NavBar>
                <div className="content">
                    {
                        state.list.map(el => {
                            return (
                                <div onClick={(e)=>this.detail(el.id)} key={Math.random()} style={{ marginTop: 10, paddingBottom: 10 }}>
                                    <WhiteSpace size='md' />
                                    <WingBlank size="lg">
                                        <div className='contentDetail'>
                                            <div className="text">
                                                {el.content}
                                            </div>
                                            <div className="imgs">
                                                {
                                                    el.imgs.split(',').map(e => {
                                                        return (
                                                            <img key={Math.random()} src={e} alt="" />
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="info">
                                                <div className="weather">
                                                    心情：<svg className="icon" aria-hidden="true">
                                                        <use xlinkHref={el.weather}></use>
                                                    </svg>
                                                </div>
                                                <div className="postion">
                                                    地点:{el.position}
                                                </div>
                                            </div>
                                            <div className="time">
                                                <p className='createtime'>创建时间：{moment(el.create_time).format('YYYY-MM-DD HH:mm:ss')}</p>
                                                {el.isEdit === 'true' ? <p className='updatetime'>最后更新时间：{moment(el.update_time).format('YYYY-MM-DD HH:mm:ss')}</p> : ''}
                                            </div>
                                        </div>
                                    </WingBlank>
                                </div>
                            )
                        })
                    }
                    <div className="isload">{state.text}</div>
                </div>
            </div>
        );
    }
    refesh=()=>{
        window.scrollTo(0,0)
       this.setState({
           num:0,
           list:[],
           isload:true
       },()=>{
           this.publishDeatail()
       })
    }
    Publish = () => {
        if (!localDB.get('makeFriendsToken')) {
            return this.props.history.push('/login')
        }
        this.props.history.push('/home/publish')
    }
    detail=(id)=>{
        this.props.history.push(`/home/detail/${id}`)
    }
    publishDeatail = () => {
        publishDeatailApi(this.state.num, this.state.size).then(res => {
            if (res.data.data.length) {
                    if (this.state.isload) {
                        if (res.data.code) {
                            this.setState({
                                list: res.data.data
                            })
                        } else {
                            Toast.fail(res.data.msg)
                        }
                    } else {
                        this.setState({
                            text: '已无更多数据',
                            isload: false
                        })
                    }
            }
        })
    }
    f=()=>{
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 100) {
            this.setState({
                num: this.state.num + 1
            }, () => {
                if(this.state.isload){
                publishDeatailApi(this.state.num, this.state.size).then(res => {
                    if (res.data.data.length||Object.prototype.toString.call(res.data.data) === "[object Object]") {
                            if (this.state.isload) {
                                if (res.data.code) {
                                    if (Object.prototype.toString.call(res.data.data) === "[object Object]") {
                                        this.setState({
                                            list: [...this.state.list,...[res.data.data]]
                                        })
                                    } else {
                                        this.setState({
                                            list: [...this.state.list,...res.data.data]
                                        })
                                    }
                                } else {
                                    Toast.fail(res.data.msg)
                                }
                            } else {
                                this.setState({
                                    text: '已无更多数据',
                                    isload: false
                                })
                            }
                    } else {
                        this.setState({
                            text: '已无更多数据',
                            isload: false
                        })
                    }
                })
            }
            })
        }
    }
    addevent = () => {
        window.addEventListener('scroll', this.f)
    }
    
}

export default Index;
