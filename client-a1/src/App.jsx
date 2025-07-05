import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Company from './components/Company'
import Jobs from './components/Jobs'
import './utils/api' // Initialize API configuration with cookies

function App() {
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
