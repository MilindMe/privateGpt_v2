import React from 'react'

const PremadePrompt = ({imagePath, prompt, details, link}) => {
  
  const handleOpenPdf = () => {
    const pdfUrl = '/updated-aml-cft-handbook.pdf'
}

  return (
  <div>
    {/*     <div className="card h-full bg-gray:700 p-4 text-sm shadow-md rounded-md">
    
      <p className="text-gray-700">{prompt}</p>
    </div>
    */}

    <div class="group relative m-0 flex h-52 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
    <div class="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
      {/* <img src="https://images.unsplash.com/photo-1506187334569-7596f62cf93f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3149&q=80" class="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
       */}
      

      <img src={imagePath} class="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />

     
      
    </div>
    <div class="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
   
    <a href={link} target="_blank">
      <button onClick={handleOpenPdf} className="openPdf-btn ">

      <h1 class="text-sm font-light text-white">{details}</h1>
      </button>
    </a>
    </div>
  </div>
  

  </div>    
  )
}

export default PremadePrompt
