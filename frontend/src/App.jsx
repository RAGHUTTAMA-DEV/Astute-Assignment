import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Main from './pages/main'
import Card from './components/Card'
import Button from './components/button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/card' element={<Card/>}/>
          <Route path='/button' element={<Button input="Add Workspace" type='primary' width='w-195' height='h-40'/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
