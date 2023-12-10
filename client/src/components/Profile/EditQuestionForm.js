import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import "../NewQuestionPage/AskQuestionForm.css";
import {
  containsValidHyperLink,
  containsHyperLinkPattern,
} from "../../Utility/utility";
import ApplicationModel from "../../models/ApplicationModel";

const appModel = new ApplicationModel();
const EditQuestionForm = ({
  setCurrentPage,
  currentQID,
  setQuestionOperation,
  questionOperation,
}) => {
  const [errors, setErrors] = useState({ title: "", text: "", tagsInput: "" });
  const [postError, setPostError] = useState("");
  const [question, setQuestion] = useState([]);
  // Initialize form state with the question data
  const [title, setTitle] = useState(question.title);
  const [loadingError, setLoadingError] = useState("");
  const [text, setText] = useState(question.text);
  const [tagsInput, setTagsInput] = useState(""); // Assuming tags are an array

  // You can implement form validation logic similar to your AskQuestionForm
  // ...

  const formInputValidation = (title, text, tagsInput) => {
    let hasError = false;
    const newErrors = { title: "", text: "", tagsInput: "" };

    if (!title || title.trim().length < 1) {
      newErrors.title = "Title cannot be empty";
      hasError = true;
    } else if (title.length > 100) {
      newErrors.title = "Title cannot be more than 100 characters";
      hasError = true;
    }

    if (!text || text.trim().length < 1) {
      newErrors.text = "Question text cannot be empty";
      hasError = true;
    } else {
      if (containsHyperLinkPattern(text) && !containsValidHyperLink(text)) {
        newErrors.text = "Invalid hyperlink";
        hasError = true;
      } else {
        newErrors.text = "";
      }
    }

    if (tagsInput === null) {
      newErrors.tagsInput = "Cannot have less than 1 tag";
      hasError = true;
    } else if (tagsInput.length > 5) {
      newErrors.tagsInput = "Cannot have more than 5 tags";
      hasError = true;
    } else if (tagsInput.length < 1) {
      newErrors.tagsInput = "Cannot have less than 1 tag";
      hasError = true;
    } else if (tagsInput.some((tag) => tag.length > 20)) {
      newErrors.tagsInput = "New tag length cannot be more than 20";
      hasError = true;
    }

    setErrors(newErrors);
    return hasError;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.formTitleInput.value.trim() || null;
    const text = e.target.formTextInput.value.trim() || null;
    const rawTags = e.target.formTagInput.value.trim().split(" ");
    const tagInput =
      rawTags.filter((tag) => tag !== "").length > 0
        ? rawTags.filter((tag) => tag !== "")
        : null;

    if (!formInputValidation(title, text, tagInput)) {
      setPostError("");
      try {
        await appModel.updateQuestion(currentQID, title, text, tagInput);
        setCurrentPage("all-questions");
        setQuestionOperation(questionOperation + 1);
      } catch (e) {
        setPostError(
          e.response.data || "error while posting question.try again"
        );
      }
    }
  };

  const handleDelete = async () => {
    // Confirm deletion with the user before proceeding
    setPostError('')
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await appModel.deleteQuestionByID(question._id);

        setCurrentPage("all-questions"); // Or navigate as appropriate
        setQuestionOperation(questionOperation + 1);
      } catch (e) {
        setPostError(
          e.response.data || "Error while deleting question. Please try again"
        );
      }
    }
  };

  const fetchQuestion = async () => {
    try {
      const data = await appModel.getQuestionByIdWithTags(currentQID);
      setQuestion(data.question);
      setTitle(data.question.title);
      const tags = data.question.tags.map((tag) => tag.name).join(" ");
      setText(data.question.text);
      setTagsInput(tags);
      setTagsInput();
    } catch (error) {
      setLoadingError(error.response.data || "Error Loading Questions");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <form className="fullHeightQuestionForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="formTitleInput" className="askQuestionFormLabel">
          Question Title<span style={{ color: "red" }}>*</span>
        </label>
        <br />
        <br />
      </div>
      <div>
        <small>Limit of 100 characters or less.</small>
        <br />
        <input
          type="text"
          id="editformTitleInput"
          name="formTitleInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "50%" }}
        />
        <div id="titleError" style={{ color: "red" }}>
          {errors.title}
        </div>
        <br />
        <br />
        <br />
      </div>

      <div>
        <label htmlFor="formTextInput" className="askQuestionFormLabel">
          Question Text<span style={{ color: "red" }}>*</span>
        </label>
        <br />
        <br />
      </div>
      <div>
        <small>Add details</small>
        <br />
        <textarea
          id="editformTextInput"
          name="formTextInput"
          style={{ width: "50%" }}
          rows="4"
          cols="50"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div id="textError" style={{ color: "red" }}>
          {errors.text}
        </div>
        <br />
        <br />
        <br />
      </div>

      <div>
        <label htmlFor="formTagInput" className="askQuestionFormLabel">
          Tag<span style={{ color: "red" }}>*</span>
        </label>
        <br />
        <br />
      </div>
      <div>
        <small>Add Keywords separated by whitespace</small>
        <br />
        <input
          type="text"
          id="editformTagInput"
          name="formTagInput"
          style={{ width: "50%" }}
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
        <div id="tagError" style={{ color: "red" }}>
          {errors.tagsInput}
        </div>
        <br />
        <br />
        <br />
      </div>

      <div className="form-actions">
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="button" className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="error">{loadingError}</div>
      <div className="error">{postError}</div>
    </form>
  );
};

export default EditQuestionForm;
