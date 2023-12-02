import React from 'react';
// import { useNavigate } from 'react-router-dom';


const AnswerHeader = ({ numAnswers, questionTitle,handleAskQuestionClick }) => {
  // const navigate = useNavigate();

  // const handleClick = () =>{
  //   navigate('/all-questions/ask-question');
  // }
  return(
  <div id="answersHeader">
    <div id="numAnswers">{`${numAnswers} answers`}</div>
    <div id="questionTitle">{questionTitle}</div>
    <button id="askQuestionBtnOnAnswerPage" onClick={handleAskQuestionClick}>Ask a Question</button>
  </div>
  );
  };

export default AnswerHeader;