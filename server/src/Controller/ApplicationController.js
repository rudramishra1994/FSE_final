const ApplicationModel = require("../../models/ApplicationModel");
const User = require("../../models/user");

class ApplicationController {
  static async getQuestions(req, res) {
    try {
      const questions = await ApplicationModel.getQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async addQuestion(req, res) {
    const authorId = req.session.userId;
    try {
      const question = await ApplicationModel.addQuestion(
        req.body.title,
        req.body.text,
        req.body.tagsInput,
        authorId,
        req.body.askDate
      );
      res.status(201).json(question);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async addUser(req, res) {
    try {
      const { username, email, password } = req.body;

      await ApplicationModel.addUser(username, email, password);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);

      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        let message = `An account with that ${field} already exists.`;
        return res.status(409).json({ message }); // 409 Conflict
      }

      res.status(500).json({ message: "Error registering new user" });
    }
  }

  static async addAnswer(req, res) {
    const authorId = req.session.userId;
    try {
      const { text, qid, ansDate } = req.body;
      const answer = await ApplicationModel.addAnswer(
        text,
        authorId,
        qid,
        new Date(ansDate)
      );
      res.status(201).json(answer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getQuestionById(req, res) {
    try {
      const question = await ApplicationModel.getQuestionById(req.params.qid);
      if (!question) {
        return res.status(404).send("Question not found");
      }
      res.json(question);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


  static async getSelectedAnswer(req, res) {
    try {
      const question = await ApplicationModel.getSelectedAnswer(req.params.aid);
      if (!question) {
        return res.status(404).send("Question not found");
      }
      res.json(question);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getQuestionByIdWithTags(req, res) {
    try {
      const { question, tags } = await ApplicationModel.getQuestionByIdWithTags(
        req.params.qid
      );
      if (!question) {
        return res.status(404).send("Question not found");
      }
      res.status(201).json({ question, tags });
    } catch (error) {
      res.status(500).send(error.message || "Error retrieving question");
    }
  }

  static async getAnswersForQuestion(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const { answers, total } = await ApplicationModel.getAnswersForQuestion(
        req.params.qid,
        page,
        limit
      );
      res.json({ answers, total, page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAnswersGivenByUser(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const authorid = req.session.userId;
      const { answers, total } = await ApplicationModel.getAnswersGivenByUser(
        authorid,
        page,
        limit
      );
      res.json({ answers, total, page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getQuestionsByTag(req, res) {
    try {
      const questions = await ApplicationModel.getQuestionsByTag(
        req.params.tid
      );
      res.json(questions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getQuestionWithTags(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const order = req.params.order;

      const { questions, total } = await ApplicationModel.getQuestionsWithTags(
        order,
        null,
        page,
        limit
      );

      res.json({
        questions,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getQuestionsWithTagsForCurrentUser(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const userId = req.session.userId;

      const { questions, total } =
        await ApplicationModel.getQuestionsWithTagsForCurrentUser(
          page,
          limit,
          userId
        );

      res.json({
        questions,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getNewestQuestionsFirst(req, res) {
    try {
      const questions = await ApplicationModel.getNewestQuestionsFirst();
      res.json(questions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getUnansweredQuestionsFirst(req, res) {
    try {
      const questions = await ApplicationModel.getUnansweredQuestionsFirst();
      res.json(questions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getActiveQuestionsFirst(req, res) {
    try {
      const mostActiveQuestions =
        await ApplicationModel.getActiveQuestionsFirst();
      res.json(mostActiveQuestions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // static async getQuestionWithTags(req, res) {
  //   try {
  //     const questionWithTags = await ApplicationModel.getQuestionsWithTags(req.params.order);
  //     res.json(questionWithTags);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  static async incrementViewCount(req, res) {
    try {
      await ApplicationModel.incrementViewCount(req.params.qid);
      res.send("View count incremented");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async searchQuestions(req, res) {
    try {
      const query = req.query.q;
      const order = req.query.order;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const { questions, total } = await ApplicationModel.searchQuestions(
        query,
        order,
        page,
        limit
      );
      res.json({
        questions,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getTagsCreatedByUser(req, res) {
    try {
      const userid = req.session.userId;
      const tagsWithCounts = await ApplicationModel.getTagsCreatedByUser(
        userid
      );
      res.json(tagsWithCounts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getTagsWithCounts(req, res) {
    try {
      const tagsWithCounts = await ApplicationModel.getTagsWithCounts();
      res.json(tagsWithCounts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getQuestionsWithTags(req, res) {
    try {
      // Assuming questions are passed in the body of the request. Adjust as needed for your API design.
      const questionsWithTags = await ApplicationModel.getQuestionsWithTags(
        req.body.questions
      );
      res.json(questionsWithTags);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getTagsByIds(req, res) {
    try {
      const tags = await ApplicationModel.getTagsByIds(req.body.tagIds);
      res.json(tags);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const { user, userid } = await User.loginUser(username, password);

      req.session.userId = userid;
      res.json({ user });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(401).json({
        message:
          error.message || "An error occurred while attempting to log in",
      });
    }
  }

  static async logout(req, res) {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error("Logout error:", err);
            res.status(500).json({ message: "Error occurred during logout" });
          } else {
            res.clearCookie("connect.sid");
            res.json({ message: "Successfully logged out" });
          }
        });
      } else {
        res.json({ message: "No active session" });
      }
    } catch (error) {
      console.error("Logout error:", error);
      res
        .status(500)
        .json({ message: "An error occurred while attempting to log out" });
    }
  }

  static async getCommentsByQid(req, res) {
    try {
      const qid = req.query.qid;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const { comments, total } =
        await ApplicationModel.getCommentsByQuestionId(qid, page, limit);

      res.json({
        comments,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getCommentsByAnsId(req, res) {
    try {
      const aid = req.query.aid;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const { comments, total } = await ApplicationModel.getCommentsByAnsId(
        aid,
        page,
        limit
      );

      res.json({
        comments,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async postCommentForAnsId(req, res) {
    try {
      const { author, text, ansId } = req.body;
      const authorid = req.session.userId;
      const comment = await ApplicationModel.postCommentForAnsId(
        text,
        author,
        authorid,
        ansId
      );
      res.status(201).json({
        comment,
        message: "comment created successfully",
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async postCommentForQid(req, res) {
    try {
      const { author, text, qid } = req.body;
      const authorid = req.session.userId;
      const comment = await ApplicationModel.postCommentForQid(
        text,
        author,
        authorid,
        qid
      );
      res.status(201).json({
        comment,
        message: "comment created successfully",
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateCommentVoteCount(req, res) {
    try {
      const { cid, votes } = req.body.params;
      await ApplicationModel.updateCommentVoteCount(cid, votes);
      res.status(201).json({
        message: "vote increased successfully",
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateQuestionVoteCount(req, res) {
    try {
      const { qid, deltaRep, deltaVote } = req.body.params;
      await ApplicationModel.updateQuestionVoteCount(qid, deltaRep, deltaVote);
      res.status(201).json({
        message: "vote changed successfully",
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateAnswerVoteCount(req, res) {
    try {
      const { aid, deltaRep, deltaVote } = req.body.params;
      await ApplicationModel.updateAnswerVoteCount(aid, deltaRep, deltaVote);
      res.status(201).json({
        message: "vote changed successfully",
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateUserTag(req, res) {
    try {
      const { tid, name } = req.body.params;
      const userid = req.session.userId;
      await ApplicationModel.updateUserTag(userid, tid, name);
      res.status(201).json({
        message: "Tag successfully edited",
      });
    } catch (error) {
      res.status(500).send(error.message || "Tag Update Failed");
    }
  }

  static async updateQuestion(req, res) {
    try {
      const { qid, title, text, tagInput} = req.body.params;
      const userid = req.session.userId;
      await ApplicationModel.updateQuestion(qid, title, text, tagInput,userid);
      res.status(201).json({
        message: "Tag successfully edited",
      });
    } catch (error) {
      res.status(500).send(error.message || "Tag Update Failed");
    }
  }

  static async updateSelectedAnswerForQuestion(req, res) {
    try {
      const {aid,qid} = req.body.params;
      const userid = req.session.userId;
      await ApplicationModel.updateSelectedAnswerForQuestion(aid,qid,userid);
      res.status(201).json({
        message: "Tag successfully edited",
      });
    } catch (error) {
      res.status(500).send(error.message || "Tag Update Failed");
    }
  }

  static async updateAnswer(req, res) {
    try {
      const { aid, text} = req.body.params;
     
      await ApplicationModel.updateAnswer(aid, text);
      res.status(201).json({
        message: "Tag successfully edited",
      });
    } catch (error) {
      res.status(500).send(error.message || "Tag Update Failed");
    }
  }


  static async deleteUserTag(req, res) {
    try {
      const { tid } = req.params;
      const userid = req.session.userId;
      await ApplicationModel.deleteUserTag(tid, userid);
      res.status(201).json({
        message: "Tag successfully deleted",
      });
    } catch (error) {
      res.status(500).send(error.message || "Tag Update Failed");
    }
  }



  static async deleteAnswer(req, res) {
    try {
      const { aid } = req.params;
      const userid = req.session.userId;
      await ApplicationModel.deleteAnswer(aid, userid);
      res.status(201).json({
        message: "Tag successfully deleted",
      });
    } catch (error) {
      res.status(500).send(error.message || "Tag Update Failed");
    }
  }



  static async deleteQuestionByID(req, res) {
    try {
      const { qid } = req.params;
      const userid = req.session.userId;
      await ApplicationModel.deleteQuestionByID(qid, userid);
      res.status(201).json({
        message: "Question successfully deleted",
      });
    } catch (error) {
      res.status(500).send(error.message || "Tag Update Failed");
    }
  }
}

module.exports = ApplicationController;
