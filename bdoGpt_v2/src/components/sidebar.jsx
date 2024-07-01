import React, { useState } from 'react';
import { FaCross, FaFire, FaPoo, FaCog, FaHome, FaPlus, FaFilePdf, FaBars } from 'react-icons/fa';
import { BsDashCircle } from "react-icons/bs"
import UploadButton from './uploadButton'
import FileUpload from '../logic/FileUpload';
import axios from 'axios';


// UPLOAD PDF MODAL COMPONENT SIDEBAR 
// QUICK VERSION OF UPLOAD PDF 
// NOT MEANT FOR COMPLEX TASKS LIKE CHOOSING PDFS ETC..
const Modal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
      setShowModal(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };


  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-1000 ease-in-out">
    <div className="bg-gray-700 w-2/5 p-5 rounded shadow-lg">
     
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF only (MAX. 10MB)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        <button type="submit" className="mt-4 text-white px-4 py-2 rounded ">
          <UploadButton/>
        </button>
      </form>

      <button onClick={() => setShowModal(false)} className="mt-4 text-white px-4 py-2 rounded bg-red-500">
        <BsDashCircle/>
      </button>
    </div>
  </div>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <div className="flex">
      <div className={`fixed top-0 left-0 h-full ${expanded ? 'w-64' : 'w-16'}  flex flex-col bg-gray-900 text-white shadow-lg justify-between transition-all `}>
        <div className="sidebar-content">
          <div className="flex flex-col">
            <button onClick={() => setExpanded((curr) => !curr)} className="sidebar-icon group">
              <FaBars size="15" />
              <span className="sidebar-tooltip group-hover:scale-100">Expand Menu</span>
            </button>

            <button onClick={handleRefresh}>
            <SideBarIcon icon={<FaPlus size="15" />} text={expanded ? 'New Chat' : 'New Chat'} />
            </button> 

            <button onClick={() => setShowModal(true)} className="sidebar-icon group">
            <SideBarIcon icon={<FaFilePdf size="15" />} text={expanded ? 'Upload Pdf' : 'Upload PDF'} />
            </button>

            <a href="http://localhost:8503/">
            <SideBarIcon icon={<FaFire size="15" />} text={expanded ? 'pls promote ur interns' : 'pls promote ur interns'} />
            </a>
          </div>
        </div>

        {/* Settings Icon */}
        <div className="flex flex-col">
          <button onClick={() => setShowModal(true)} className="sidebar-icon group">
            <FaCog size="15" />
            <span className="sidebar-tooltip group-hover:scale-100">{expanded ? 'Settings' : 'Settings'}</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    {text && (
      <span className="sidebar-tooltip group-hover:scale-100">
        {text}
      </span>
    )}
  </div>
);

export default Sidebar;
