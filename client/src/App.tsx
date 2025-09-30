import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Notebook from './pages/Notebook'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Subject from './pages/Subject'
import TopicPage from './pages/TopicPage'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize state from localStorage
    const storedDarkMode = localStorage.getItem('darkMode')
    return storedDarkMode ? JSON.parse(storedDarkMode) : false
  })

  useEffect(() => {
    // Update localStorage whenever darkMode changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className=''>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path='/' element={<Dashboard darkMode={darkMode} />} />
        <Route path='/notebooks' element={<Notebook darkMode={darkMode} />} />
        <Route path='/notebook/:id' element={<Subject darkMode={darkMode} />} />
        <Route path='/subject/:id' element={<TopicPage darkMode={darkMode} />} />
        <Route path='/profile' element={<Profile darkMode={darkMode} />} />
        <Route path='/settings' element={<Settings darkMode={darkMode} />} />
        <Route path='/about' element={<div>About</div>} />
      </Routes>
    </div>
  )
}

export default App
