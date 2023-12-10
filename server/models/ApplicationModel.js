const Question = require("./questions");
const Answer = require("./answers");
const Tag = require("./tags");
const User = require("./user");
const Comment = require("./comment");
const bcrypt = require("bcrypt");

class ApplicationModel {
  static instance = null;

  constructor() {
    if (ApplicationModel.instance) {
      return ApplicationModel.instance;
    }
    ApplicationModel.instance = this;
  }

  static async getQuestions(page = 1, limit = 5) {
    const skip = (page - 1) * limit;
    const questions = await Question.find({}).skip(skip).limit(limit);
    const total = await Question.countDocuments();

    return {
      total,
      page,
      pageSize: questions.length,
      data: questions.map((question) => question.toObject({ virtuals: true })),
    };
  }
  static async getAnswers() {
    const answers = await Answer.find({});
    return answers.map((answer) => answer.toObject({ virtuals: true }));
  }

  static async getSelectedAnswer(aid) {
    const answer = await Answer.findById(aid);
    return  answer.toObject({ virtuals: true });
  }
  static async getTags() {
    return await Tag.find({});
  }
  static async addQuestion(title, text, tagsInput, authorId, askDate) {
    const user = await User.findById(authorId);
    const tagIds = await this.addNewTags(tagsInput, user);
    const username = user.username;
    if (!user) {
      throw new Error("User not found");
    }
    const question = await Question.create({
      title,
      text,
      tags: tagIds,
      asked_by: username,
      authorid: authorId,
      ask_date_time: askDate,
    });
    user.qids.push(question._id); // Add the new question's ID
    await user.save();

    return question;
  }

  static async addUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({
      username,
      password: hashedPassword,
      email,
    });
  }

  static async addNewTags(tagInput, user) {
    const tagIds = [];
    for (const tagName of tagInput) {
      let tag = await Tag.findOne({
        name: { $regex: new RegExp("^" + tagName + "$", "i") },
      });

      if (!tag) {
        // Only create a new tag if the user's reputation is 50 or higher
        if (user.reputation < 50) {
          throw new Error("Insufficient reputation to create new tags");
        }
        tag = await Tag.create({ name: tagName });
        user.tids.push(tag._id);
      }
      tagIds.push(tag._id);
    }

    return tagIds;
  }

  static async addAnswer(text, authorId, qid, date) {
    const user = await User.findById(authorId);
    if (!user) {
      throw new Error("User not found");
    }
    const answer = await Answer.create({
      text,
      ans_by: user.username,
      authorid: authorId,
      qid: qid,
      ans_date_time: date,
    });

    user.ansIds.push(answer._id);
    await user.save();
    await Question.findByIdAndUpdate(qid, {
      $push: { answers: answer._id },
      $set: { lastActivity: date },
    });
  }

  static async addTag(name) {
    let tag = await Tag.findOne({ name: name.toLowerCase() });
    if (!tag) {
      tag = await Tag.create({ name });
    }
    return tag;
  }

  static async getQuestionById(qid) {
    const question = await Question.findById(qid);
    return question ? question.toObject({ virtuals: true }) : null;
  }

  // static async getAnswersForQuestion(qid,page,limit) {
  //   try {
  //     const question = await Question.findById(qid)
  //                                     .populate({
  //                                         path: 'answers',
  //                                         options: { sort: { 'ans_date_time': -1 } }
  //                                     })
  //                                     .exec();

  //     if (!question) {
  //       return [];
  //     }
  //     const answers = question.answers.map(answer => answer.toObject({ virtuals: true }));

  //     return answers;
  //   } catch (error) {
  //     console.error("Error in getAnswersForQuestion:", error);
  //     throw error;
  //   }
  // }

  static async getAnswersForQuestion(qid, page = 1, limit = 5) {
    try {
      // Find the question without populating answers to get the total count
      const questionForCount = await Question.findById(qid).exec();

      if (!questionForCount || !questionForCount.answers) {
        return { answers: [], totalAnswers: 0 };
      }

      const total = questionForCount.answers.length;

      const questionWithPaginatedAnswers = await Question.findById(qid)
        .populate({
          path: "answers",
          options: {
            sort: { ans_date_time: -1 },
            limit: limit,
            skip: limit * (page - 1),
          },
        })
        .exec();

      if (!questionWithPaginatedAnswers) {
        return { answers: [], total: 0 };
      }

      const answers = questionWithPaginatedAnswers.answers.map((answer) =>
        answer.toObject({ virtuals: true })
      );

      return { answers, total };
    } catch (error) {
      console.error("Error in getAnswersForQuestion:", error);
      throw error;
    }
  }

  static async selectAnswerForQuestion(qid, answerid) {
    try {
      // Find the question by its ID
      const question = await Question.findById(qid);
      if (!question) {
          throw new Error("Question not found");
      }

      // Verify if the answer ID is valid and belongs to the question
      const answer = await Answer.findById(answerid);
      if (!answer || !answer.questionId.equals(question._id)) {
          throw new Error("Invalid answer for the given question");
      }

      // If there is an existing selected answer, add it back to the answers list
      if (question.selectedAnswer && !question.answers.includes(question.selectedAnswer)) {
          question.answers.push(question.selectedAnswer);
      }

      // Update the selected answer for the question
      question.selectedAnswer = answerid;

      // Remove the new selected answer from the answers list
      question.answers = question.answers.filter(ans => !ans.equals(answerid));

      await question.save();

      return question; // Return the updated question
  } catch (error) {
      console.error("Error in selectAnswerForQuestion:", error);
      throw error;
  }
  }




  static async getAnswersGivenByUser(authorid, page = 1, limit = 5) {
    try {
      // Check if authorid is provided
      if (!authorid) {
        throw new Error("Author ID is required");
      }

      // Count the total number of answers by the user
      const total = await Answer.countDocuments({ authorid: authorid }).exec();

      // Find answers by the user with pagination
      const answers = await Answer.find({ authorid: authorid })
        .sort({ ans_date_time: -1 }) // Sorting by answer date in descending order
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      // Convert to objects including virtuals
      const formattedAnswers = answers.map((answer) =>
        answer.toObject({ virtuals: true })
      );

      return { answers: formattedAnswers, total };
    } catch (error) {
      console.error("Error in getAnswersGivenByUser:", error);
      throw error;
    }
  }

  static async getQuestionsByTag(tid) {
    const taggedQuestions = await Question.find({ tags: tid }).sort({
      ask_date_time: -1,
    });
    const questions = taggedQuestions.map((question) =>
      question.toObject({ virtuals: true })
    );
    return await this.addTagToQuestion(questions);
  }

  // static async getNewestQuestionsFirst() {
  //   const questions = await Question.find({}).sort({ ask_date_time: -1 });
  //   return questions.map(question => question.toObject({ virtuals: true }));
  // }

  // static async getUnansweredQuestionsFirst() {
  //   const questions = await Question.find({ answers: { $size: 0 } }).sort({ ask_date_time: -1 });
  //   return questions.map(question => question.toObject({ virtuals: true }));
  // }

  // static async getActiveQuestionsFirst() {
  //   const mostActiveQuestions = await Question.aggregate([
  //     {
  //       $lookup: {
  //         from: 'answers',
  //         localField: 'answers',
  //         foreignField: '_id',
  //         as: 'fetchedAnswers'
  //       }
  //     },
  //     {
  //       $addFields: {
  //         lastActivityDate: { $max: '$fetchedAnswers.ans_date_time' }
  //       }
  //     },
  //     { $sort: { lastActivityDate: -1 } },
  //     { $unset: 'fetchedAnswers' }
  //   ]).exec();

  //   return mostActiveQuestions.map(question => {
  //     const questionDoc = new Question(question);
  //     return questionDoc.toObject({ virtuals: true });
  //   });
  // }

  static async getNewestQuestionsFirst(page = 1, limit = 5) {
    const totalCount = await Question.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    // Validate page number
    if (page < 1 || page > totalPages) {
      throw new Error("Invalid page number");
    }
    const questions = await Question.find({})
      .sort({ ask_date_time: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return questions.map((question) => question.toObject({ virtuals: true }));
  }

  static async getUnansweredQuestionsFirst(page = 1, limit = 5) {
    const totalCount = await Question.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    // Validate page number
    if (page < 1 || page > totalPages) {
      throw new Error("Invalid page number");
    }
    const questions = await Question.find({ answers: { $size: 0 } })
      .sort({ ask_date_time: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return questions.map((question) => question.toObject({ virtuals: true }));
  }

  static async getActiveQuestionsFirst(page = 1, limit = 5) {
    const totalCount = await Question.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    // Validate page number
    if (page < 1 || page > totalPages) {
      throw new Error("Invalid page number");
    }

    const mostActiveQuestions = await Question.find({})
      .sort({ latestActivity: -1 }) // Sort by the lastActivity field
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return mostActiveQuestions.map((question) => {
      return question.toObject({ virtuals: true });
    });
  }

  static async incrementViewCount(questionId) {
    const question = await Question.findById(questionId);
    if (question) {
      question.views = (question.views || 0) + 1;
      await question.save();
    }
  }

  static async getQuestionsWithTags(order, questions, page = 1, limit = 5) {
    if (!questions) {
      switch (order) {
        case "newest":
          questions = await this.getNewestQuestionsFirst(page, limit);
          break;
        case "unanswered":
          questions = await this.getUnansweredQuestionsFirst(page, limit);
          break;
        case "active":
          questions = await this.getActiveQuestionsFirst(page, limit);
          break;
        default:
          throw new Error("Invalid order specified");
      }
    }

    const total = await Question.countDocuments();
    const results = await this.addTagToQuestion(questions);
    return {
      questions: results,
      total,
    };
  }

  static async getQuestionByIdWithTags(qid) {
    try {
      const question = await Question.findById(qid)
        .populate("tags") // Assuming 'tags' is the field that contains references to Tag documents
        .exec();

      if (!question) {
        throw new Error("Question not found");
      }

      const tags = question.tags;

      return { question, tags };
    } catch (error) {
      console.error("Error in getQuestionByIdWithTags:", error);
      throw error;
    }
  }

  static async getQuestionsWithTagsForCurrentUser(page = 1, limit = 5, userid) {
    if (!userid) {
      throw new Error("User ID is required");
    }
    const query = { authorid: userid };
    const questions = await Question.find(query)
      .sort({ ask_date_time: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const total = await Question.countDocuments(query);
    const results = await this.addTagToQuestion(questions);

    return {
      questions: results,
      total,
    };
  }

  static async addTagToQuestion(questions) {
    const results = await Promise.all(
      questions.map(async (question) => {
        const tags = await Tag.find({ _id: { $in: question.tags } }).lean();
        return {
          question: question,
          tags: tags,
        };
      })
    );

    return results;
  }

  static async searchQuestions(query, order, page = 1, limit = 5) {
    const tagPattern = /\[([^\]]+)\]/g;
    let tagNames = [];
    let match;

    // Function to escape special characters in regular expressions
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    while ((match = tagPattern.exec(query))) {
      tagNames.push(match[1].toLowerCase());
    }

    const words = query
      .replace(tagPattern, " ")
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word);

    let searchConditions = [];

    if (tagNames.length) {
      const regexTagNames = tagNames.map(
        (tagName) => new RegExp("^" + escapeRegExp(tagName) + "$", "i")
      );

      const tags = await Tag.find({ name: { $in: regexTagNames } }).lean();
      if (tags.length > 0) {
        searchConditions.push({ tags: { $in: tags.map((tag) => tag._id) } });
      }
    }

    if (words.length) {
      const wordConditions = words.map((word) => ({
        $or: [
          { title: { $regex: `\\b${word}\\b`, $options: "i" } },
          { text: { $regex: `\\b${word}\\b`, $options: "i" } },
        ],
      }));
      searchConditions.push(...wordConditions);
    }

    const baseMatchCondition =
      searchConditions.length > 0 ? { $or: searchConditions } : {};

    let sortStage = {};
    let matchStage = {};
    let countMatchCondition = {};

    switch (order) {
      case "newest":
        {
          sortStage = { $sort: { ask_date_time: -1 } };
          matchStage = { $match: baseMatchCondition };
          countMatchCondition = baseMatchCondition;
        }
        break;
      case "unanswered":
        {
          const unansweredMatchCondition = {
            ...baseMatchCondition,
            answers: { $size: 0 },
          };
          matchStage = { $match: unansweredMatchCondition };
          sortStage = { $sort: { ask_date_time: -1 } };
          countMatchCondition = unansweredMatchCondition;
        }
        break;
      case "active":
        {
          sortStage = { $sort: { lastActivity: -1 } };
          matchStage = { $match: baseMatchCondition };
          countMatchCondition = baseMatchCondition;
        }
        break;
      default:
        throw new Error("Invalid order specified");
    }

    const skipStage = { $skip: (page - 1) * limit };
    const limitStage = { $limit: limit };

    const aggregationPipeline = [matchStage, sortStage, skipStage, limitStage];
    const questions = await Question.aggregate(aggregationPipeline).exec();
    const searchResults = questions.map((questionData) => {
      const questionDoc = new Question(questionData);
      return questionDoc.toObject({ virtuals: true });
    });

    const results = await this.addTagToQuestion(searchResults);

    const total = await Question.countDocuments(countMatchCondition);

    return {
      questions: results,
      total,
    };
  }

  static async getTagsWithCounts() {
    const tags = await Tag.find({});
    const counts = await Promise.all(
      tags.map(async (tag) => {
        const count = await Question.countDocuments({ tags: tag._id });
        return {
          tid: tag._id,
          name: tag.name,
          count: count,
        };
      })
    );
    return counts;
  }

  static async getTagsCreatedByUser(userid) {
    if (!userid) {
      throw new Error("User ID is required");
    }

    // Fetch user to get the list of tag IDs they've created
    const user = await User.findById(userid).select("tids").lean();
    if (!user) {
      throw new Error("User not found");
    }

    // Find tags based on the user's tag IDs
    const tags = await Tag.find({ _id: { $in: user.tids } });

    const counts = await Promise.all(
      tags.map(async (tag) => {
        const count = await Question.countDocuments({ tags: tag._id });
        return {
          tid: tag._id,
          name: tag.name,
          count: count,
        };
      })
    );

    return counts;
  }

  static async getTagsByIds(tagIds) {
    return await Tag.find({ _id: { $in: tagIds } });
  }

  static async getCommentsByQuestionId(qid, page, limit = 3) {
    try {
      const skip = (page - 1) * limit;
      const questionForCount = await Question.findById(qid).exec();
      // Populate comments directly in the query
      const question = await Question.findById(qid)
        .populate({
          path: "comments",
          model: Comment, // Ensure this is the correct model name
          options: {
            sort: { dateOfComment: -1 }, // Sort by date in descending order
            skip,
            limit,
          },
        })
        .exec();

      if (!question) {
        throw new Error("Question not found");
      }

      const totalComments = questionForCount.comments.length;

      // Return the comments and total comment count
      return {
        comments: question.comments,
        total: totalComments,
      };
    } catch (error) {
      console.error("Error in getCommentsByQuestionId:", error);
      throw error;
    }
  }

  static async getCommentsByAnsId(ansId, page = 1, limit = 3) {
    try {
      const skip = (page - 1) * limit;
      const answerForCount = await Answer.findById(ansId).exec();
      // Populate comments directly in the query
      const answer = await Answer.findById(ansId)
        .populate({
          path: "comments",
          model: Comment, // Ensure this is the correct model name
          options: {
            sort: { dateOfComment: -1 }, // Sort by date in descending order
            skip,
            limit,
          },
        })
        .exec();

      if (!answer) {
        throw new Error("Answer not found");
      }

      const totalComments = answerForCount.comments.length;

      // Return the comments and total comment count
      return {
        comments: answer.comments,
        total: totalComments,
      };
    } catch (error) {
      console.error("Error in getCommentsByQuestionId:", error);
      throw error;
    }
  }

  static async postCommentForAnsId(text, author, authorid, ansId) {
    try {
      // Create a new Comment document
      const newComment = new Comment({ text, author, authorid });
      await newComment.save();

      // Find the corresponding Answer and update its comments array
      const answer = await Answer.findById(ansId);
      if (!answer) {
        throw new Error("Answer not found");
      }

      answer.comments.push(newComment._id);
      await answer.save();

      return newComment; // Or return some other appropriate response
    } catch (error) {
      console.error("Error in createCommentAndUpdateAnswer:", error);
      throw error;
    }
  }

  static async postCommentForQid(text, author, authorid, qid) {
    try {
      // Create a new Comment document
      const newComment = new Comment({ text, author, authorid });
      await newComment.save();

      // Find the corresponding Question and update its comments array
      const question = await Question.findById(qid);
      if (!question) {
        throw new Error("Question not found");
      }

      question.comments.push(newComment._id);
      await question.save();

      return newComment; // Or return some other appropriate response
    } catch (error) {
      console.error("Error in createCommentAndUpdateQuestion:", error);
      throw error;
    }
  }

  static async updateCommentVoteCount(cid, votes) {
    try {
      const comment = await Comment.findById(cid);
      if (!comment) {
        throw new Error("Comment not found");
      }
      comment.votes = votes;
      await comment.save();
    } catch (error) {
      console.error("Error in createCommentAndUpdateQuestion:", error);
      throw error;
    }
  }

  static async updateUserTag(userId, tid, newName) {
    try {
      // Find the tag by ID
      const tag = await Tag.findById(tid);
      if (!tag) {
        throw new Error("Tag not found");
      }

      // Check if the tag is being used by questions from other users
      const isTagUsedByOthers = await Question.exists({
        tags: tid,
        authorid: { $ne: userId },
      });
      if (isTagUsedByOthers) {
        throw new Error(
          "Editing not allowed: Tag is being used by other users"
        );
      }

      // Update the tag's name
      tag.name = newName;
      await tag.save();
      return tag;
    } catch (error) {
      console.error("Error in updateUserTag:", error);
      throw error;
    }
  }

  static async updateQuestion(qid, title, text, tagInput, userId) {
    try {
      // Find the question by ID
      const question = await Question.findById(qid);
      if (!question) {
        throw new Error("Question not found");
      }

      // Check if the user is the author of the question
      if (!question.authorid.equals(userId)) {
        throw new Error("Editing not allowed: User is not the author");
      }

      // Process tags
      let tagIds = [];
      for (const tagName of tagInput) {
        let tag = await Tag.findOne({ name: tagName });
        if (!tag) {
          // If tag does not exist, create it
          tag = new Tag({ name: tagName });
          await tag.save();
        }
        tagIds.push(tag._id);
      }

      // Update the question
      question.title = title;
      question.text = text;
      question.tags = tagIds;
      question.latestActivity = new Date();
      await question.save();

      await User.updateOne(
        { _id: userId },
        { $addToSet: { tids: { $each: tagIds } } }
      );

      return question;
    } catch (error) {
      console.error("Error in updateQuestion:", error);
      throw error;
    }
  }

  static async updateSelectedAnswerForQuestion(answerid, qid, userId) {
    try {
      // Find the question by its ID
      const question = await Question.findById(qid);
      if (!question) {
        throw new Error("Question not found");
      }

      // Verify if the user is the author of the question
      if (!question.authorid.equals(userId)) {
        throw new Error("Only the author of the question can select an answer");
      }

      // Verify if the answer ID is valid and belongs to the question
      const answer = await Answer.findById(answerid);
      if (!answer || !answer.qid.equals(question._id)) {
        throw new Error("Invalid answer for the given question");
      }

      // Update the selected answer for the question
      question.selectedanswer = answerid;
      await question.save();

      return question; // Return the updated question
    } catch (error) {
      console.error("Error in selectAnswerForQuestion:", error);
      throw error;
    }
  }

  static async updateAnswer(aid, text, userId) {
    try {
      const answer = await Answer.findById(aid);
      if (!answer) {
        throw new Error("Answer not found");
      }

      answer.text = text;
      answer.latestActivity = new Date();
      await answer.save();

      await User.updateOne(
        { _id: userId },
        { $set: { latestActivity: new Date() } }
      );

      return answer;
    } catch (error) {
      console.error("Error in updateAnswer:", error);
      throw error;
    }
  }

  // static async deleteUserTag(tagId, userId) {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  //   try {
  //       const tag = await Tag.findById(tagId).session(session);
  //       if (!tag) {
  //           throw new Error('Tag not found');
  //       }

  //       const isTagUsedInQuestions = await Question.exists({ tags: tagId, authorid: { $ne: userId } }).session(session);
  //       if (isTagUsedInQuestions) {
  //           throw new Error('Tag is in use by other users and cannot be deleted');
  //       }

  //       // Remove the tag from all Questions by this user that reference it
  //       await Question.updateMany({ authorid: userId, tags: tagId }, { $pull: { tags: tagId } }).session(session);

  //       // Remove the tag from the User's tag list
  //       await User.updateOne({ _id: userId }, { $pull: { tids: tagId } }).session(session);

  //       // Delete the tag
  //       await Tag.deleteOne({ _id: tagId }).session(session);

  //       await session.commitTransaction();
  //       return { message: 'Tag successfully deleted' };
  //   } catch (error) {
  //       await session.abortTransaction();
  //       console.error('Error in deleteUserTag:', error.message);
  //       throw error;
  //   } finally {
  //       session.endSession();
  //   }
  // }

  static async deleteUserTag(tagId, userId) {
    try {
      const tag = await Tag.findById(tagId);
      if (!tag) {
        throw new Error("Tag not found");
      }

      const isTagUsedInQuestions = await Question.exists({
        tags: tagId,
        authorid: { $ne: userId },
      });
      if (isTagUsedInQuestions) {
        throw new Error("Tag is in use by other users and cannot be deleted");
      }

      // Remove the tag from all Questions by this user that reference it
      await Question.updateMany(
        { authorid: userId, tags: tagId },
        { $pull: { tags: tagId } }
      );

      // Remove the tag from the User's tag list
      await User.updateOne({ _id: userId }, { $pull: { tids: tagId } });

      // Delete the tag
      await Tag.deleteOne({ _id: tagId });

      return { message: "Tag successfully deleted" };
    } catch (error) {
      console.error("Error in deleteUserTag:", error.message);
      throw error;
    }
  }

  // static async deleteQuestionByID(qid, userId) {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  //   try {
  //     // Fetch the question
  //     const question = await Question.findById(qid);
  //     if (!question) {
  //       throw new Error('Question not found');
  //     }

  //     // Check if the user is the author of the question
  //     if (!question.authorid.equals(userId)) {
  //       throw new Error('User is not the author of the question');
  //     }

  //     // Delete all comments associated with the question
  //     await Comment.deleteMany({ _id: { $in: question.comments } }).session(session);

  //     // Find all answers to the question
  //     const answers = await Answer.find({ qid: qid }).session(session);

  //     // Delete all comments associated with each answer
  //     for (const answer of answers) {
  //       await Comment.deleteMany({ _id: { $in: answer.comments } }).session(session);
  //     }

  //     // Delete all answers to the question
  //     await Answer.deleteMany({ qid: qid }).session(session);

  //     // Delete the question itself
  //     await Question.deleteOne({ _id: qid }).session(session);

  //     // Update the user's references
  //     await User.updateOne(
  //       { _id: userId },
  //       { $pull: { qids: qid, ansIds: { $in: answers.map(a => a._id) } } }
  //     ).session(session);

  //     await session.commitTransaction();
  //   } catch (error) {
  //     await session.abortTransaction();
  //     throw error;
  //   } finally {
  //     session.endSession();
  //   }
  // }

  static async deleteQuestionByID(qid, userId) {
    try {
      // Fetch the question
      const question = await Question.findById(qid);
      if (!question) {
        throw new Error("Question not found");
      }

      // Check if the user is the author of the question
      if (!question.authorid.equals(userId)) {
        throw new Error("User is not the author of the question");
      }

      // Delete all comments associated with the question
      await Comment.deleteMany({ _id: { $in: question.comments } });

      // Find all answers to the question
      const answers = await Answer.find({ qid: qid });

      // Delete all comments associated with each answer
      for (const answer of answers) {
        await Comment.deleteMany({ _id: { $in: answer.comments } });
      }

      // Delete all answers to the question
      await Answer.deleteMany({ qid: qid });

      // Delete the question itself
      await Question.deleteOne({ _id: qid });

      // Update the user's references
      await User.updateOne(
        { _id: userId },
        { $pull: { qids: qid, ansIds: { $in: answers.map((a) => a._id) } } }
      );
    } catch (error) {
      console.error("Error in deleteQuestionByID:", error.message);
      throw error;
    }
  }

  static async deleteAnswer(aid, userId) {
    try {
      // Fetch the answer
      const answer = await Answer.findById(aid);
      if (!answer) {
        throw new Error("Answer not found");
      }

      // Check if the user is the author of the answer
      if (!answer.authorid.equals(userId)) {
        throw new Error("User is not the author of the answer");
      }

      // Delete all comments associated with the answer
      await Comment.deleteMany({ _id: { $in: answer.comments } });

      // Update the associated question's latestActivity
      await Question.updateOne(
        { _id: answer.qid },
        { $set: { latestActivity: new Date() } }
      );

      // Remove the answer reference from the user's answer reference array
      await User.updateOne(
        { _id: userId },
        {
          $pull: { ansIds: aid },
          $set: { latestActivity: new Date() },
        }
      );

      // Delete the answer
      await Answer.deleteOne({ _id: aid });
    } catch (error) {
      console.error("Error in deleteAnswer:", error.message);
      throw error;
    }
  }

  static async updateQuestionVoteCount(qid, deltaRep, deltaVote) {
    try {
      const question = await Question.findById(qid);
      if (!question) {
        throw new Error("Question not found");
      }

      // Update the vote count of the question
      question.votes += deltaVote;
      question.latestActivity = new Date();

      // Update the reputation of the user who posted the question
      // Assuming the author's ID is stored in `authorid`
      const user = await User.findById(question.authorid);
      if (!user) {
        throw new Error("User not found");
      }
      await question.save();
      user.reputation += deltaRep;

      await user.save();
    } catch (error) {
      console.error("Error in updateQuestionVoteCount:", error);
      throw error;
    }
  }

  static async updateAnswerVoteCount(aid, deltaRep, deltaVote) {
    try {
      const answer = await Answer.findById(aid);
      if (!answer) {
        throw new Error("Answer not found");
      }
      answer.votes += deltaVote;
      const question = await Question.findById(answer.qid);
      if (!question) {
        throw new Error("No associated Question found");
      }
      question.latestActivity = new Date();

      const user = await User.findById(answer.authorid);
      if (!user) {
        throw new Error("User not found");
      }

      user.reputation += deltaRep;
      await user.save();
      await question.save();
      await answer.save();
    } catch (error) {
      console.error("Error in updateAnswerVoteCount:", error);
      throw error;
    }
  }
}

module.exports = ApplicationModel;
