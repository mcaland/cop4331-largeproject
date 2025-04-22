import { useState } from 'react'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Me from './pages/Me';
import User from './pages/User';
import Setup from './pages/Setup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <Router>
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Setup />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </Router>

      <></>
    </div>
  )
}

export default App
