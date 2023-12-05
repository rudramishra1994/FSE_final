import axios from 'axios';

const serverAPI = axios.create({
  baseURL: 'http://localhost:8000/api', 
});
class ApplicationModel {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000/api', 
    });
  }

  async getQuestions() {
    const response = await this.api.get('/questions');
    return response.data;
  }

  async addQuestion(title, text, tagsInput, askedBy, askDate) {
    const response = await this.api.post('/questions', { title, text, tagsInput, askedBy, askDate });
    return response.data;
  }

  async addAnswer(text, author, qid, date) {
    try {
      const answerData = {
        text: text,
        ansBy: author,
        qid: qid, 
        ansDate: date
      };
      await this.api.post('/answers', answerData);
      
      
      
    } catch (error) {

      console.error('Error adding answer:', error);
      throw error; 
    }
  }

  async getQuestionById(qid) {
    const response = await this.api.get(`/questions/${qid}`);
    response.data.askDate = new Date(response.data.askDate);
    return response.data;
  }

  async getAnswersForQuestion(qid) {
    const response = await this.api.get(`/questions/${qid}/answers`);
    const answers = response.data.map(answer => {
      const ansDateConverted = new Date(answer.ansDate);
      if (isNaN(ansDateConverted.getTime())) {
        throw new Error(`Invalid date string received: ${answer.ansDate}`);
      }
      return {
        ...answer,
        ansDate: ansDateConverted
      };
    });

    return answers;
  }

  async getQuestionsByTag(tid) {
    const response = await this.api.get(`/questions/tag/${tid}`);
    const result = this.convertDateStringToDate(response);
    return result;
  }

  async getNewestQuestionsFirst() {
    const response = await this.api.get('/questions/newest');
    return response.data;
  }

  async getUnansweredQuestionsFirst() {
    const response = await this.api.get('/questions/unanswered');
    return response.data;
  }

  async incrementViewCount(qid) {
    const response = await this.api.put(`/questions/${qid}/views`);
    return response.data;
  }

  async getActiveQuestionsFirst() {
    const response = await this.api.get('/questions/active');0 
    return response.data;
  }

  async searchQuestions(query) {
    const response = await this.api.get('/search', { params: { q: query } });
    const searchResult = this.convertDateStringToDate(response);
    return searchResult;
  }

  async getTagsWithCounts() {
    const response = await this.api.get('/tags');
    return response.data;
  }

  async getQuestionsWithTags(filter) {
    try {
      const response = await this.api.get(`/questions/questionwithtags/${filter}`);
      const questionsWithDates = this.convertDateStringToDate(response);
  
      return questionsWithDates;
    } catch (error) {
      console.error('Error fetching questions with tags:', error);
      throw error;
    }
  }

  convertDateStringToDate(response){
    const questionsWithDates = response.data.map(item => {
      const askDateConverted = new Date(item.question.askDate);
      if (isNaN(askDateConverted.getTime())) {
        throw new Error(`Invalid date string received: ${item.question.askDate}`);
      }
      return {
        ...item,
        question: {
          ...item.question,
          askDate: askDateConverted,
        },
      };
    });
    return questionsWithDates;
  }


  async getTagsByIds(tagIds) {
    const response = await this.api.post('/tags/ids', { tagIds });
    return response.data;
  }

  static async registerUser(username, email, password) {
    try {
      const response = await serverAPI.post('/register', { username, email, password });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      return { success: false, error: error.response.data.message || 'Registration failed' };
    }
  }

  static async login(username,password){
    try {
      const response = await serverAPI.post('/login', {username,password});
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response.data.message || 'login failed' };
    }
  }

  static async logout(){
    try {
      const response = await serverAPI.post('/logout', { withCredentials: true } );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response.data.message || 'logout failed' };
    }
  }

}

export default ApplicationModel;