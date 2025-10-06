import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Notebooks from './pages/Notebook'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Subject from './pages/Subject'
import TopicPage from './pages/TopicPage'
import LoginRegister from './pages/LoginRegister'
import { Toaster } from 'sonner'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode')
    return storedDarkMode ? JSON.parse(storedDarkMode) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className=''>
      <Toaster position="bottom-right" richColors />
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notebooks"
          element={
            <ProtectedRoute>
              <Notebooks darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notebook/:id"
          element={
            <ProtectedRoute>
              <Subject darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subject/:id"
          element={
            <ProtectedRoute>
              <TopicPage darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/log" element={<LoginRegister />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </div>
  )
}

export default App
