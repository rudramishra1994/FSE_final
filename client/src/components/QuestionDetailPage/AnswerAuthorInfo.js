import React from 'react';
import { formatDateDifference } from '../../Utility/dateFormatUtil';

const AnswerAuthorInfo = ({ answer }) => {
  const timeDisplayText = formatDateDifference(answer.ansDate);

  return (
      <div className="answerUserInfo">
        <div className="answerAuthor">
          {answer.ansBy}
          <div className="answerTime">{timeDisplayText}</div>
        </div>
      </div>

  );
};

export default AnswerAuthorInfo;
