import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import { FaFire, FaPoo, FaCog, FaHome, FaPlus, FaFilePdf, FaBars } from 'react-icons/fa';



const Layout = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      <div className={`flex flex-col flex-grow transition-all ${expanded ? 'ml-28' : 'ml-16'}`}>
        {/*<Navbar/>*/}
        <div className="flex-grow overflow-auto p-4">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Layout;
