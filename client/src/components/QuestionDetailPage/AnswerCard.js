import React from 'react';
import AnswerAuthorInfo from './AnswerAuthorInfo';
import { parseTextWithHyperlinks } from '../../Utility/utility';
const AnswerCard = ({ answer }) => {
  return (
    <div className="answerCard">
      <div className="answerText">{parseTextWithHyperlinks(answer.text)}</div>
      <AnswerAuthorInfo answer={answer}/>
    </div>
  );
};

export default AnswerCard;
