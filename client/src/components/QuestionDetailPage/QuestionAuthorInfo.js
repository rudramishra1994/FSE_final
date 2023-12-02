import React from 'react';
import { formatDateDifference } from '../../Utility/dateFormatUtil';

const QuestionAuthorInfo = ({ question }) => {
  const timeDisplayText = formatDateDifference(question.askDate);

  return (
    <div id="authorAndTime">
    <div id="authorOfQuestion">{question.askedBy}</div>
    <div id="timeInfo">{timeDisplayText}</div>
  </div>

  );
};

export default QuestionAuthorInfo;
