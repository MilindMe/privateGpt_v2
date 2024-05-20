import React from 'react';
import { FaArrowUp } from 'react-icons/fa';


const Chatbox = ({prompt, setPrompt, handleSubmit }) => {
  return (

    <form onSubmit={handleSubmit}>
    <input
      className="mt-1 mb-4 w-7/12 h-12 rounded-3xl border-gray-200 bg-gray-900 text-sm text-white shadow-sm"
      type="text"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="What is up?"
    />

    <button
    type="submit">
      <SendIcon icon={<FaArrowUp size="15" />} text={'Send'} />
    </button>

    </form>

  );
};

const SendIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="send-button group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

export default Chatbox;