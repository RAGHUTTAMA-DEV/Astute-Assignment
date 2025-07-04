import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Company from './components/Company'
import Jobs from './components/Jobs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Company/>}/>
          <Route path='/company' element={<Company/>}/>
          <Route path='/jobs' element={<Jobs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
