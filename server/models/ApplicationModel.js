
const Question = require('./questions');
const Answer = require('./answers');
const Tag = require('./tags');
const User = require('./user');
const Comment = require('./comment');
const bcrypt = require('bcrypt');

class ApplicationModel {
  static instance = null;

  constructor() {
    if (ApplicationModel.instance) {
      return ApplicationModel.instance;
    }
    ApplicationModel.instance = this;
  }

  static async getQuestions(page, limit) {
    const skip = (page - 1) * limit;
    const questions = await Question.find({}).skip(skip).limit(limit);
    const total = await Question.countDocuments();

    return {
        total,
        page,
        pageSize: questions.length,
        data: questions.map(question => question.toObject({ virtuals: true })),
    };
}
  static async getAnswers() {
    const answers = await Answer.find({});
    return answers.map(answer => answer.toObject({ virtuals: true }));
  }
  static async getTags() {
    return await Tag.find({});
  }
  static async addQuestion(title, text, tagsInput, askedBy, askDate) {
    const tagIds = await this.addNewTags(tagsInput); 
    return await Question.create({
      title,
      text,
      tags: tagIds,
      asked_by: askedBy, 
      ask_date_time: askDate 
    });
  }

  static async addUser(username, email, password) {

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({
      username,
      password: hashedPassword,
      email,
    })
  }

  static async addNewTags(tagInput) {
    const tagIds = [];
    for (const tagName of tagInput) {
      let tag = await Tag.findOne({ name: { $regex: new RegExp('^' + tagName + '$', 'i') } });
      if (!tag) {
        tag = await Tag.create({ name: tagName});
      }
      tagIds.push(tag._id);
    }
    return tagIds;
  }
  

  static async addAnswer(text, author, qid, date) {
    const answer = await Answer.create({
      text,
      ans_by: author, 
      ans_date_time: date 
    });
    await Question.findByIdAndUpdate(qid, {
      $push: { answers: answer._id } 
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

  static async getAnswersForQuestion(qid, page, limit) {
    try {
        // Find the question without populating answers to get the total count
        const questionForCount = await Question.findById(qid).exec();

        if (!questionForCount || !questionForCount.answers) {
            return { answers: [], totalAnswers: 0 };
        }

        const total = questionForCount.answers.length;

        
        const questionWithPaginatedAnswers = await Question.findById(qid)
                                                           .populate({
                                                               path: 'answers',
                                                               options: { 
                                                                   sort: { 'ans_date_time': -1 },
                                                                   limit: limit,
                                                                   skip: limit * (page - 1)
                                                               }
                                                           })
                                                           .exec();

        if (!questionWithPaginatedAnswers) {
            return { answers: [], total: 0 };
        }

       
        const answers = questionWithPaginatedAnswers.answers.map(answer => answer.toObject({ virtuals: true }));

        return { answers, total };
    } catch (error) {
        console.error("Error in getAnswersForQuestion:", error);
        throw error;
    }
}



  static async getQuestionsByTag(tid) {
    const taggedQuestions = await Question.find({ tags: tid }).sort({ ask_date_time: -1 });
    const questions =  taggedQuestions.map(question => question.toObject({ virtuals: true }));
    return await this.addTagToQuestion(questions) 
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

static async getNewestQuestionsFirst(page, limit) {
  const totalCount = await Question.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);

  // Validate page number
  if (page < 1 || page > totalPages) {
      throw new Error('Invalid page number');
  }
    const questions = await Question.find({})
        .sort({ ask_date_time: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    return questions.map(question => question.toObject({ virtuals: true }));
}

static async getUnansweredQuestionsFirst(page, limit) {
  const totalCount = await Question.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    // Validate page number
    if (page < 1 || page > totalPages) {
        throw new Error('Invalid page number');
    }
  const questions = await Question.find({ answers: { $size: 0 } })
      .sort({ ask_date_time: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  return questions.map(question => question.toObject({ virtuals: true }));
}



static async getActiveQuestionsFirst(page, limit) {
  const totalCount = await Question.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    // Validate page number
    if (page < 1 || page > totalPages) {
        throw new Error('Invalid page number');
    }
      const mostActiveQuestions = await Question.aggregate([
      {
        $lookup: {
          from: 'answers', 
          localField: 'answers',
          foreignField: '_id',
          as: 'fetchedAnswers'
        }
      },
      {
        $addFields: {
          lastActivityDate: { $max: '$fetchedAnswers.ans_date_time' }
        }
      },
      { $sort: { lastActivityDate: -1 } },
      { $unset: 'fetchedAnswers' }
    ]).skip((page - 1) * limit)
      .limit(limit)
      .exec();

  return mostActiveQuestions.map(question => {
    const questionDoc = new Question(question);
    return questionDoc.toObject({ virtuals: true });
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
        case 'newest':
          questions = await this.getNewestQuestionsFirst(page, limit);
          break;
        case 'unanswered':
          questions = await this.getUnansweredQuestionsFirst(page, limit);
          break;
        case 'active':
          questions = await this.getActiveQuestionsFirst(page, limit);
          break;
        default:
          throw new Error('Invalid order specified');
      }
    }
   
    const total = await Question.countDocuments();
    const results = await this.addTagToQuestion(questions);
    return {
      questions: results,
      total
    };

  }

  static async addTagToQuestion(questions) {
    const results = await Promise.all(questions.map(async (question) => {
      const tags = await Tag.find({ _id: { $in: question.tags } }).lean();
      return {
        question:question,
        tags: tags
      };
    }));

    return results;
  }
  

  
  static async searchQuestions(query) {
    const tagPattern = /\[([^\]]+)\]/g;
    let tagNames = [];
    let match;
  
    // Function to escape special characters in regular expressions
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
  
    while ((match = tagPattern.exec(query))) {
      tagNames.push(match[1].toLowerCase());
    }
  
    const words = query.replace(tagPattern, ' ').trim().toLowerCase().split(/\s+/).filter(word => word);
  
    let searchConditions = [];
  
    if (tagNames.length) {
      // Transform each tagName into a case-insensitive regular expression
      const regexTagNames = tagNames.map(tagName => new RegExp('^' + escapeRegExp(tagName) + '$', 'i'));
  
      // Query the Tag collection to get the tag IDs
      const tags = await Tag.find({ name: { $in: regexTagNames } }).lean();
      if (tags.length > 0) {
        searchConditions.push({ tags: { $in: tags.map(tag => tag._id) } });
      }
    }
  
    if (words.length) {
      const wordConditions = words.map(word => ({
        $or: [
          { title: { $regex: `\\b${word}\\b`, $options: 'i' } },
          { text: { $regex: `\\b${word}\\b`, $options: 'i' } }
        ]
      }));
      searchConditions.push(...wordConditions);
    }

    if (searchConditions.length === 0) {
      return [];
    }
  
    const searchCriteria = searchConditions.length > 0 ? { $or: searchConditions } : {};
  
    const searchResult = await Question.find(searchCriteria).sort({ ask_date_time: -1 }).exec(); 
    return searchResult && searchResult.length > 0 
      ? await this.addTagToQuestion(searchResult) 
      : searchResult;
  }
  


  static async getTagsWithCounts() {
    const tags = await Tag.find({});
    const counts = await Promise.all(tags.map(async tag => {
      const count = await Question.countDocuments({ tags: tag._id });
      return {
        tid: tag._id,
        name: tag.name,
        count: count
      };
    }));
    return counts;
  }


  static async getTagsByIds(tagIds) {
    return await Tag.find({ _id: { $in: tagIds } });
  }


  static async getCommentsByQuestionId(qid, page, limit) {
    try {
        const skip = (page - 1) * limit;
        const questionForCount = await Question.findById(qid).exec();
        // Populate comments directly in the query
        const question = await Question.findById(qid)
                                       .populate({
                                           path: 'comments',
                                           model: Comment, // Ensure this is the correct model name
                                           options: {
                                               sort: { 'dateOfComment': -1 }, // Sort by date in descending order
                                               skip,
                                               limit
                                           }
                                       })
                                       .exec();

        if (!question) {
            throw new Error('Question not found');
        }

        const totalComments = questionForCount.comments.length;

        // Return the comments and total comment count
        return {
            comments: question.comments,
            total: totalComments
        };
    } catch (error) {
        console.error('Error in getCommentsByQuestionId:', error);
        throw error;
    }
}


static async getCommentsByAnsId(ansId, page, limit) {
  try {
      const skip = (page - 1) * limit;
      const answerForCount = await Answer.findById(ansId).exec();
      // Populate comments directly in the query
      const answer = await Answer.findById(ansId)
                                     .populate({
                                         path: 'comments',
                                         model: Comment, // Ensure this is the correct model name
                                         options: {
                                             sort: { 'dateOfComment': -1 }, // Sort by date in descending order
                                             skip,
                                             limit
                                         }
                                     })
                                     .exec();

      if (!answer) {
          throw new Error('Answer not found');
      }

      const totalComments = answerForCount.comments.length;

      // Return the comments and total comment count
      return {
          comments: answer.comments,
          total: totalComments
      };
  } catch (error) {
      console.error('Error in getCommentsByQuestionId:', error);
      throw error;
  }
}



}

module.exports = ApplicationModel;
