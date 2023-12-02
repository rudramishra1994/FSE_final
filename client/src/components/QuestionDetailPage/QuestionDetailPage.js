import React, { useEffect, useState } from 'react';
import AnswerHeader from './AnswerHeader';
import QuestionBody from './QuestionBody';
import AnswerList from './AnswerList';
// import { useParams,useNavigate } from 'react-router-dom';
import ApplicationModel from '../../models/ApplicationModel';
import './QuestionDetailPage.css'

const appModel = new ApplicationModel();
const QuestionDetailPage = ({qid,handlePostAnswerClick,handleAskQuestionClick}) => {
  // const { qid } = useParams();
  const [question,setQuestion] = useState(null);
  const [answers,setAnswers] = useState(null);
  // const navigate = useNavigate();

  const handlePostAnswerBtnClick = () =>{
    handlePostAnswerClick(qid);
  }

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const q = await appModel.getQuestionById(qid);
        const aList = await appModel.getAnswersForQuestion(qid);
        setQuestion(q);
        setAnswers(aList);
      } catch (error) {
        console.error('Failed to fetch question or answers:', error);
      }
    };
    fetchData();
  },[])
  
  return (
    <div className = "questiondetailpage">
    {question && question.ansIds && answers ? (
      <>
        <AnswerHeader numAnswers={question.ansIds.length} questionTitle={question.title} handleAskQuestionClick={handleAskQuestionClick} />
        <QuestionBody question={question} />
        <AnswerList answers={answers}/>
        <div id="answerButton">
            <button id="postAnswer" onClick={handlePostAnswerBtnClick} >Answer Question</button>
        </div>
      </>
    ) : (
      <div>Question not found</div>
    )}
  </div>
  );
};

export default QuestionDetailPage;