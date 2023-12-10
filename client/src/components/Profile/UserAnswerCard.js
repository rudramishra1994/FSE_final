import React, { useState } from "react";
import AnswerAuthorInfo from "../QuestionDetailPage/AnswerAuthorInfo.js";
import { parseTextWithHyperlinks } from "../../Utility/utility.js";
import "../QuestionDetailPage/AnswerList.css";
import ApplicationModel from "../../models/ApplicationModel";

const appModel = new ApplicationModel();

const UserAnswerCard = ({ answer, user,answerOperation,setAnswerOperation }) => {
  const [votes, setVotes] = useState(answer.votes);
  const [errorUpVote, setErrorUpVote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(answer.text);
  const [answerText,setAnswerText] = useState(answer.text)
  const [errorUpdate,setErrorUpdate] = useState('')
  const [cardAnswer,setCardAnswer] = useState(answer);
  const [deleteError, setDeleteError] = useState("");

  const onUpvote = () => {
    setErrorUpVote("");
    try {
      appModel.updateAnswerVoteCount(answer._id, 1); // Assuming this method updates the vote count
      const newVotes = votes + 1;
      setVotes(newVotes);
    } catch (error) {
      setErrorUpVote("Upvoting failed");
    }
  };

  const onDownvote = () => {
    setErrorUpVote("");
    try {
      appModel.updateAnswerVoteCount(answer._id, -1);
      const newVotes = votes - 1;
      setVotes(newVotes);
    } catch (error) {
      setErrorUpVote("Downvoting failed");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async() => {
    // Implement logic to save the edited text
    setErrorUpdate('');
    try{
      
      await appModel.updateAnswer(answer._id,editedText);
      setAnswerText(editedText);
      answer.text = editedText;
      setCardAnswer(answer);
      setIsEditing(false);
      
     
    }catch(error){
      setErrorUpdate('Answer Update Failed')
    }
   
    // Update the answer text in your state or backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(answer.text); // Reset text to original
  };

  const handleDelete = async () => {
    // Confirm deletion with the user before proceeding
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await appModel.deleteAnswer(answer._id);
        setAnswerOperation(answerOperation+1);

        //setCurrentPage("all-questions"); // Or navigate as appropriate
        //setQuestionOperation(questionOperation + 1);
      } catch (e) {
        setDeleteError(
           "Error while deleting question. Please try again"
        );
      }
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

        {isEditing ? (
          <div className="editAnswerContainer">
            <textarea
              className="editAnswerText"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <>
              <button onClick={handleSave} className="editSaveButton">
                Save
              </button>
              <button onClick={handleCancel} className="cancelDeleteButton">
                Cancel
              </button>
              <div className="error">{errorUpdate}</div>
            </>
          </div>
        ) : (
          <div className="editAnswerContainer">
            <div className="answerText">
              {parseTextWithHyperlinks(answerText)}
            </div>
            <>
              <button onClick={handleEdit} className="editSaveButton">
                Edit
              </button>
              <button onClick={handleDelete} className="cancelDeleteButton">
                Delete
              </button>
              <div className="error">{deleteError}</div>
            </>
          </div>
        )}

        <AnswerAuthorInfo answer={cardAnswer} />
      </div>
    </div>
  );
};

export default UserAnswerCard;
