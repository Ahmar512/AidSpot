import React, { useEffect, useState } from 'react'
import GoogleMapPage from './GoogleMapPage'
import { useAuthStore } from '../store/authStore';

const HomePage = () => {
    const [address, setAddress] = useState(null);
    const {authUser, logout} = useAuthStore();
      useEffect(()=>{
        getAddresss();
      },[])
    
      const getAddresss = async () =>{
        navigator.geolocation.getCurrentPosition(gotLocation, faildToGet);
      }
      const gotLocation = (position) =>{
        
        const address = {
          lat:position.coords.latitude,
          lng:position.coords.longitude
        }
        setAddress(address);
      }
      const faildToGet = () =>{
        console.log("Failed to get postion");
      }
      const handleLogout = () =>{
        logout();
      }
  return (
    <div className='min-h-screen min-w-screen relative'>
        <div className='absolute  min-w-screen top-3 max-sm:top-10 flex justify-center items-center  '>
            <div className='px-10 py-5  bg-white z-10 rounded-xl shadow-2xl text-center max-sm:px-3 max-sm:py-2'>
                <h1 className='text-2xl font-semibold max-sm:text-lg'>Welcome {authUser.displayName}</h1>
                <p className='text-sm text-slate-700'>Here are some nearby hospitals</p>
            </div>
        </div>
        <div className='absolute min-w-screen bottom-2 flex justify-center items-center '>
            <button className='px-5 py-3 cursor-pointer text-sm font-semibold  bg-[#7886C7] hover:bg-[#A9B5DF] z-10 rounded-lg shadow-xl' onClick={handleLogout}>Logout</button>
        </div>
        


        <GoogleMapPage add={address} />
    </div>
  )
}

export default HomePage