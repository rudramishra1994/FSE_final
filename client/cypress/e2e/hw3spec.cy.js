describe('Home Page 1', () => {
    it('successfully shows All Questions string', () => {
        cy.visit('http://localhost:3000');
        cy.contains('All Questions');
    })
})

describe('Home Page 2', () => {
    it('successfully shows Ask a Question button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question');
    })
})

describe('Home Page 3', () => {
    it('successfully shows total questions number', () => {
        cy.visit('http://localhost:3000');
        cy.contains('2 questions');
    })
})

describe('Home Page 4', () => {
    it('successfully shows filter buttons', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Newest');
        cy.contains('Active');
        cy.contains('Unanswered');
    })
})

describe ('Home Page 5', () => {
    it('successfully shows menu items', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Questions');
        cy.contains('Tags');
    })
})

describe ('Home Page 6', () => {
    it('successfully shows search bar', () => {
        cy.visit('http://localhost:3000');
        cy.get('#searchBar');
    })
})

describe('Home Page 7', () => {
    it('successfully shows page title', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Fake Stack Overflow');
    })
})

describe('Home Page 8', () => {
    it('successfully shows all questions in model', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.visit('http://localhost:3000');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Home Page 9', () => {
    it('successfully shows all question stats', () => {
        const answers = ['3 answers','2 answers'];
        const views = ['121 views','10 views'];
        cy.visit('http://localhost:3000');
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers[index]);
            cy.wrap($el).should('contain', views[index]);
        })
    })
})

describe('Home Page 10', () => {
    it('successfully shows all question authors and date time', () => {
        const authors = ['saltyPeter', 'JoJi John'];
        const date = ['Jan 01', 'Dec 17'];
        const times = ['21:06', '03:24'];
        cy.visit('http://localhost:3000');
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        })
    })
})

describe('Home Page 11', () => {
    it('successfully shows all questions in model in active order', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.visit('http://localhost:3000');
        cy.contains('Active').click();
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Home Page 12', () => {
    it('successfully shows all unanswered questions in model', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.visit('http://localhost:3000');
        cy.contains('Unanswered').click();
        cy.contains('0 questions');
    })
})

describe('New Question Form', () => {
    it('Ask a Question creates and displays in All Questions', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('3 questions');
        const qTitles = ['Test Question 1', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        });
    })
})

describe('New Question Form Metadata', () => {
    it('Ask a Question creates and displays expected meta data', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('4 questions');
        cy.contains('joym asked 0 seconds ago');
        const answers = ['0 answers','0 answers', '3 answers','2 answers'];
        const views = ['0 views','0 views', '121 views','10 views'];
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers[index]);
            cy.wrap($el).should('contain', views[index]);
        });
        cy.contains('Unanswered').click();
        cy.get('.postTitle').should('have.length', 2);
        cy.contains('2 questions');
    })
})

describe('New Question Form with many tags 1', () => {
    it('Ask a Question creates and displays in All Questions with necessary tags', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript t1 t2');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('javascript');
        cy.contains('t1');
        cy.contains('t2');
    })
})

describe('New Question Form with many tags 2', () => {
    it('Ask a Question creates and displays in All Questions with necessary tags', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript t1 t2');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('javascript');
        cy.contains('android-studio');
        cy.contains('t2');
    })
})

describe('New Question Form Error Empty Title', () => {
    it('Ask a Question with empty title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be empty');
    })
})

describe('New Question Form Error Long Title', () => {
    it('Ask a Question with long title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be more than 100 characters');
    })
})

describe('New Question Form Error Empty Text', () => {
    it('Ask a Question with empty text shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTagInput').type('javascript');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Question text cannot be empty');
    })
})

describe('New Question Form Error Extra Tags', () => {
    it('Ask a Question with more than 5 tags shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 t2 t3 t4 t5 t6');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Cannot have more than 5 tags');
    })
})

describe('New Question Form Error Long New Tag', () => {
    it('Ask a Question with a long new tag', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 t2 t3t4t5t6t7t8t9t3t4t5t6t7t8t9');
        cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('New tag length cannot be more than 20');
    })
})

describe('Answer Page 1', () => {
    it('Answer Page displays expected header', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('#answersHeader').should('contain', 'Programmatically navigate using React router');
        cy.get('#answersHeader').should('contain', '2 answers');
        cy.get('#answersHeader').should('contain', 'Ask a Question');
        cy.get('#sideBarNav').should('contain', 'Questions');
        cy.get('#sideBarNav').should('contain', 'Tags');
    })
})

describe('Answer Page 2', () => {
    it('Answer Page displays expected question text', () => {
        const text = "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate.";
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('#questionBody').should('contain', '12 views');
        cy.get('#questionBody').should('contain', text);
        cy.get('#questionBody').should('contain', 'JoJi John');
        cy.get('#questionBody').should('contain', 'Dec 17, 2020');
        cy.get('#questionBody').should('contain', '3:24');
    })
})

describe('Answer Page 3', () => {
    it('Answer Page displays expected answers', () => {
        const answers = ["React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.", "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router."];
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('.answerText').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
    });
});

describe('Answer Page 4', () => {
    it('Answer Page displays expected authors', () => {
        const authors = ['hamkalo', 'azad'];
        const date = ['Mar 02','Jan 31'];
        const times = ['15:30','15:30'];
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('.answerAuthor').each(($el, index) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        });
    });
});

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
            cy.wrap($el).should('contain', answers[index]);
        });
        cy.contains('joym');
        cy.contains('0 seconds ago');
    });
});

describe('New Answer Page 2', () => {
    it('Username is mandatory when creating a new answer', () => {
        const answers = ["Test Answer 1", "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.", "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router."];
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type(answers[0]);
        cy.contains('Post Answer').click();
        cy.contains('Username cannot be empty');
    });
});

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

describe('Search 1', () => {
    it('Search string in question text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('navigation{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Search 2', () => {
    it('Search string matches tag and text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('navigation [React]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('All Tags 1', () => {
    it('Total Tag Count', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Tags').click();
        cy.contains('All Tags');
        cy.contains('6 Tags');
        cy.contains('Ask a Question');
    })
})

describe('All Tags 2', () => {
    it('Tag names and count', () => {
        const tagNames = ['react', 'javascript', 'android-studio', 'shared-preferences','t1','t2'];
        const tagCounts = ['1 question', '6 questions', '1 question', '1 question', '2 questions', '2 questions'];
        cy.visit('http://localhost:3000');
        cy.contains('Tags').click();
        cy.get('.tagNode').each(($el, index, $list) => {
            cy.wrap($el).should('contain', tagNames[index]);
            cy.wrap($el).should('contain', tagCounts[index]);
        })
    })
})

describe('All Tags 3', () => {
    it('Click Tag Name', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('Programmatically navigate using React router');
        cy.contains('3 answers');
        cy.contains('17 views');
        cy.contains('JoJi John');
        cy.contains('Dec 17');
        cy.contains('03:24');
    })
})



describe('New Question with Link', () => {
    it('Adds a question with a hyperlink and verifies', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('How to add a hyperlink in Markdown?');
        cy.get('#formTextInput').type('Here is a link: [Google](https://www.google.com)');
        cy.get('#formTagInput').type('markdown');
        cy.get('#formUsernameInput').type('user1');
        cy.contains('Post Question').click();
        cy.contains('How to add a hyperlink in Markdown?').click();
       cy.get('#questionBody').find('a').should('have.attr', 'href', 'https://www.google.com');
    });
});

describe('New Answer with link', () => {
    it('Create new answer should be displayed at the top of the answers page', () => {
        const answers = ['Check this link for more info: [Documentation](https://docs.example.com)', "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.", "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router."];
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.contains('Answer Question').click();
        cy.get('#answerUsernameInput').type('joym');
        cy.get('#answerTextInput').type('Check this link for more info: [Documentation](https://docs.example.com)');
        cy.contains('Post Answer').click();
        cy.get('.answerText').first().within(() => {
            cy.get('a').should('have.attr', 'href', 'https://docs.example.com');
        });              
        cy.contains('joym');
        cy.contains('0 seconds ago');
    });
});

describe('Invalid Hyperlink in Question', () => {
    it('Tries to add a question with an invalid hyperlink and verifies failure', () => {
        const invalidUrls = [
            '[Google](htt://www.google.com)',
            '[Microsoft](microsoft.com)',
            '[Apple](https://)',
            '[](https://www.google.com/)',
            '[link]()',
            'dfv[]()',
            '[link](http://www.google.com/)',
            '[Google](https//www.google.com)',
            '[GitHub](http//github.com)',
            '[Facebook](https:/facebook.com)',
            '[Twitter](://twitter.com)',
            '[Amazon](https://)',
            '[Netflix](htps://www.netflix)',
            '[Google](htts://www.goo<gle.com)',
            '[Google](http://www.google)',
            '[Dropbox](ttps://www.dropbox.c-m)',
            '[LinkedIn](ps:/www.linkedin.com)',
            '[Adobe](ttps://www.adobe..com)',
            '[Spotify](ttp:///www.spotify.com)',
            '[Reddit](http://reddit)',
            '[Wikipedia](tps://www.wikipedia=com)'
          ];
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('How to add an invalid hyperlink in Markdown?');
        invalidUrls.forEach((url) => {
            cy.get('#formTextInput').clear().type(`This is an invalid link: ${url}`);
            cy.get('#formTagInput').clear().type('markdown');
            cy.get('#formUsernameInput').clear().type('user1');
            cy.contains('Post Question').click();
            cy.contains('Invalid hyperlink');
          });
        cy.visit('http://localhost:3000');
        cy.contains('How to add an invalid hyperlink in Markdown?').should('not.exist');
    });
});


describe('Invalid Hyperlink in Answer', () => {
    it('Attempts to add an answer with an invalid hyperlink and verifies failure', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.contains('Answer Question').click();
        cy.get('#answerUsernameInput').type('user1');
        cy.get('#answerTextInput').type('Check this invalid link: [](https://wrong.url)');
        cy.contains('Post Answer').click();
        cy.contains('Invalid hyperlink');
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('.answerText').should('not.contain', 'https://wrong.url');
    });
});

describe('Invalid Hyperlinks in Answer', () => {
    it('Tries to add an answer with invalid hyperlinks and verifies failure', () => {
      const invalidUrls = [
        '[Google](htt://www.google.com)',
        '[Microsoft](microsoft.com)',
        '[Apple](https://)',
        '[](https://www.google.com/)',
        '[link]()',
        'dfv[]()',
        '[link](http://www.google.com/)',
        '[Google](https//www.google.com)',
        '[GitHub](http//github.com)',
        '[Facebook](https:/facebook.com)',
        '[Twitter](://twitter.com)',
        '[Amazon](https://)',
        '[Netflix](htps://www.netflix)',
        '[Google](htts://www.goo<gle.com)',
        '[Google](http://www.google)',
        '[Dropbox](ttps://www.dropbox.c-m)',
        '[LinkedIn](ps:/www.linkedin.com)',
        '[Adobe](ttps://www.adobe..com)',
        '[Spotify](ttp:///www.spotify.com)',
        '[Reddit](http://reddit)',
        '[Wikipedia](tps://www.wikipedia=com)'
      ];
      
      cy.visit('http://localhost:3000');
      cy.contains('Programmatically navigate using React router').click();
      cy.contains('Answer Question').click();
      cy.get('#answerUsernameInput').type('joym');
  
      invalidUrls.forEach((url) => {
        cy.get('#answerTextInput').clear().type(url);
        cy.contains('Post Answer').click();
        cy.wait(1000);
        cy.contains('Invalid hyperlink');
      });
    });
  });
  

  describe('New Multiple Questions with Links', () => {
    it('Adds multiple questions with valid hyperlinks and verify', () => {
        cy.visit('http://localhost:3000');

        // List of question data
        const questions = [
            { title: 'Test Question 1', text: 'Test Question 1 Text [Google](https://www.google.com)', tag: 'javascript', username: 'joym', link:'https://www.google.com' },
            { title: 'Test Question 2', text: 'Test Question 2 Text [Yahoo](https://www.yahoo.com)', tag: 'react', username: 'abhi',link:'https://www.yahoo.com' },
            { title: 'How to add a hyperlink in Markdown?', text: 'Here is a link: [Google](https://www.google.com)', tag: 'markdown', username: 'user1' ,link:'https://www.google.com'}
        ];

        // Add multiple questions with hyperlinks
        questions.forEach((question) => {
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type(question.title);
            cy.get('#formTextInput').type(question.text);
            cy.get('#formTagInput').type(question.tag);
            cy.get('#formUsernameInput').type(question.username);
            cy.contains('Post Question').click();
        });

        cy.contains('Questions').click();
        questions.reverse().forEach(q =>{
            cy.contains(q.title).click()
            cy.get('#questionBody').find('a').should('have.attr', 'href',q.link);
            cy.contains('Questions').click();
        })
        });
});



describe('New Multiple Answers with Links', () => {
    it('Adds multiple questions with valid hyperlinks and verify', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();

        // List of question data
        const answers = [
            { username: 'abhi1', text: 'Test answer 1 Text [Google](https://www.google.com)',  link:'https://www.google.com' },
            { username: 'abhi2', text: 'Test answer 2 Text [Yahoo](https://www.yahoo.com)', link:'https://www.yahoo.com' },
            { username: 'abhi3', text: 'Here is a link: [Google](https://www.google.com)', link:'https://www.google.com'}
        ];

        // Add multiple questions with hyperlinks
        answers.forEach((answer) => {
            cy.contains('Answer Question').click();
            cy.get('#answerUsernameInput').type(answer.username);
            cy.get('#answerTextInput').type(answer.text);
            cy.contains('Post Answer').click();
        });

        const revAnswers = answers.reverse();
        cy.contains('Questions').click();
        cy.contains('Programmatically navigate using React router').click();
        cy.get('.answerText').each(($el, index) => {
            if (index < 3) {
                cy.wrap($el).within(() => {
                    cy.get('a').should('have.attr', 'href', revAnswers[index].link);
                });
            }
        });






});


});

describe('New Multiple Answers with Links', () => {
    it('Adds multiple questions with valid hyperlinks and  and verify it opens in new tab on click', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();

        // List of answer data
        const answers = [
            { username: 'abhi1', text: 'Test answer 1 Text [Google](https://www.google.com)',  link:'https://www.google.com' },
            { username: 'abhi2', text: 'Test answer 2 Text [Yahoo](https://www.yahoo.com)', link:'https://www.yahoo.com' },
            { username: 'abhi3', text: 'Here is a link: [Google](https://www.google.com)', link:'https://www.google.com'}
        ];

        // Add multiple answers with hyperlinks
        answers.forEach((answer) => {
            cy.contains('Answer Question').click();
            cy.get('#answerUsernameInput').type(answer.username);
            cy.get('#answerTextInput').type(answer.text);
            cy.contains('Post Answer').click();
        });

        const revAnswers = answers.reverse();
        cy.contains('Questions').click();
        cy.contains('Programmatically navigate using React router').click();
        cy.get('.answerText').each(($el, index) => {
            if (index < 3) {
                cy.wrap($el).within(() => {
                    cy.get('a').should('have.attr', 'href', revAnswers[index].link);
                    cy.get('a').should('have.attr', 'target', '_blank'); // Check if link opens in a new tab
                });
            }
        });
    });
});


describe('New Multiple Questions with Links', () => {
    it('Adds multiple questions with valid hyperlinks and verify it opens in new tab on click', () => {
        cy.visit('http://localhost:3000');

        // List of question data
        const questions = [
            { title: 'Test Question 1', text: 'Test Question 1 Text [Google](https://www.google.com)', tag: 'javascript', username: 'joym', link:'https://www.google.com' },
            { title: 'Test Question 2', text: 'Test Question 2 Text [Yahoo](https://www.yahoo.com)', tag: 'react', username: 'abhi',link:'https://www.yahoo.com' },
            { title: 'How to add a hyperlink in Markdown?', text: 'Here is a link: [Google](https://www.google.com)', tag: 'markdown', username: 'user1' ,link:'https://www.google.com'}
        ];

        // Add multiple questions with hyperlinks
        questions.forEach((question) => {
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type(question.title);
            cy.get('#formTextInput').type(question.text);
            cy.get('#formTagInput').type(question.tag);
            cy.get('#formUsernameInput').type(question.username);
            cy.contains('Post Question').click();
        });

        cy.contains('Questions').click();
        questions.reverse().forEach(q => {
            cy.contains(q.title).click()
            cy.get('#questionBody').find('a').should('have.attr', 'href', q.link);
            cy.get('#questionBody').find('a').should('have.attr', 'target', '_blank'); // Check if link opens in a new tab
            cy.contains('Questions').click();
        })
    });
});

