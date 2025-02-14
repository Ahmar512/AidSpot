import React, { useEffect, useState } from 'react'
import GoogleMapPage from './components/GoogleMapPage'
import axios from 'axios'
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import { useAuthStore } from './store/authStore.js';
import LoginPage from './components/LoginPage.jsx';


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

      

    </div>
  )
}

export default App