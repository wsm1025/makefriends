import { NavBar, NoticeBar, Icon, Popover } from "antd-mobile";
import { useState } from "react";
import {localDB} from 'wsm-common'
import "./index.css";
function My(props) {
  const [theme, SatateTheme] = useState(true);
  const [menu, SatateMenu] = useState(false);
  const Item = Popover.Item;
  return (
    <>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        rightContent={[
          <i
            key={Math.random()}
            style={{ marginRight: "16px" }}
            onClick={changeTheme}
            className={"iconfont " + (theme ? "icon-yueliang" : "icon-taiyang")}
          ></i>,
          <Popover
            mask
            key={Math.random()}
            overlayClassName="fortest"
            overlayStyle={{ color: "currentColor" }}
            visible={menu}
            overlay={[
                localDB.get('makeFriendsToken')
                ? 
                <Item key="4" value="logout" >
                登出
                </Item>
                :
                <Item key="6" value="login">
                登陆
                </Item>,
              <Item key="5" value="close" style={{ whiteSpace: "nowrap" }}>
                关闭弹窗
              </Item>,
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onSelect={onSelect}
          >
            <div
              style={{
                height: "100%",
                padding: "0 15px",
                marginRight: "-15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon
                type="ellipsis"
                onClick={() => {
                  SatateMenu(true);
                }}
              />
            </div>
          </Popover>,
        ]}
      >
        个人中心
      </NavBar>
      <NoticeBar
        mode="closable"
        icon={<Icon type="cross-circle-o" size="xxs" />}
      >
        填写邮箱可以绑定你的账号，防止账号丢失哦
      </NoticeBar>
      <div className="userInfo">
        <img
          className="userInfo-avatar"
          src="https://img1.baidu.com/it/u=1834859148,419625166&fm=26&fmt=auto&gp=0.jpg"
          alt=""
          onClick={changeUserInfo}
        />
        <i className="iconfont icon-bi" onClick={changeUserInfo}></i>
        <p className="userInfo-name">泯酱吖</p>
        <p className="userInfo-signature">
          我是汪世民，我热爱学习，虽然学习很苦
        </p>
      </div>
      <div className="menu">
        <div className="menuItem">
          <i className="iconfont icon-tiezi" style={{color:'orange'}}></i>
          <div className="menuItm-content">
            我的帖子
            <Icon type="right" />
          </div>
        </div>
        <div className="menuItem">
          <i className="iconfont icon-huifu style={{color:'blue'}}"></i>
          <div className="menuItm-content">
            我的回复
            <Icon type="right" />
          </div>
        </div>
        <div className="menuItem">
          <i className="iconfont icon-shoucang" style={{color:'red'}}></i>
          <div className="menuItm-content">
            我的收藏
            <Icon type="right" />
          </div>
        </div>
        <div className="menuItem">
          <i className="iconfont icon-history" style={{color:'purple'}}></i>
          <div className="menuItm-content">
            浏览历史
            <Icon type="right" />
          </div>
        </div>
      </div>
    </>
  );
  function changeTheme() {
    SatateTheme(!theme);
  }
  function onSelect(opt) {
    if (opt.props.value === "close") {
      SatateMenu(false);
    } else if(opt.props.value ==='logout'){
      SatateMenu(false);
      console.log("账号登出");
    }else{
      props.history.push('/login')
    }
  }
  function changeUserInfo(){
    props.history.push('/my/userinfo')
  }
}

export default My;
