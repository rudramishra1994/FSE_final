import React from 'react';
import MainBodyPrimHeader from './MainBodyPrimHeader';
import MainBodySecHeader from './MainBodySecHeader';
import QuestionList from './QuestionList';
import './HomePage.css';

const SearchPage = ({questions,filterQuestion,searchTerm,setCurrentPage,setCurrentQID,incrementViewCount,handleAskQuestionClick}) => {
   


  return (
    <div className="homepage">
      <MainBodyPrimHeader searchTerm={searchTerm} handleAskQuestionClick={handleAskQuestionClick}/>
      <MainBodySecHeader numberOfQuestions={questions.length} filterQuestion={filterQuestion} />
      <QuestionList questions={questions} incrementViewCount = {incrementViewCount} setCurrentPage={setCurrentPage} setCurrentQID={setCurrentQID}  />
    </div>
  );
};
export default SearchPage;