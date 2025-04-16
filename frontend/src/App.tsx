import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <body data-bs-theme="dark">
      <Home/>
    </body>
  )
}

export default App
