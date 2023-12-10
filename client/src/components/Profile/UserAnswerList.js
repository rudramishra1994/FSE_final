import React from "react";
import UserAnswerCard from "./UserAnswerCard";
import "../QuestionDetailPage/AnswerList.css";

const UserAnswerList = ({
  answers,
  user,
  answerOperation,
  setAnswerOperation,
}) => {
  return (
    <div id="answerList">
      {answers && answers.length > 0 ? (
        answers.map((answer) => {
          return (
            <UserAnswerCard
              key={answer._id}
              answer={answer}
              user={user}
              answerOperation={answerOperation}
              setAnswerOperation={setAnswerOperation}
            />
          );
        })
      ) : (
        <div>No answers available.</div>
      )}
    </div>
  );
};

export default UserAnswerList;
