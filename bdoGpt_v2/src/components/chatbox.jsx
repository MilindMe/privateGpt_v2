import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

// flex content-center items-center
// flex content-center items-center
const Chatbox = ({prompt, setPrompt, handleSubmit }) => {
  return (
<div className="form-container w-full ">
    <form onSubmit={handleSubmit}>
     {/* INPUT BOX */}
      <input
        className="mt-1 mb-1 w-8/12 h-12 rounded-3xl
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

    {/* SUBMIT BUTTON */}
      <button
      type="submit">
        <SendIcon icon={<FaArrowUp size="15" />} text={'Send'} />
      </button>

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