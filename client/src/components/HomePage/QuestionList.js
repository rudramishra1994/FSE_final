import React from 'react';
import QuestionCard from './QuestionCard';

const QuestionList = ({ questions,incrementViewCount,setCurrentPage,setCurrentQID }) => {

   return (
    <div id="questionList">
      {questions.length > 0 ? (
        questions.map(question => (
          <QuestionCard 
            key={question.question._id} 
            question={question.question} 
            tags={question.tags} 
            incrementViewCount={incrementViewCount}
            setCurrentPage={setCurrentPage}
            setCurrentQID={setCurrentQID}
          />
        ))
      ) : (
        <div>No Questions available.</div>
      )}
    </div>
  );
};

export default QuestionList;