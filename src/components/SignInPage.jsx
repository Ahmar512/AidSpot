import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'


const SignInPage = () => {
    const navigate = useNavigate()
    const {authUser, signin} = useAuthStore();
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[#F8E7F6]'>
      <div className='px-10 py-5 bg-white rounded-xl shadow-xl'>
        <h1 className='text-center font-semibold mb-2 text-3xl'>Welcome</h1>
        <p className='text-sm text-center text-slate-500 mb-3'>Get nearby hospitals</p>
        <GoogleLogin
          onSuccess={signin}
          onError={()=>{
              console.log('login failed');
          }}
        />
      </div>
    </div>
  )
}

export default SignInPage