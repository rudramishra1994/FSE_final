import React from 'react';
// import { useNavigate } from 'react-router-dom';

const MainBodyPrimHeader = ({searchTerm,handleAskQuestionClick}) => {
  // const navigate = useNavigate();

  // const handleAskQuestionClick = () => {
  //   navigate('/all-questions/ask-question');
  // };

  return (
    <div id="mainBodyPrimHeader">
       <div id="mainBodyPrimHeaderText">
        {searchTerm ? 'Search Results' : 'All Questions'}
      </div>
      <button id="askQuestionBtn" value="Ask a Question" onClick={handleAskQuestionClick}>Ask a Question</button>
    </div>
  );
};

export default MainBodyPrimHeader;