import React, { useState, useEffect } from "react";
import UserQuestionList from "./UserQuestionList";
import "../HomePage/HomePage.css";
import ApplicationModel from "../../models/ApplicationModel";
import EditQuestionForm from "./EditQuestionForm";

const appModel = new ApplicationModel();

const PAGE_SIZE = 5;
const UserQuestionPage = ({currentPage,setCurrentPage}) => {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [loadingError, setLoadingError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionOperation,setQuestionOperation] = useState(0);
  const [currentQID, setCurrentQID] = useState("");
  

  const fetchQuestions = async (page) => {
    setLoadingError("");
    try {
      const data = await appModel.getQuestionsWithTagsForCurrentUser(
        "newest",
        page,
        PAGE_SIZE
      );
      setQuestions(data.questions);
      setTotalPages(data.totalPages);
    } catch (error) {
      setLoadingError(error.response.data || "Error Loading Questions");
    }
  };

  const   deleteQuestion = async (qid) =>{
    try {

        const response = await appModel.deleteQuestion(qid);
        return response.data;
    } catch (error) {
        console.error("Error deleting question:", error);
        throw error;
    }
  }

  const  updateQuestion = async (qid, updatedData) =>{
    try {
        
        const response = await appModel.updateQuestion(qid, updatedData);
       
        return response.data;
    } catch (error) {
        console.error("Error updating question:", error);
        throw error;
    }
}


  const handleNextClick = () => {
    const nextPage = currentPaginationPage + 1;
    if (nextPage <= totalPages) {
      setCurrentPaginationPage(nextPage);
    }
  };

  const handlePrevClick = () => {
    const prevPage = currentPaginationPage - 1;
    if (prevPage > 0) {
      setCurrentPaginationPage(prevPage);
    }
  };

  useEffect(() => {
    fetchQuestions(currentPaginationPage);
  }, [currentPaginationPage,questionOperation]);

  return (
    <div className="homepage">
      {currentPage === "edit-question" ? (
       
        <EditQuestionForm 
          currentQID={currentQID}
          setCurrentPage={setCurrentPage}
          updateQuestion={updateQuestion}
          deleteQuestion = {deleteQuestion}
          setQuestionOperation = {setQuestionOperation}
          questionOperation = {questionOperation}
          // Add other necessary props
        />
      ) : (
        <div className="userQuestionPageContainer">
          <div>
            Showing {currentPaginationPage}/{totalPages} pages
          </div>
          <br></br>
          <div className="questionListContainer">
            {loadingError ? (
              <div className="error">{loadingError}</div> // Display error message
            ) : (
              <UserQuestionList
                questions={questions}
                currentQID={currentQID}
                setCurrentQID={setCurrentQID}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
          <div className="paginationContainer">
            <div className="pagination">
              <button
                onClick={handlePrevClick}
                disabled={currentPaginationPage === 1}
              >
                Prev
              </button>
              <button
                onClick={handleNextClick}
                disabled={currentPaginationPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserQuestionPage;
