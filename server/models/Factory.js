

const Question = require('./questions');
const Answer = require('./answers');
const Tag = require('./tags');

class Factory {
  createQuestion(data) {
    // Create a new document instance using the Mongoose model
    return new Question({
      title: data.title,
      text: data.text,
      tagIds: data.tagIds,
      askedBy: data.askedBy,
      askDate: data.askDate,
      ansIds: data.ansIds,
      views: data.views
    });
  }

  createAnswer(data) {
    // Create a new document instance using the Mongoose model
    return new Answer({
      text: data.text,
      ansBy: data.ansBy,
      ansDate: data.ansDate
    });
  }

  createTag(data) {
    // Create a new document instance using the Mongoose model
    return new Tag({
      name: data.name
    });
  }
}

// Export the Factory class using module.exports for CommonJS
module.exports = Factory;
