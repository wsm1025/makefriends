import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import "./index.css";
import {localDB} from 'wsm-common'
class footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: localDB.get('tabKey'),
      isShow: props.location.pathname === "/login" ||props.location.pathname === "/register"
    };
  }
  // componentDidMount(){
  //   // if(localDB.get('tabKey')){
  //   //   this.setState({
  //   //     selectedTab:localDB.get('tabKey')
  //   //   }) 
  //   // }else{
  //   //   this.props.push('home')
  //   // }
  // }
  componentWillReceiveProps(props){
    this.setState({
      selectedTab: props.location.pathname.split('/')[1],
      isShow: props.location.pathname === "/login"||props.location.pathname === "/register"
    })
  }
  render() {
    return (
      !this.state.isShow?
      <footer >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<i className="iconfont icon-shouye"></i>}
            selectedIcon={<i className="iconfont icon-shouye-copy"></i>}
            selected={this.state.selectedTab === "home"}
            onPress={(id='/home') => {
              localDB.set('tabKey',id.split('/')[1])
              this.props.push(id)
              this.setState({
                selectedTab: "home",
              });
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-yinyue"></i>}
            selectedIcon={<i className="iconfont icon-yinyue-copy"></i>}
            title="听音乐"
            key="music"
            selected={this.state.selectedTab === "music"}
            onPress={(id='/music') => {
              localDB.set('tabKey',id.split('/')[1])
              this.props.push(id)
              this.setState({
                selectedTab: "music",
              });
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-chakan"></i>}
            selectedIcon={<i className="iconfont icon-chakan-copy"></i>}
            title="看一看"
            key="look"
            selected={this.state.selectedTab === "look"}
            onPress={(id="/look") => {
              localDB.set('tabKey',id.split('/')[1])
              this.props.push(id)
              this.setState({
                selectedTab: "look",
              });
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-wode"></i>}
            selectedIcon={<i className="iconfont icon-wode-copy"></i>}
            title="关于我"
            key="my"
            selected={this.state.selectedTab === "my"}
            onPress={(id='/my') => {
              localDB.set('tabKey',id.split('/')[1])
              this.props.push(id)
              this.setState({
                selectedTab: "my",
              });
            }}
          ></TabBar.Item>
        </TabBar>
      </footer>
      :
      ''
    );
  }
}

export default footer;
