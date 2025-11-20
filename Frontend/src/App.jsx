import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Login from './pages/login'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Login />} />
      <Route path='/main' element= {<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
