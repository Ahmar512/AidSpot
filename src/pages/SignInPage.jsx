import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import { Eye, EyeOff } from 'lucide-react'


const SignInPage = () => {
    
    const {signup, isLoading} = useAuthStore();
    const [user, setUser] = useState({name:"", email:"", password:""}); 
    const [showPassword, setShowPassword] = useState(false);
   

    const handlePasswordToggle = () =>{
      setShowPassword(!showPassword);
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      signup(user);
    } 
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[#A9B5DF]'>
      <div className='px-5 py-5 w-[350px] bg-white rounded-xl shadow-xl'>
        <h1 className='text-center font-semibold mb-2 text-3xl'>Welcome To <span className='text-[#7886C7]'>Aidspot</span></h1>
        <p className='text-sm text-center text-slate-500 mb-3'>Get nearby hospitals</p>
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <div>
            <p className='text-sm mb-1 ml-1'>Name</p>
            <div className='px-3 py-2 border rounded-lg'>
              <input type="text" required placeholder='Enter your name' className='outline-none w-full' value={user.name} onChange={(e) => setUser({...user, name:e.target.value})} />
            </div>
          </div>
          <div>
            <p className='text-sm mb-1 ml-1'>Email</p>
            <div className='px-3 py-2 border rounded-lg'>
              <input type="email" required placeholder='Enter your email' className='outline-none w-full' value={user.email} onChange={(e) => setUser({...user, email:e.target.value})}/>
            </div>
          </div>
          <div>
            <p className='text-sm mb-1 ml-1'>Password</p>
            <div className='px-3 py-2 border rounded-lg flex'>
              <input type={showPassword?"text":"password"} required placeholder='Enter your password' className='outline-none w-full' value={user.password} onChange={(e)=> setUser({...user, password:e.target.value})} />
              {showPassword?(<EyeOff className='text-slate-500 size-6' onClick={handlePasswordToggle} />):(<Eye className='text-slate-500 size-6' onClick={handlePasswordToggle} />)}
            </div>
          </div>
          <button type='submit' disabled={isLoading} className='rounded-lg w-full py-2 bg-[#A9B5DF] hover:bg-[#7886C7] text-sm font-semibold hover:scale-105 transition-all'>{isLoading? <Loader2 className='animate-spin size-6'/>:"Create Account"}</button>
        </form>
        <p className='text-center mt-3'>Already have an <Link to={'/login'} className='hover:underline'>Account</Link></p>
      </div>
    </div>
  )
}

export default SignInPage