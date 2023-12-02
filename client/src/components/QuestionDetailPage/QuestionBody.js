
import React from 'react';
import QuestionAuthorInfo from './QuestionAuthorInfo';
import { parseTextWithHyperlinks } from '../../Utility/utility';

const QuestionBody = ({question}) => (
  <div id="questionBody">
    <div id="numViews">{`${question.views} views`}</div>
    <div id="questionText">{parseTextWithHyperlinks(question.text)}</div>
    <QuestionAuthorInfo question={question}/>
  </div>
);

export default QuestionBody;
