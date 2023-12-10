import React from "react";
import AnswerCard from "./AnswerCard";
import "./AnswerList.css";

const AnswerList = ({ answers, user,question,setSelectedAnswer }) => {
  return (
    <div id="answerList">
      {answers && answers.length > 0 ? (
        answers.map((answer) => {
          return (
            <AnswerCard 
              key={answer._id} 
              answer={answer} 
              user={user} 
              question={question}
              setSelectedAnswer={setSelectedAnswer} // Passing onSelectAnswer to each AnswerCard
            />
          );
        })
      ) : (
        <div>No answers available.</div>
      )}
    </div>
  );
};

export default AnswerList;
