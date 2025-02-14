import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';
import { Eye, EyeOff, Loader, Loader2 } from 'lucide-react';
import { googleIcon } from '../assets';

const LoginPage = () => {
    const navigate = useNavigate()
    const {authUser, signup, login, signupWithGoogle, isLoading} = useAuthStore();
    const [user, setUser] = useState({email:"", password:""}); 
    const [showPassword, setShowPassword] = useState(false);
   

    const handlePasswordToggle = () =>{
      setShowPassword(!showPassword);
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      login(user);
    } 
    const handleGoogleAuth = () =>{
      signupWithGoogle();
    }
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[#F8E7F6]'>
      <div className='px-5 py-5 w-[350px] bg-white rounded-xl shadow-xl'>
        <h1 className='text-center font-semibold mb-2 text-3xl'>Welcome Back To <span className='text-[#e095d7]'>Aidspot</span></h1>
        <p className='text-sm text-center text-slate-500 mb-3'>Get nearby hospitals</p>
        {/* <GoogleLogin
          onSuccess={signin}
          onError={()=>{
              console.log('login failed');
          }}
        /> */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <div>
            <p className='text-sm mb-1 ml-1'>Email</p>
            <div className='px-3 py-2 border rounded-lg'>
              <input type="email" placeholder='Enter your email' className='outline-none w-full' value={user.email} onChange={(e) => setUser({...user, email:e.target.value})}/>
            </div>
          </div>
          <div>
            <p className='text-sm mb-1 ml-1'>Password</p>
            <div className='px-3 py-2 border rounded-lg flex'>
              <input type={showPassword?"text":"password"} placeholder='Enter your password' className='outline-none w-full' value={user.password} onChange={(e)=> setUser({...user, password:e.target.value})} />
              {showPassword?(<EyeOff className='text-slate-500 size-6' onClick={handlePasswordToggle} />):(<Eye className='text-slate-500 size-6' onClick={handlePasswordToggle} />)}
            </div>
          </div>
          <button type='submit' disabled={isLoading} className='rounded-lg w-full py-2 bg-[#e095d7] hover:bg-[#F8E7F6] text-sm font-semibold hover:scale-105 transition-all flex items-center justify-center'>{isLoading? <Loader2 className='animate-spin size-6'/>:"Log In"}</button>
        </form>
        <p className='text-center mt-3'>Does not have an ? <Link to={'/signup'}>Account</Link></p>
        
        <br />
        <div className='w-full flex justify-center'>
          <button className='flex gap-2 justify-center items-center py-3 border px-2 cursor-pointer' onClick={handleGoogleAuth}><img src={googleIcon} alt="" className='size-6' />  Continue with Google</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage