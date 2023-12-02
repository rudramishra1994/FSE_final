import React from 'react';
// import {useNavigate } from 'react-router-dom';
import '../../stylesheets/index.css';
const TagCard= ({ tag,handleTagCardClick }) => {
    const { name, count, tid } = tag;
    // const navigate = useNavigate();

    const handleCardClick=()=>{
        // navigate(`/tags/${tid}/tagged-question`);
        handleTagCardClick(tid);
    }
  
    return (
      <div className="tagNode" data-tag-id={tid} onClick={handleCardClick}>
        <div className="tagName">{name}</div>
        <div className="questionCount">{`${count} ${count === 1 ? 'question' : 'questions'}`}</div>
      </div>
    );
  };
  
  export default TagCard;
  