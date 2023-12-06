
import React,{useState} from 'react';
import QuestionAuthorInfo from './QuestionAuthorInfo';
import { parseTextWithHyperlinks } from '../../Utility/utility';

const QuestionBody = ({question}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? parseTextWithHyperlinks(question.text): question.text.substring(0, 200) + '...';

  return ( <div id="questionBody">
      <div id="numViews">{`${question.views} views`}</div>
      <div className='questionTextContainer'>
      <div id="questionText">{displayText}</div>
      {question.text.length > 200 && (
        <button onClick={toggleText} className="expandButton">
          {isExpanded ? '↑' : '↓'}
        </button>
      )}
      </div>
      
      <QuestionAuthorInfo question={question}/>
    </div>
  );
}





export default QuestionBody;
