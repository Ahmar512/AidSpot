import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex max-w-screen h-[100vh] justify-center items-center'>
        <Loader2 className='animate-spin size-10' />
    </div>
  )
}

export default Loading