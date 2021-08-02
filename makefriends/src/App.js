import './App.css';
import Footer from '@components/footer/index'
import { IconFontItem } from '@api/basic/IconfontApi'
import {useEffect} from 'react'
import {Route,Switch,Redirect,useHistory} from 'react-router-dom'
import Home from '@pages/home'
import Look from '@pages/look'
import Music from '@pages/music'
import My from '@pages/my'
import NotFound from '@pages/NotFound'
function App() {
  // 插入icon
  useEffect(() => {
    IconFontItem().then(res=>{
      const icon = document.createElement('link');
      icon.rel = 'stylesheet'
      icon.href = res.data.data.url
      document.head.appendChild(icon)
    })
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path="/home"  render={(props) => <Home {...props} />}></Route>
        <Route path="/look" render={(props) => <Look {...props} />}></Route>
        <Route path="/music" render={(props) => <Music {...props} />}></Route>
        <Route path="/my" render={(props) => <My {...props} />}></Route>
        <Route path="/404" render={(props) => <NotFound {...props} />}></Route>
        <Redirect to="/home" from='/' exact></Redirect>
        <Redirect to='/404'/>
      </Switch>
      <Footer {...useHistory()}/>
    </div>
  );
}

export default App;
