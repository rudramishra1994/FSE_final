import React from 'react';
import MainBodyPrimHeader from './MainBodyPrimHeader';
import MainBodySecHeader from './MainBodySecHeader';
import QuestionList from './QuestionList';
import './HomePage.css';

const HomePage = ({questions,filterQuestion,searchTerm,incrementViewCount,handleAskQuestionClick,setCurrentPage,setCurrentQID}) => {
   


  return (
    <div className="homepage">
      <MainBodyPrimHeader searchTerm={searchTerm} handleAskQuestionClick={handleAskQuestionClick}/>
      <MainBodySecHeader numberOfQuestions={questions.length} filterQuestion={filterQuestion} />
      <QuestionList questions={questions} incrementViewCount = {incrementViewCount} setCurrentPage={setCurrentPage} setCurrentQID={setCurrentQID} />
    </div>
  );
};
export default HomePage;