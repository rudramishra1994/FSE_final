import React from 'react';
import './SideNavBar.css';
// import { useLocation, useNavigate } from 'react-router-dom';


const SideBarNav = ({currentPage,setCurrentPage,handleQuestionNavClick}) => {
  return (
    <div id="sideBarNav">
      <a
        href="#"
        className={`sideBarLink ${currentPage === 'all-questions' ||currentPage.includes('ask-question') ||currentPage.includes('questionDetail') || currentPage.includes('searchResults') || currentPage.includes('new-answer') ? 'activeLink' : ''}`}
        id="questionpage"
        onClick={handleQuestionNavClick}
      >
        Questions
      </a>
      <a
        href="#"
        className={`sideBarLink ${ currentPage.includes('tagPage') || currentPage.includes('tagged-question') ? 'activeLink' : ''}`}
        id="tagpage"
        onClick={() => setCurrentPage('tagPage')}
      >
        Tags
      </a>
    </div>
  );
};

export default SideBarNav;