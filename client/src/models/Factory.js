
import Question from './DAO/Question.js';
import Answer from './DAO/Answer.js';
import Tag from './DAO/Tag.js';
class Factory {
    createQuestion(data) {
      return new Question(
        data.qid,
        data.title,
        data.text,
        data.tagIds,
        data.askedBy,
        data.askDate,
        data.ansIds,
        data.views
      );
    }
  
    createAnswer(data) {
      return new Answer(
        data.aid,
        data.text,
        data.ansBy,
        data.ansDate
      );
    }
  
    createTag(data) {
      return new Tag(
        data.tid,
        data.name
      );
    }
  }

  export default Factory;
  
  
  