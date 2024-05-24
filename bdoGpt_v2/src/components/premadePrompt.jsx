import React from 'react'

const PremadePrompt = ({prompt}) => {
  return (
    <div>
  <div className="card h-full bg-white p-4 text-sm shadow-md rounded-md">
    
    <p className="text-gray-700">{prompt}</p>
  </div>

    </div>    
  )
}

export default PremadePrompt
