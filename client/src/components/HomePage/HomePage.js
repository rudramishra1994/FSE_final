import React from 'react';
import MainBodyPrimHeader from './MainBodyPrimHeader';
import MainBodySecHeader from './MainBodySecHeader';
import QuestionList from './QuestionList';
import './HomePage.css';

const HomePage = ({questions,filterQuestion,searchTerm,incrementViewCount,handleAskQuestionClick,setCurrentPage,setCurrentQID, user,
  setUser}) => {
   


  return (
    <div className="homepage">
      <MainBodyPrimHeader searchTerm={searchTerm} handleAskQuestionClick={handleAskQuestionClick} user={user} setCurrentPage={setCurrentPage} setUser={setUser}/>
      <MainBodySecHeader numberOfQuestions={questions.length} filterQuestion={filterQuestion} />
      <div className="questionListContainer">
    <QuestionList questions={questions} incrementViewCount={incrementViewCount} setCurrentPage={setCurrentPage} setCurrentQID={setCurrentQID} />
  </div>
    </div>
  );
};
export default HomePage;