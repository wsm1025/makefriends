import React, { Component } from 'react'
import './index.css'
export default class index extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.history.go(-1)
        }, 1000)
    }
    render() {
        return (
            <div className="notfound">
                <div className='status'>404</div>
                <div>1s后跳转之前页面</div>
            </div>
        )
    }
}
