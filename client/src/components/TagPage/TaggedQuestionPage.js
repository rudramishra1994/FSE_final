import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import QuestionList from '../HomePage/QuestionList';
import '../HomePage/HomePage.css';
import '../../stylesheets/index.css'
import ApplicationModel from '../../models/ApplicationModel';

const appModel = new ApplicationModel();
const TaggedQuestionPage = ({tid,incrementViewCount,setCurrentPage,setCurrentQID}) => {
    // const {tid} = useParams();
    const [taggedQuestions,setTaggedQuestion] = useState([])
    const [tag,setTag] = useState({name:'No Tag'});

    useEffect(() => {
      const fetchQuestionsAndTags = async () => {
        try {
          if (tid) {
            const taggedQuestions = await appModel.getQuestionsByTag(tid);
            setTaggedQuestion(taggedQuestions);
    
            const tags = await appModel.getTagsByIds([tid]);
            if (tags && tags.length > 0) {
              setTag(tags[0]);
            }
          }
        } catch (error) {
          console.error('Failed to fetch questions or tags:', error);
        }
      };
    
      fetchQuestionsAndTags();
    
    }, [tid]);


  return (
    <div className="homepage">
    <div className="mainBodyPrimHeader"><h1>{tag?.name}</h1><div className='answerNum'>{taggedQuestions.length} Questions</div></div>
    {taggedQuestions && taggedQuestions.length > 0 ? (
      <QuestionList questions={taggedQuestions} incrementViewCount={incrementViewCount} setCurrentPage={setCurrentPage} setCurrentQID={setCurrentQID}  />
    ) : (
      <div>No Questions available.</div>
    )}
  </div>
  );
};
export default TaggedQuestionPage;