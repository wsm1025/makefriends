import './index.css'
import { NavBar, Icon } from 'antd-mobile';
function Music(props) {
    (function(){
        console.log('感谢http://taizonga.top/wy的大力支持')
    }())
    return (
        <>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => props.history.go(-1)}
        >音乐</NavBar>
            <iframe style={{ width: '100%', height: '100%'}} src="http://taizonga.top/wy" title="wy" frameBorder="0"></iframe>
        </>
    )
}

export default Music;
