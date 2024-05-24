import React from 'react'
import PremadePrompt from './premadePrompt'


const Greetings = () => {
  return (


<div className="grid grid-col-4 grid-row-3 ">
  <div className="greeting row-span-3 text-justify mt-14 ">

   <h1 className="animate-text-gradient bg-gradient-to-r from-teal-500
        via-purple-500 to-orange-500 bg-clip-text text-transparent 
        text-5xl font-semibold font-roboto">
            Hello, Milind
        </h1>

    <p className="font-roboto font-semibold text-gray-600 text-3xl">
          How can I help you today?
        </p>

  </div>

{/*
<div className="promptContainer flex row-span-3">

    <div className="prompts col-span-1 ">
    `<PremadePrompt prompt="Define Something in the context of Something"/>`
    </div>

    <div className="prompts col-span-1">
    `<PremadePrompt prompt="Define Something in the context of Something"/>`
    </div>

    <div className="prompts col-span-1">
    `<PremadePrompt prompt="Define Something in the context of Something"/>`
    </div>

  </div>
  */}
  
</div>

    
  )
}

export default Greetings
