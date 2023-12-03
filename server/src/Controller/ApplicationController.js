const ApplicationModel = require('../../models/ApplicationModel');

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
    try {
      const question = await ApplicationModel.addQuestion(req.body.title, req.body.text, req.body.tagsInput, req.body.askedBy, req.body.askDate);
      res.status(201).json(question);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async addUser(req, res) {
    try {
      const { username, email, password } = req.body;

      await ApplicationModel.addUser(username, email, password);

      res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
      console.error('Registration error:', error);

      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        let message = `An account with that ${field} already exists.`;
        return res.status(409).json({ message }); // 409 Conflict
      }

      res.status(500).json({ message: 'Error registering new user' });
    }
  }

  static async addAnswer(req, res) {
    try {
      
      const { text, ansBy, qid, ansDate } = req.body;
      const answer = await ApplicationModel.addAnswer(text, ansBy, qid, new Date(ansDate));
      res.status(201).json(answer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



  static async getQuestionById(req, res) {
    try {
      const question = await ApplicationModel.getQuestionById(req.params.qid);
      if (!question) {
        return res.status(404).send('Question not found');
      }
      res.json(question);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAnswersForQuestion(req, res) {
    try {
      const answers = await ApplicationModel.getAnswersForQuestion(req.params.qid);
      res.json(answers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getQuestionsByTag(req, res) {
    try {
      const questions = await ApplicationModel.getQuestionsByTag(req.params.tid);
      res.json(questions);
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
      const mostActiveQuestions = await ApplicationModel.getActiveQuestionsFirst();
      res.json(mostActiveQuestions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getQuestionWithTags(req, res) {
    try {
      const questionWithTags = await ApplicationModel.getQuestionsWithTags(req.params.order);
      res.json(questionWithTags);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async incrementViewCount(req, res) {
    try {
      await ApplicationModel.incrementViewCount(req.params.qid);
      res.send('View count incremented');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async searchQuestions(req, res) {
    try {
      const questions = await ApplicationModel.searchQuestions(req.query.q);
      res.json(questions);
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
      const questionsWithTags = await ApplicationModel.getQuestionsWithTags(req.body.questions);
      res.json(questionsWithTags);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getTagsByIds(req, res) {
    try {
      // Assuming tag IDs are passed in the body of the request. Adjust as needed for your API design.
      const tags = await ApplicationModel.getTagsByIds(req.body.tagIds);
      res.json(tags);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = ApplicationController;
