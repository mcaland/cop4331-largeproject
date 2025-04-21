import { useState } from 'react'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Me from './pages/Me';
import User from './pages/User';
import ProfileSetup from './components/ProfileSetup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <body data-bs-theme="dark">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </Router>

      <Home />
    </body>
  )
}

export default App
