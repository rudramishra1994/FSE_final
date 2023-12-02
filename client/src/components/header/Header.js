import React from 'react';
import './Header.css';
// import { useNavigate } from 'react-router-dom';


const Header = ({ headerText, onSearch,/*setCurrentPage*/ }) => {
  // const navigate = useNavigate();
  // const handleSearch =(event)=>{
  //   if(onSearch(event))
  //     setCurrentPage('searchResults');
  // };
  return (
    <div id="header" className="header">
      <div className="headerText">{headerText}</div>
      <input
        className="searchBar"
        id="searchBar"
        type="text"
        placeholder="Search..."
        onKeyUp={onSearch}
      />
    </div>
  );
};

export default Header;