import React, { Component } from 'react';
import { NavBar } from "antd-mobile";
import { localDB } from 'wsm-common';
class Index extends Component {
    render() {
        return (
            <div className="home">
                <NavBar
                    mode="light"
                    // icon={<Icon key={Math.random()} type="left" />}
                    // onLeftClick={() => this.props.history.go(-1)}
                    rightContent={[<i onClick={this.Publish} style={{fontSize:25}} key={Math.random()} className='iconfont icon-icon-'/>]}
                >
                    首页
                </NavBar>
            </div>
        );
    }
    Publish=()=>{
        if(!localDB.get('makeFriendsToken')){
            return this.props.history.push('/login')
        }
        this.props.history.push('/home/publish')
    }
}

export default Index;
