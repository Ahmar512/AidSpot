import React, { useEffect, useState } from 'react'
import GoogleMapPage from './pages/GoogleMapPage.jsx'
import axios from 'axios'
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { useAuthStore } from './store/authStore.js';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';


const App = () => {

  const {authUser, checkAuth, places} =  useAuthStore();
  
  useEffect(()=>{
    checkAuth();
    
    console.log("APP Page: ",authUser);
  },[places])
  

  return (
    <div className='min-h-screen min-w-screen'>
      <Routes>
        <Route path='/login' element={!authUser? <LoginPage /> :  <Navigate to={'/'} />} />
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!authUser? <SignInPage /> :  <Navigate to={'/'} />} />
      </Routes>

      
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App