import React from 'react';
import AnswerCard from './AnswerCard';

const AnswerList = ({ answers }) => {
  return (
    <div id="answerList">
      {answers && answers.length > 0 ? (
        answers.map(answer => {
          return <AnswerCard key={answer._id} answer={answer} />;
        })
      ) : (
        <div>No answers available.</div>
      )}
    </div>
  );
};


export default AnswerList;
