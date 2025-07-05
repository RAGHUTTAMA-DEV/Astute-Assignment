import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Post from './components/post'
import Details from './components/details'
import Comment from './components/comment'
import CreatePost from './components/CreatePost'
import './utils/api' // Initialize API configuration with cookies

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Navigate to="/signin" replace />}/>
          <Route path='/post' element={
            <ProtectedRoute>
              <Post/>
            </ProtectedRoute>
          }/>
          <Route path='/post/:id' element={
            <ProtectedRoute>
              <Details/>
            </ProtectedRoute>
          }/>
          <Route path='/post/:id/add-comment' element={
            <ProtectedRoute>
              <Comment/>
            </ProtectedRoute>
          }/>
          <Route path='/comment/:id' element={
            <ProtectedRoute>
              <Comment/>
            </ProtectedRoute>
          }/>
          <Route path='/create-post' element={
            <ProtectedRoute>
              <CreatePost/>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
