import { NavBar, NoticeBar, Icon, Popover } from "antd-mobile";
import { useState, useEffect } from "react";
import { localDB } from 'wsm-common'
import "./index.css";
function My(props) {
  const [theme, SatateTheme] = useState(true);
  const [menu, SatateMenu] = useState(false);
  const [userinfo, StateUserInfo] = useState({
    avatar: 'https://img1.baidu.com/it/u=1834859148,419625166&fm=26&fmt=auto&gp=0.jpg',
    user_name: 'makeFriends',
    signature: '交友'
  });
  const Item = Popover.Item;
  useEffect(() => {
    getInfo()
  }, [userinfo.avatar, userinfo.user_name, userinfo.signature]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <NavBar
        mode="light"
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
              <Item key="5" value="close" style={{ whiteSpace: "nowrap", display: isMobile() ? 'none' : 'block' }}>
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
      {!JSON.parse(localDB?.get('info'))?.email ?
        <NoticeBar
          mode="closable"
          icon={<Icon type="cross-circle-o" size="xxs" />}
        >
          填写邮箱可以绑定你的账号，防止账号丢失哦
        </NoticeBar>
        : ''
      }
      <div className="userInfo">
        <img
          className="userInfo-avatar"
          src={userinfo.avatar}
          alt=""
          onClick={changeUserInfo}
        />
        <i className="iconfont icon-bi" onClick={changeUserInfo}></i>
        <p className="userInfo-name">{userinfo.user_name}</p>
        <p className="userInfo-signature">
          {userinfo.signature}
        </p>
      </div>
      <div className="menu">
        <div className="menuItem">
          <i className="iconfont icon-tiezi" style={{ color: 'orange' }}></i>
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
          <i className="iconfont icon-shoucang" style={{ color: 'red' }}></i>
          <div className="menuItm-content">
            我的收藏
            <Icon type="right" />
          </div>
        </div>
        <div className="menuItem">
          <i className="iconfont icon-history" style={{ color: 'purple' }}></i>
          <div className="menuItm-content">
            浏览历史
            <Icon type="right" />
          </div>
        </div>
        <div className="menuItem" onClick={() => { props.history.push('/my/updatePassword') }}>
          <i className="iconfont icon-mima" style={{ color: 'pink' }}></i>
          <div className="menuItm-content">
            修改密码
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
    console.log(opt.props.value);
    if (opt.props.value === "close") {
      SatateMenu(false);
    } else if (opt.props.value === 'logout') {
      SatateMenu(false);
      localDB.del('makeFriendsToken')
      localDB.del('info')
      console.log("账号登出");
    } else {
      props.history.push('/login')
      localDB.set('tabKey', 'login')
    }
    getInfo()
  }
  function changeUserInfo() {
    props.history.push('/my/userinfo')
  }
  function getInfo() {
    const userInfo = JSON.parse(localDB.get('info')) || {
      avatar: 'https://img1.baidu.com/it/u=1834859148,419625166&fm=26&fmt=auto&gp=0.jpg',
      user_name: 'makeFriends',
      signature: '交友'
    }
    StateUserInfo({
      avatar: userInfo.avatar,
      user_name: userInfo.user_name,
      signature: userInfo.signature
    })
  }
  function isMobile() {
    var mobile = navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|operamobi|operamini|ucweb|windowsce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i) != null;
    return mobile;
  }
}

export default My;
