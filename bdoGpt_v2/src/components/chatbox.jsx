import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

// flex content-center items-center
const Chatbox = ({prompt, setPrompt, handleSubmit }) => {
  return (
<div className="form-container w-full ">    
    <form onSubmit={handleSubmit}>
     {/* INPUT BOX */}
     <div className ="flex-col">

        <input
          className="mt-1 mb-1 w-1/2 h-12 rounded-3xl

          bg-gray-900 text-sm text-white border-0
          
          text-justify
          placeholder-gray:txt
          focus:outline-none
          focus:ring-0
          focus:border-gray-900  
          focus:bg-gray-600
          "
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="How can BDO help you today?"
        />
              <button
      type="submit" className='ml-5 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none
       focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white 
       dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
        <SendIcon icon={<FaArrowUp size="15" />} text={'Send'} />
      </button>

      </div>

    {/* SUBMIT BUTTON */}


    </form>
</div>

  );
};



const SendIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="send-button group ">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

export default Chatbox;


