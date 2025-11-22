
import './App.css'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Main from './pages/main'
import ProtectAuth from './Routes/protect'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Login />} />
      <Route path='/register' element= {<Register />} />
      <Route path='/page' element= {<ProtectAuth />}>
        <Route path='main' element= {<Main />} />
      </Route>    
    </Routes>
    </BrowserRouter>
  )
}

export default App
