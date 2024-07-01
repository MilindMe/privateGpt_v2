import React from 'react'

const Loading = () => {
  return (
    <div>
        <div class='flex space-x-2 justify-center items-center bg-gray-700 h-screen'>
            <span class='sr-only'>Loading...</span>
            <div class='h-8 w-8 bg-blue-900 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div class='h-8 w-8 bg-red-900 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div class='h-8 w-8 bg-blue-900 rounded-full animate-bounce'></div>
        </div>
    </div>
    
  )
}

export default Loading
