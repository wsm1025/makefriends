import './App.css';
import Footer from '@components/footer/index'
import { IconFontItem } from '@api/basic/IconfontApi'
import { useEffect } from 'react'
import { Route, Switch, Redirect, useHistory, withRouter } from 'react-router-dom'
import Home from '@pages/home'
import Look from '@pages/look'
import Music from '@pages/music'
import My from '@pages/my'
import NotFound from '@pages/NotFound'
import UserInfo from '@pages/my/userInfo'
import Login from '@pages/login'
import { localDB } from 'wsm-common'
function App() {
  // 插入icon
  useEffect(() => {
    if (localDB.get('icon')) {
      console.log('icon加载local');
      const icon = document.createElement('link');
      icon.rel = 'stylesheet'
      icon.href = localDB.get('icon')
      document.head.appendChild(icon)
    } else {
      IconFontItem().then(res => {
        console.log('icon加载network');
        const icon = document.createElement('link');
        icon.rel = 'stylesheet'
        icon.href = res.data.data.url
        localDB.set('icon', res.data.data.url)
        document.head.appendChild(icon)
      })
    }
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path="/home" render={(props) => <Home {...props} />} />
        <Route path="/look" render={(props) => <Look {...props} />} />
        <Route path="/music" render={(props) => <Music {...props} />} />
        <Route path="/my" render={(props) => <My {...props} />} exact />
        <Route path="/my/userinfo" render={(props) => <UserInfo {...props} />} />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/404" render={(props) => <NotFound {...props} />} />
        <Redirect to="/home" from='/' exact></Redirect>
        <Redirect to='/404' />
      </Switch>
      <Footer {...useHistory()} />
    </div>
  );
}

export default withRouter(App);
