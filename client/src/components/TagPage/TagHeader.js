
import React from "react";
// import { useNavigate } from "react-router-dom";
import '../../stylesheets/index.css';
const TagHeader = ({ tags,handleAskQuestionClick }) => {

    // const navigate = useNavigate();
    const handleAskBtnClick=()=>{
      handleAskQuestionClick()
        
    }
    return (
      <div id="tagHeader">
        <div id="tagCount">{`${tags.length} Tags`}</div>
        <div id="tagTitle">All Tags</div>
        <button id="askQuestionBtnOnTagPage" value="Ask a Question" onClick={handleAskBtnClick}>Ask a Question</button>
      </div>
    );
  };
  
  export default TagHeader;
  