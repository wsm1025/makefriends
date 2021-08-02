import { NavBar, Icon, Popover } from "antd-mobile";
import { useState } from "react";
function My() {
  const [theme, SatateTheme] = useState(true);
  const [menu, SatateMenu] = useState(false);
  const Item = Popover.Item;
  return (
    <div>
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
              <Item key="4" value="logout" data-seed="logId">
                登出账号
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
    </div>
  );
  function changeTheme() {
    SatateTheme(!theme);
  }
  function onSelect(opt) {
    if (opt.props.value === "close") {
      SatateMenu(false);
    } else {
      SatateMenu(false);
      console.log("账号登出");
    }
  }
}

export default My;
