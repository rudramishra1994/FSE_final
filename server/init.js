// Setup database with initial test data.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import models
const User = require('./models/user'); 
const Question = require('./models/questions'); 
const Answer = require('./models/answers'); 
const Tag = require('./models/tags'); 

// Run this script to test your schema
// Start the mongoDB service as a background process before running the script
// Pass URL of your mongoDB instance as first argument(e.g., mongodb://127.0.0.1:27017/fake_so)
let userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let tags = [];
let answers = [];
function tagCreate(name) {
  let tag = new Tag({ name: name });
  return tag.save();
}

function answerCreate(text, ans_by, ans_date_time) {
  answerdetail = {text:text};
  if (ans_by != false) answerdetail.ans_by = ans_by;
  if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;

  let answer = new Answer(answerdetail);
  return answer.save();
}

function questionCreate(title, text, tags, answers, asked_by, ask_date_time, views) {
  qstndetail = {
    title: title,
    text: text,
    tags: tags,
    asked_by: asked_by,
    votes:150
  }
  if (answers != false) qstndetail.answers = answers;
  if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
  if (views != false) qstndetail.views = views;

  let qstn = new Question(qstndetail);
  return qstn.save();
}
function randomDateInPast10Years() {
  const today = new Date();
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

  return new Date(tenYearsAgo.getTime() + Math.random() * (today.getTime() - tenYearsAgo.getTime()));
}
async function createUser(username, email, password) {
  let hashedPassword = await bcrypt.hash(password, 10);
  let user = new User({ username, email, password: hashedPassword, reputation: 50,dateOfAccountCreation:randomDateInPast10Years() }); // Ensure 50 reputation
  return user.save();
}

const populate = async () => {


  let user1 = await createUser('rudra','abc@abc.com','password');
  let user2 = await createUser('joydeep','xyz@abc.com','password123');
  let user3 = await createUser('aryan','xyz@abd.com','password456');
  let t1 = await tagCreate('react');
  let t2 = await tagCreate('javascript');
  let t3 = await tagCreate('android-studio');
  let t4 = await tagCreate('shared-preferences');
  // let t5 = await tagCreate('iOS');
  // let t6 = await tagCreate('Swift');
  // let t7 = await tagCreate('Flutter');
  let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', 
  'hamkalo', new Date('March 02, 2022 15:30:00'));
  let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', 
  'azad', new Date('January 31, 2022 15:30:00'));
  let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.',
  'abaya', new Date('April 21, 2022 15:25:22'));
  let a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);',
  'alia', new Date('December 02, 2022 02:20:59'));
  let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', 
  'sana', new Date('December 31, 2022 20:20:59'));
  // let a6 = await answerCreate('You cannot have multiple threads modifying the same resource at the same time. ', 'abhi', new Date('September 10, 2023 18:20:59'));
  // let a7 = await answerCreate('Use locks for resources so that they can synchronize while multithreading. ', 'moon', new Date('2023-11-01T15:24:19'));
  // let a8 = await answerCreate('Flutter would be an excellent tool to start with cross platform development. ', 'ihba001', new Date('October 11, 2023 21:17:53'));
  await questionCreate('Programmatically navigate using React router', 
  'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.', 
  [t1, t2], [a1, a2], 'JoJi John', new Date('December 17, 2020 03:24:00'), 10);
  await questionCreate('android studio save string shared preference, start activity and load the saved string', 
  'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.',
  [t3, t4, t2], [a3, a4, a5], 'saltyPeter', new Date('January 01, 2022 21:06:12'), 121);
  // await questionCreate('iOS development concurrent modification exception',
  // 'I am trying to use the same data structure for multiple threads in Swift and getting concurrent modification exception',
  // [t5, t6,t7],[a6, a7],'leo',new Date('January 18, 2022 00:00:00'),200);
  // await questionCreate('cross platform mobile application development',
  //   'What tool would you suggest me to use to develop apps for both android and iOS',
  //   [t3, t4, t5],[a8],'duke',new Date('March 19, 2023 00:00:00'),103);

  if(db) db.close();
  console.log('done');
}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if(db) db.close();
  });

console.log('processing ...');