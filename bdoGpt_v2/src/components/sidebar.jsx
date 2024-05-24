import React from 'react';

import { FaSun, FaInfo, FaPoo, FaCog, FaHome, FaPlus, FaFilePdf, FaBars} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg justify-between">
        <div className='sidebar-content'>
          <div className="flex flex-col">
            <SideBarIcon icon={<FaBars size="14" />} text={'Expand Menu'} />
            <SideBarIcon icon={<FaPlus size="14" />} text={'New Chat'} />
            <SideBarIcon icon={<FaFilePdf size="14" />} text={'bzin al lakaz'} />
            <SideBarIcon icon={<FaPoo size="14" />} text={'pls promote ur interns'} />
          </div>
        </div>

        {/* Settings Icon*/}
        <div className="flex flex-col">
          <button onclick="location.href= 'https://www.bing.com/search?q=google&cvid=b13eaf7131333e1429d1324413065a7451313b&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg13MgYIAhBFGDwyBggDEEUYPNIBBzUxNWowajeoAgCwAgA&FORM=ANSPA1&PC=ASTS'"
          type="button">
          <SideBarIcon icon={<FaSun size="14" />} text={'Dark Mode'} />
          <SideBarIcon icon={<FaCog size="14" />} text={'Settings'} />
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
