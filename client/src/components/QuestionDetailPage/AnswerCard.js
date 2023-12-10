import React,{useState} from "react";
import AnswerAuthorInfo from "./AnswerAuthorInfo";
import { parseTextWithHyperlinks } from "../../Utility/utility";
import CommentsSection from "./CommentsSection";
import "./AnswerList.css";
import ApplicationModel from "../../models/ApplicationModel";
const appModel = new ApplicationModel();

const AnswerCard = ({ answer, user,setSelectedAnswer,question }) => {

  const [votes, setVotes] = useState(answer.votes);
  const [errorUpVote, setErrorUpVote] = useState("");
  const [errorSelectingAnswer,setErrorSelectingAnswer] = useState('');
  const onUpvote = () => {
    setErrorUpVote("");
    try {
      appModel.updateAnswerVoteCount(answer._id, 5, 1); //aid, deltaRep, deltaVote
      const newVotes = votes + 1;
      setVotes(newVotes);
    } catch (error) {
      setErrorUpVote("upvoting failed");
    }
  };

  const onDownvote = () => {
    setErrorUpVote("");
    try {
      appModel.updateAnswerVoteCount(answer._id, -10, -1);
      const newVotes = votes - 1;
      setVotes(newVotes);
    } catch (error) {
      setErrorUpVote("downvoting failed");
    }
  };



  const fetchData = async (page, limit) => {
    try {
      const data = await appModel.getCommentsForAnswer(answer._id, page, limit);

      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComment = async (text) => {
    try {
      const data = await appModel.postCommentForAnswer(
        text,
        user.username,
        answer._id
      );
      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSelectAnswer = async () => {
    setErrorSelectingAnswer('')
    try {
      await appModel.updateSelectedAnswerForQuestion(answer._id, answer.qid); // Assuming this method updates the selected answer in the backend
      setSelectedAnswer(answer._id); // Inform the parent component about the selection
    } catch (error) {
      console.error("Error selecting answer:", error);
      setErrorSelectingAnswer('Selection Failed')
    }
  };



  return (
    <div className="answerCardContainer">
      <div className="answerCard">
      <div className="vote-container">
          {user && (
            <button className="vote-arrow up-arrow" onClick={onUpvote}>
              ↑
            </button>
          )}
          <div className="vote-count">{`${votes} votes`}</div>
          {user && (
            <button className="vote-arrow down-arrow" onClick={onDownvote}>
              ↓
            </button>
          )}
          <div className="error">{errorUpVote}</div>
        </div>
        
        <div className="answerText">{parseTextWithHyperlinks(answer.text)}</div>
        
        <div className="userInfoContainer">
        <AnswerAuthorInfo answer={answer} />
        {user && question && user.username === question.askedBy && (
          <button className="selectAnswerBtn vote-arrow" onClick={handleSelectAnswer} disabled={question.selectedanswer && question.selectedanswer  === answer._id}>
             {question.selectedanswer && question.selectedanswer=== answer._id ? "Selected Answer" : "Select"}
          </button>
        )}
        <div className="error">{errorSelectingAnswer}</div>
        </div>
        
      </div>
      <div className="answerCommentSectionContainer">
        <CommentsSection
          user={user}
          fetchData={fetchData}
          postComment={postComment}
        />
      </div>
    </div>
  );
};

export default AnswerCard;
