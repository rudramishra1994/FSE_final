// Guideline:
// 1 | Home Page
// 2 | Post a New question
// 3 | Searching by text
// 4 | Searching by tags
// 5 | Answers Page
// 6 | Post a new answer
// 7 | All Tags page
// 8 | Questions of a tag

// 1.1 Home Page 1
// -- Add three questions
// -- add an answer to one of the questions
// -- Verify only those two questions shows up when clicking unanswered button

describe('Unanswered button verification', () => {
    it('Adds a question, click unanswered button, verifies the sequence', () => {
        cy.visit('http://localhost:3000');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('mks1');
        cy.contains('Post Question').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question B');
        cy.get('#formTextInput').type('Test Question B Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('mks2');
        cy.contains('Post Question').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question C');
        cy.get('#formTextInput').type('Test Question C Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('mks3');
        cy.contains('Post Question').click();

        // add an answer to question A
        cy.contains('Test Question A').click();
        cy.contains('Answer Question').click();
        cy.get('#answerUsernameInput').type('abc3');
        cy.get('#answerTextInput').type('Answer Question A');
        cy.contains('Post Answer').click();

        // go back to main page
        cy.contains('Questions').click();

        // clicks unanswered
        cy.contains('Unanswered').click();
        const qTitles = ['Test Question C', 'Test Question B']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 1.2 Home Page 2
describe('Home Page Tests', () => {
    it('Check if questions are displayed in descending order of dates.', () => {
        const qTitles = ['Test Question C','Test Question B','Test Question A','cross platform mobile application development','iOS development concurrent modification exception','android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
          
        cy.visit('http://localhost:3000');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 1.3 Home Page 3
describe('Home Page Tests', () => {
    it('successfully shows all questions in model in active order', () => {
        const qTitles = ['Test Question A','cross platform mobile application development', 'iOS development concurrent modification exception', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router','Test Question B','Test Question C'];
        cy.visit('http://localhost:3000');
        cy.contains('Active').click();
        cy.contains('All Questions')
        cy.contains('7 questions')
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 2.1 Post a New question 1
describe('New Question Form - Multiple questions', () => {
    it('Adds multiple questions one by one and displays them in All Questions', () => {
        cy.visit('http://localhost:3000');

        // Add multiple questions
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 2');
        cy.get('#formTextInput').type('Test Question 2 Text');
        cy.get('#formTagInput').type('react');
        cy.get('#formUsernameInput').type('abhi');
        cy.contains('Post Question').click();


        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 3');
        cy.get('#formTextInput').type('Test Question 3 Text');
        cy.get('#formTagInput').type('java');
        cy.get('#formUsernameInput').type('abhi');
        cy.contains('Post Question').click();

        // verify the presence of multiple questions in most recently added order.
        cy.contains('Fake Stack Overflow');
        cy.contains('10 questions')
        const qTitles = ['Test Question 3', 'Test Question 2', 'Test Question 1','Test Question C','Test Question B','Test Question A','cross platform mobile application development','iOS development concurrent modification exception','android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        });
        
        // verify that when clicking "Unanswered", the unanswered questions are shown
        cy.contains('Unanswered').click();
        cy.contains('5 questions');
        const qTitlesUnanswered = ['Test Question 3', 'Test Question 2', 'Test Question 1','Test Question C','Test Question B']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitlesUnanswered[index]);
        })

    });
});

// 2.2 Post a New question 2
describe('New Question Form Metadata (second version)', () => {
    it('Ask a Question creates and displays expected meta data', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question Q1');
        cy.get('#formTextInput').type('Test Question Q1 Text T1');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('new user 32');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('10 questions');
        cy.contains('new user 32 asked 0 seconds ago');
        const answers = ['0 answers','0 answers','0 answers','0 answers','0 answers','0 answers','1 answers', '1 answers','2 answers', '3 answers', '2 answers'];
        const views = ['0 views','0 views','0 views','0 views','0 views','0 views','1 views', '103 views', '200 views', '121 views','10 views'];
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers[index]);
            cy.wrap($el).should('contain', views[index]);
        });
        cy.contains('Unanswered').click();
        cy.get('.postTitle').should('have.length', 6);
        cy.contains('6 questions');
    })
})

// 2.3 Post a New question 3
describe('New Question Form Error Empty Title', () => {
    it('Ask a Question with empty title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTextInput').type('Test Question 1 Text Q1');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('new user 32');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be empty');
    })
})

// 3.1 Search by Text 1
describe('Search for Non-Existent Question by Text', () => {
    it('Search for a question using text content that does not exist', () => {
        const searchText = "Web3";
        
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type(`${searchText}{enter}`);
        cy.get('.postTitle').should('have.length', 0);
    })
});

// 3.2 Search by Text 2
describe('Search 2', () => {
    it('Search string in question text', () => {
        const qTitles = ['iOS development concurrent modification exception'];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('concurrent{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 3.3 Search by Text 3
describe('Search 3', () => {
    it('Search string in question text', () => {
        const qTitles = ['cross platform mobile application development'];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('mobile application{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 4.1 Search by Tag 1
describe('Search by Tag 2', () => {
    it('Search a question by tag (t1)', () => {
        const qTitles = ["Test Question 2","Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('[React]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 4.2 Search by Tag 2
describe('Search by Tag 3', () => {
    it('Search a question by tag (t2)', () => {
        const qTitles = ['Test Question Q1','Test Question 1','Test Question C','Test Question B','Test Question A','android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('[javascript]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 4.3 Search by Tag 3
describe('Search by Tag 4', () => {
    it('Search a question by tag (t3)', () => {
        const qTitles = ['cross platform mobile application development','android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('[android-studio]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 4.4 Search by Tag 4
describe('Search by Tag 5', () => {
    it('Search a question by tag (t4)', () => {
        const qTitles = ['cross platform mobile application development',"android studio save string shared preference, start activity and load the saved string"];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('[shared-preferences]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 4.5 Search by Tag 5
describe('Search for Non-Existent Tag', () => {
    it('Search for a question using a tag that does not exist', () => {
        const nonExistentTag = "nonExistingTag";
        
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type(`[nonExistentTag]{enter}`);
        cy.get('.postTitle').should('have.length', 0);
    })
});

// 5.1 Answers Page 1
describe('New Answer Page 1', () => {
    it('Create new answer should be displayed at the top of the answers page', () => {
        const answers = ["Test Answer 1", "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.", "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router."];
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.contains('Answer Question').click();
        cy.get('#answerUsernameInput').type('joym');
        cy.get('#answerTextInput').type(answers[0]);
        cy.contains('Post Answer').click();

        cy.get('.answerText').each(($el, index) => {
            cy.contains(answers[index]);
        });
        cy.contains('joym');
        cy.contains('0 seconds ago');
    });
});

// 5.2 Answers Page 2
describe('New Answer Page 2', () => {
    it('Username is mandatory when creating a new answer', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type("Test Anser 1");
        cy.contains('Post Answer').click();
        cy.contains('Username cannot be empty');
    });
});

// 5.3 Answers Page 3
describe('New Answer Page 3', () => {
    it('Answer is mandatory when creating a new answer', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.contains('Answer Question').click();
        cy.get('#answerUsernameInput').type('joym');
        cy.contains('Post Answer').click();
        cy.contains('Answer text cannot be empty');
    });
});

// 6.1 Post a new answer 1
// -- add a question
// -- add an answer to each question
// -- verify the questions are displayed in the same order in which the answers were added
describe('Active button verification test', () => {
    it('Adds a question, click active button, verifies the sequence', () => {
        cy.visit('http://localhost:3000');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question Z');
        cy.get('#formTextInput').type('Test Question Z Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('mks0');
        cy.contains('Post Question').click();

        // add an answer to question of React Router
        cy.contains('Programmatically navigate using React router').click();
        cy.contains('Answer Question').click();
        cy.get('#answerUsernameInput').type('mks1');
        cy.get('#answerTextInput').type('Answer to React Router');
        cy.contains('Post Answer').click();

        // go back to main page
        cy.contains('Questions').click();

        // add an answer to question of Android Studio
        cy.contains('android studio save string shared preference, start activity and load the saved string').click();
        cy.contains('Answer Question').click();
        cy.get('#answerUsernameInput').type('mks1');
        cy.get('#answerTextInput').type('Answer to android studio');
        cy.contains('Post Answer').click();

        // go back to main page
        cy.contains('Questions').click();

        // add an answer to question A
        cy.contains('Test Question Z').click();
        cy.contains('Answer Question').click();
        cy.get('#answerUsernameInput').type('mks2');
        cy.get('#answerTextInput').type('Answer Question A');
        cy.contains('Post Answer').click();

        // go back to main page
        cy.contains('Questions').click();

        // clicks active
        cy.contains('Active').click();

        
        const qTitles = ['Test Question Z', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router','Test Question A',  'cross platform mobile application development', 'iOS development concurrent modification exception' ]
        cy.get('.postTitle').each(($el, index, $list) => {
            if(index < 3)
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

// 6.2 Post a new answer 2
// Check answers a6 and a7 are in q3
describe('New Answer Page 2', () => {
    it('Checks if a6 and a7 exist in q3 answers page', () => {
        const answers = ['Use locks for resources so that they can synchronize while multithreading. ', 'You cannot have multiple threads modifying the same resource at the same time. '];
        cy.visit('http://localhost:3000');
        cy.contains('iOS development concurrent modification exception').click();
        cy.get('.answerText').each(($el, index) => {
            cy.contains(answers[index]);
        });
    });
});

// 6.3 Post a new answer 3
// Check answers a8 in q4
describe('New Answer Page 3', () => {
    it('Checks if a8 exist in q4 answers page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('cross platform mobile application development').click();
        cy.contains('Flutter would be an excellent tool to start with cross platform development.');
    });
});

// 7.1 All Tag page 1
// -- Create a new question with new tags
// -- Click on tags
// -- verify new tags displayed

describe('Tags verification test', () => {
    it('Adds a question with tags, checks the tags existied', () => {
        cy.visit('http://localhost:3000');
        
        // add a question with tags
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('test1 test2 test3');
        cy.get('#formUsernameInput').type('mks1');
        cy.contains('Post Question').click();

        // clicks tags
        cy.contains('Tags').click();
        cy.contains('test1');
        cy.contains('test2');
        cy.contains('test3');
        
    })
})

// 7.2 All Tag page 2
// All tags exist
describe('All tags exist', () => {
    it('Adds a question with tags, checks the tags existied', () => {
        cy.visit('http://localhost:3000');
        // all tags exist in the page
        cy.contains('Tags').click();
        cy.contains('react');
        cy.contains('javascript');
        cy.contains('android-studio');
        cy.contains('shared-preferences');
        cy.contains('iOS');
        cy.contains('Swift');
        cy.contains('Flutter');
    })
})
// 7.3 All Tag page 3
// Tags question numbers all exist

describe('All tags exist', () => {
    it('Adds a question with tags, checks the tags existied', () => {
        cy.visit('http://localhost:3000');
        // all question no. should be in the page
        cy.contains('Tags').click();
        cy.contains('11 Tags');
        cy.contains('Tags').click();
        cy.contains('react');
        cy.contains('javascript');
        cy.contains('android-studio');
        cy.contains('shared-preferences');
        cy.contains('iOS');
        cy.contains('Swift');
        cy.contains('Flutter');
        cy.contains('java')
        cy.contains('test1');
        cy.contains('test2');
        cy.contains('test3');
    })
})

// 8.1 Question of a tag 1
// Going to a question through a tag
describe('go through a question in tags', () => {
    it('go to question in tag react', () => {
        cy.visit('http://localhost:3000');
        // all question no. should be in the page0
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('Programmatically navigate using React router')
    })
})

// 8.2 Question of a tag 2
// Going to a question through a tag
describe('go through another question in tags', () => {
    it('go to questions in tag iOS', () => {
        cy.visit('http://localhost:3000');
        // all question no. should be in the page
        cy.contains('Tags').click();
        cy.contains('iOS').click();
        cy.contains('cross platform mobile application development')
        cy.contains('iOS development concurrent modification exception')
    })
})

// 8.3 Question of a tag 3
// create a new question with a new tag and finds the question through tag
describe('create a new question with a new tag and finds the question through tag', () => {
    it('create a new question with a new tag and finds the question through tag', () => {
        cy.visit('http://localhost:3000');
        
        // add a question with tags
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('test1-tag1');
        cy.get('#formUsernameInput').type('mks1');
        cy.contains('Post Question').click();

        // clicks tags
        cy.contains('Tags').click();
        cy.contains('test1-tag1').click();
        cy.contains('Test Question A')  
    })
})