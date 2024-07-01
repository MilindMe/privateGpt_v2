import React from 'react'
import PremadePrompt from './premadePrompt'


const Greetings = ({ showPrompts }) => {
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


{showPrompts && (
<div className="promptContainer flex row-span-3 gap-2">

    <div className="prompts col-span-1 ">
    `<PremadePrompt
    link="https://drive.google.com/file/d/1dHR2nspx1Vu_N3IWVSuWAB3w0xrDA5zj/view?usp=sharing" 
    imagePath="/page1.png" 
    prompt="Doc1"
    details="FSC Handbook"/>
    </div>

    <div className="prompts col-span-1">
    `<PremadePrompt 
    link="https://www.bdo.mu/en-gb/services/bdo-co/statutory-audit"
    imagePath="/page3.png"
    prompt="Doc2" 
    details="BDO IFRS Standards"/>`
    </div>

    <div className="prompts col-span-1">
    `<PremadePrompt
    link="https://www.scribd.com/document/37771858/Internships-for-Dummies"
    imagePath="/page2.png"
    prompt="Doc3" details="Promoting Interns for Dummies"/>`
    </div>

  </div>
)}
</div>

    
  )
}

export default Greetings
