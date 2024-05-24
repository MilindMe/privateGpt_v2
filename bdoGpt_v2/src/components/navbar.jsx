import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-700 text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 ml-16">
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="logo-placeholder" className="h-10" />
        <span className="ml-2 font-bold text-lg">bdo-gpt</span>
      </div>

      <div className="flex items-center">
        <svg
          className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM10 4a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
