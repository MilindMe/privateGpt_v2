import React from 'react';

import { FaFire, FaPoo, FaCog, FaHome, FaPlus, FaFilePdf, FaBars} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg justify-between">
        <div className='sidebar-content'>
          <div className="flex flex-col">
            <SideBarIcon icon={<FaBars size="15" />} text={'Expand Menu'} />
            <SideBarIcon icon={<FaPlus size="15" />} text={'New Chat'} />
            <SideBarIcon icon={<FaFilePdf size="15" />} text={'bzin al lakaz'} />
            <SideBarIcon icon={<FaPoo size="15" />} text={'pls promote ur interns'} />
          </div>
        </div>

        {/* Settings Icon*/}
        <div className="flex flex-col">
          <button onclick="location.href= 'https://www.bing.com/search?q=google&cvid=b8eaf78833e1429d82448065a745813b&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBBzUxNWowajeoAgCwAgA&FORM=ANSPA1&PC=ASTS'"
          type="button">
          <SideBarIcon icon={<FaCog size="15" />} text={'Settings'} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span class="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
