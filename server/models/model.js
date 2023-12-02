const getRandomSubset = (array, size) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  };
  
  const allAnswerIds = Array.from({ length: 50 }, (_, i) => `a${i + 1}`);
  const allTagIds = Array.from({ length: 50 }, (_, i) => `t${i + 1}`);
  
  const data = {
   questions: [
    {
        title: 'Programmatically navigate using React router',
        text: 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.',
        tagIds: ['t1', 't2'],
        askedBy : 'JoJi John',
        askDate: new Date('December 17, 2020 03:24:00'),
        ansIds: ['a1', 'a2'],
        views: 10,
      },
      {
        title: 'android studio save string shared preference, start activity and load the saved string',
        text: 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.',
        tagIds: ['t3', 't4', 't2'],
        askedBy : 'saltyPeter',
        askDate: new Date('January 01, 2022 21:06:12'),
        ansIds: ['a3', 'a4', 'a5'],
        views: 121,
      },
    {
      title: 'Effective Docker Container Management',
      text: 'What are some best practices for managing Docker containers in production?',
      tagIds: getRandomSubset(allTagIds, 3),
      askedBy: 'DevOpsDale',
      askDate: new Date('2021-05-22T15:30:00'),
      ansIds: getRandomSubset(allAnswerIds, 4),
      views: 75,
    },
    {

      title: 'Understanding Async/Await in JavaScript',
      text: 'Can someone explain how async/await works in JavaScript?',
      tagIds: getRandomSubset(allTagIds, 5),
      askedBy: 'CodeMaster',
      askDate: new Date('2021-03-15T10:00:00'),
      ansIds: getRandomSubset(allAnswerIds, 7),
      views: 150,
    },
    {

      title: 'Best Practices for RESTful API Design',
      text: 'What are some key principles for designing a scalable RESTful API?',
      tagIds: getRandomSubset(allTagIds, 4),
      askedBy: 'APIDesigner',
      askDate: new Date('2021-06-07T09:20:00'),
      ansIds: getRandomSubset(allAnswerIds, 5),
      views: 88,
    },
{

    title: 'Managing State in Vue.js',
    text: 'How to effectively manage state in a large Vue.js application?',
    tagIds: getRandomSubset(allTagIds, 3),
    askedBy: 'VueVixen',
    askDate: new Date('2021-08-15T14:35:00'),
    ansIds: getRandomSubset(allAnswerIds, 5),
    views: 47,
  },
  {
   
    title: 'Understanding Python Decorators',
    text: 'Can someone explain how decorators work in Python?',
    tagIds: getRandomSubset(allTagIds, 4),
    askedBy: 'Pythonista',
    askDate: new Date('2021-09-21T11:45:00'),
    ansIds: getRandomSubset(allAnswerIds, 4),
    views: 132,
  },
  {

    title: 'CSS Grid vs. Flexbox',
    text: 'When should I use CSS Grid and when should I use Flexbox?',
    tagIds: getRandomSubset(allTagIds, 5),
    askedBy: 'DesignGuru',
    askDate: new Date('2021-10-05T08:30:00'),
    ansIds: getRandomSubset(allAnswerIds, 6),
    views: 109,
  },
  {

    title: 'Securing Node.js Applications',
    text: 'What are the best practices for securing a Node.js application?',
    tagIds: getRandomSubset(allTagIds, 3),
    askedBy: 'NodeNinja',
    askDate: new Date('2021-11-12T13:50:00'),
    ansIds: getRandomSubset(allAnswerIds, 7),
    views: 95,
  },
  {
    
    title: 'Effective Error Handling in Java',
    text: 'What are some best practices for error handling in Java applications?',
    tagIds: getRandomSubset(allTagIds, 4),
    askedBy: 'JavaJungle',
    askDate: new Date('2021-12-22T10:20:00'),
    ansIds: getRandomSubset(allAnswerIds, 3),
    views: 63,
  },
{
    
    title: 'Using Hooks in React',
    text: 'How do hooks improve state management in React components?',
    tagIds: getRandomSubset(allTagIds, 4),
    askedBy: 'ReactRookie',
    askDate: new Date('2022-01-15T17:30:00'),
    ansIds: getRandomSubset(allAnswerIds, 5),
    views: 110,
  },
  {

    title: 'Scalability in Microservices Architecture',
    text: 'How do I ensure scalability when designing a microservices architecture?',
    tagIds: getRandomSubset(allTagIds, 3),
    askedBy: 'ArchitectAva',
    askDate: new Date('2022-02-03T14:45:00'),
    ansIds: getRandomSubset(allAnswerIds, 6),
    views: 78,
  },
  {

    title: 'Machine Learning Model Optimization',
    text: 'What are key strategies for optimizing machine learning models for production?',
    tagIds: getRandomSubset(allTagIds, 5),
    askedBy: 'MLMaven',
    askDate: new Date('2022-03-10T12:55:00'),
    ansIds: getRandomSubset(allAnswerIds, 4),
    views: 92,
  },
  {
  
    title: 'Automated Testing in Python',
    text: 'What frameworks are best for automated testing in Python?',
    tagIds: getRandomSubset(allTagIds, 4),
    askedBy: 'PythonPro',
    askDate: new Date('2022-04-21T09:05:00'),
    ansIds: getRandomSubset(allAnswerIds, 5),
    views: 105,
  },
  {

    title: 'Kotlin Coroutines vs Threads',
    text: 'What are the advantages of using Kotlin coroutines over traditional threads?',
    tagIds: getRandomSubset(allTagIds, 3),
    askedBy: 'KotlinKing',
    askDate: new Date('2022-05-07T16:40:00'),
    ansIds: getRandomSubset(allAnswerIds, 6),
    views: 84,
  },
{

    title: 'Best NoSQL Database for Web Apps',
    text: 'Which NoSQL database is most suitable for web applications and why?',
    tagIds: getRandomSubset(allTagIds, 4),
    askedBy: 'WebWizard',
    askDate: new Date('2022-06-12T11:10:00'),
    ansIds: getRandomSubset(allAnswerIds, 5),
    views: 98,
  },
  {

    title: 'Implementing OAuth in Express.js',
    text: 'How to implement OAuth authentication in an Express.js application?',
    tagIds: getRandomSubset(allTagIds, 3),
    askedBy: 'NodeNovice',
    askDate: new Date('2022-07-19T13:50:00'),
    ansIds: getRandomSubset(allAnswerIds, 6),
    views: 76,
  },
  {

    title: 'Responsive Design in CSS',
    text: 'What are the key principles for creating responsive designs in CSS?',
    tagIds: getRandomSubset(allTagIds, 5),
    askedBy: 'DesignDiva',
    askDate: new Date('2022-08-23T15:20:00'),
    ansIds: getRandomSubset(allAnswerIds, 4),
    views: 102,
  }

  ],
answers : [
    {
        text: 'React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.',
        ansBy: 'hamkalo',
        ansDate: new Date('March 02, 2022 15:30:00'),
      },
      {
        text: 'On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.',
        ansBy: 'azad',
        ansDate: new Date('January 31, 2022 15:30:00'),
      },
      {
        text: 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.',
        ansBy: 'abaya',
        ansDate: new Date('April 21, 2022 15:25:22'),
      },
      {
        text: 'YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);',
        ansBy: 'alia',
        ansDate: new Date('December 02, 2022 02:20:59'),
      },
      {
        text: 'I just found all the above examples just too confusing, so I wrote my own. ',
        ansBy: 'sana',
        ansDate: new Date('December 31, 2022 20:20:59'),
      },
    {
      text: 'React Router can be used for programmatic navigation by using the useHistory hook in functional components to access the history instance.',
      ansBy: 'DevJoe',
      ansDate: new Date('2020-12-18T10:30:00'),
    },
    {
      text: 'For class components, you can access the history object via this.props.history provided by the withRouter higher-order component.',
      ansBy: 'ReactExpert',
      ansDate: new Date('2020-12-19T09:20:00'),
    },
    {
      text: 'Shared Preferences are best used for storing small amounts of data. Remember to call apply() instead of commit() for asynchronous saving.',
      ansBy: 'AndroidDev',
      ansDate: new Date('2022-01-02T11:15:00'),
    },
    {
      text: 'For larger data storage in Android, consider using a database like Room or SQLite. Shared Preferences are not suitable for complex data.',
      ansBy: 'MobileGuru',
      ansDate: new Date('2022-01-03T13:30:00'),
    },
    {
      text: 'In Docker, use container orchestration tools like Kubernetes or Docker Swarm for effective management and scaling of containers in production.',
      ansBy: 'DockerFan',
      ansDate: new Date('2021-05-23T16:45:00'),
    },
    {
      text: 'Ensure to set resource limits for your Docker containers to avoid one container using all the host machine’s resources, which can affect other containers.',
      ansBy: 'DevOpsPro',
      ansDate: new Date('2021-05-24T14:50:00'),
    },
    {
      text: 'Async/Await in JavaScript simplifies working with asynchronous operations. They allow you to write async code in a more synchronous fashion.',
      ansBy: 'JSTechie',
      ansDate: new Date('2021-03-16T10:05:00'),
    },
    {
      text: 'Remember that async functions return a promise, and the await keyword can only be used inside async functions to wait for the promise resolution.',
      ansBy: 'AsyncAwaitFan',
      ansDate: new Date('2021-03-17T09:40:00'),
    },
    {
      text: 'For RESTful API design, focus on using the correct HTTP methods (GET, POST, PUT, DELETE) and status codes (200, 404, 500) for clarity and consistency.',
      ansBy: 'APIDesigner',
      ansDate: new Date('2021-06-08T10:20:00'),
    },
    {
      text: 'Ensure your API is stateless, meaning it doesn’t store any state between requests. This makes it scalable and simplifies the server design.',
      ansBy: 'RestfulMaster',
      ansDate: new Date('2021-06-09T11:30:00'),
    },
   
{
 
    text: 'Vue.js state management can be effectively handled using Vuex, which provides a centralized store for all your components.',
    ansBy: 'VueEnthusiast',
    ansDate: new Date('2021-08-16T12:40:00'),
  },
  {

    text: 'For smaller applications, Vue’s built-in reactivity system combined with props and events can be sufficient for state management.',
    ansBy: 'FrontEndDev',
    ansDate: new Date('2021-08-17T15:25:00'),
  },
  {

    text: 'Python decorators are a powerful tool that allows you to modify the behavior of a function or class. They are essentially functions that take another function as an argument and extend its functionality.',
    ansBy: 'PythonGuru',
    ansDate: new Date('2021-09-22T10:10:00'),
  },
  {

    text: 'Decorators are a great example of Python’s first-class function capabilities and are used extensively in frameworks like Flask and Django.',
    ansBy: 'WebDeveloper',
    ansDate: new Date('2021-09-23T11:20:00'),
  },
  {

    text: 'CSS Grid is ideal for two-dimensional layouts where control over both rows and columns is required, whereas Flexbox is designed for one-dimensional layouts, either in a row or a column.',
    ansBy: 'CSSExpert',
    ansDate: new Date('2021-10-06T09:30:00'),
  },
  {
   
    text: 'Grid is a newer technology and gives more layout power and flexibility, making it easier to align items and create complex layouts with less code compared to Flexbox.',
    ansBy: 'FrontendPro',
    ansDate: new Date('2021-10-07T08:45:00'),
  },
  {
    
    text: 'Node.js applications can be secured by validating and sanitizing user input, implementing proper authentication and authorization, and using HTTPS.',
    ansBy: 'NodeAficionado',
    ansDate: new Date('2021-11-13T14:10:00'),
  },
  {
   
    text: 'Always keep your Node.js and its dependencies up to date to ensure that known vulnerabilities are patched.',
    ansBy: 'SecurityExpert',
    ansDate: new Date('2021-11-14T16:20:00'),
  },
  {

    text: 'In Java, effective error handling includes using try-catch blocks wisely, not catching or throwing RuntimeExceptions unnecessarily, and creating custom exceptions for clearer error reporting.',
    ansBy: 'JavaMaster',
    ansDate: new Date('2021-12-23T10:05:00'),
  },
  {

    text: 'Use Java’s multi-catch feature to handle multiple exception types in a single catch block, which can make your code cleaner and more readable.',
    ansBy: 'CodeOptimist',
    ansDate: new Date('2021-12-24T11:15:00'),
  },
  // Continuing from the previous answers...
{
    aid: 'a21',
    text: 'React hooks simplify state management in functional components. They allow you to use state and other React features without writing a class.',
    ansBy: 'ReactWizard',
    ansDate: new Date('2022-01-16T17:45:00'),
  },
  {
    text: 'Hooks like useState and useEffect can help manage and synchronize state and side effects in a more readable and organized manner.',
    ansBy: 'HookFan',
    ansDate: new Date('2022-01-17T18:30:00'),
  },
  {
    text: 'Microservices should be designed with loose coupling and high cohesion. Use APIs for inter-service communication to maintain independence.',
    ansBy: 'MicroserviceAdvocate',
    ansDate: new Date('2022-02-04T12:55:00'),
  },
  {
    text: 'Ensure each microservice is scalable independently. Containerization tools like Docker and orchestration tools like Kubernetes are beneficial in this regard.',
    ansBy: 'CloudEngineer',
    ansDate: new Date('2022-02-05T14:20:00'),
  },
  {
    text: 'Optimizing machine learning models involves selecting the right algorithm, tuning hyperparameters, and using techniques like feature selection and dimensionality reduction.',
    ansBy: 'DataScientist',
    ansDate: new Date('2022-03-11T13:40:00'),
  },
  {
    text: 'Regularly evaluate and update your machine learning models to ensure they adapt to new data and maintain their accuracy and efficiency.',
    ansBy: 'MLExpert',
    ansDate: new Date('2022-03-12T15:30:00'),
  },
  {
    text: 'For automated testing in Python, frameworks like PyTest and Unittest are widely used. PyTest is popular for its simplicity and ease of use.',
    ansBy: 'TestGuru',
    ansDate: new Date('2022-04-22T10:15:00'),
  },
  {
    text: 'Selenium with Python can be used for automated browser testing, which is essential for testing web applications.',
    ansBy: 'QAEngineer',
    ansDate: new Date('2022-04-23T12:20:00'),
  },
  {
    text: 'Kotlin coroutines provide a way to write asynchronous code in a sequential manner. They are lightweight and don’t block the main thread.',
    ansBy: 'KotlinDeveloper',
    ansDate: new Date('2022-05-08T17:10:00'),
  },
  {
    text: 'Coroutines are more efficient than threads for concurrency in Kotlin, especially for I/O operations and network calls.',
    ansBy: 'ConcurrencyExpert',
    ansDate: new Date('2022-05-09T18:25:00'),
  },
{
    text: 'NoSQL databases like MongoDB and Couchbase are great for web applications due to their scalability and flexibility in handling unstructured data.',
    ansBy: 'NoSQLNinja',
    ansDate: new Date('2022-06-13T11:20:00'),
  },
  {
    text: 'Consider your data structure and query requirements when choosing a NoSQL database. Document stores like MongoDB are often a good fit for web apps.',
    ansBy: 'WebDevGuru',
    ansDate: new Date('2022-06-14T12:35:00'),
  },
  {
    text: 'For OAuth implementation in Express.js, you can use libraries like Passport.js which offer various strategies including OAuth.',
    ansBy: 'NodeExpert',
    ansDate: new Date('2022-07-20T14:50:00'),
  },
  {
    text: 'Ensure your Express.js app\'s OAuth flow securely handles tokens and user data, and consider using HTTPS to encrypt data in transit.',
    ansBy: 'SecurityAce',
    ansDate: new Date('2022-07-21T15:15:00'),
  },
  {
    text: 'Responsive web design in CSS can be achieved using media queries, flexible grid layouts, and flexible images to create a seamless experience on all devices.',
    ansBy: 'FrontendFinesse',
    ansDate: new Date('2022-08-24T16:05:00'),
  },
  {
    text: 'Use relative units like percentages and viewport units in CSS for responsive designs, and avoid fixed sizes to ensure content scales properly on different screens.',
    ansBy: 'DesignDynamo',
    ansDate: new Date('2022-08-25T17:10:00'),
  },
  {
    
    text: 'To optimize a React application, focus on minimizing component re-renders, optimizing state management, and leveraging code splitting.',
    ansBy: 'ReactRocker',
    ansDate: new Date('2022-09-18T19:20:00'),
  },
  {
    
    text: 'Use React Developer Tools to profile your application’s performance and identify components that cause unnecessary re-renders.',
    ansBy: 'DevToolDude',
    ansDate: new Date('2022-09-19T20:30:00'),
  },
  {
    
    text: 'JWTs secure APIs by allowing stateless authentication. The token contains encoded JSON data, including user details and permissions.',
    ansBy: 'APISecurityWiz',
    ansDate: new Date('2022-10-13T11:05:00'),
  },
  {
    text: 'When using JWTs for API security, implement robust token validation on the server and consider token expiration for added security.',
    ansBy: 'WebSecPro',
    ansDate: new Date('2022-10-14T12:15:00'),
  },
  {
    text: 'Using stateful sets in Kubernetes can provide more predictability and scalability for stateful applications compared to deployments.',
    ansBy: 'KubeMaster',
    ansDate: new Date('2022-11-01T09:30:00'),
  },
  {
    text: 'When working with microservices, it’s crucial to implement a robust logging system like ELK (Elasticsearch, Logstash, Kibana) for monitoring and debugging.',
    ansBy: 'DevOpsGuru',
    ansDate: new Date('2022-11-02T10:40:00'),
  },
  {
    text: 'Understanding the SOLID principles is key to writing maintainable and scalable object-oriented code in Java.',
    ansBy: 'JavaArchitect',
    ansDate: new Date('2022-11-03T11:15:00'),
  },
  {
    text: 'GraphQL provides a more efficient way to fetch data with its query language, reducing over-fetching compared to traditional REST APIs.',
    ansBy: 'GraphQLAdvocate',
    ansDate: new Date('2022-11-04T12:20:00'),
  },
  {
    text: 'For real-time applications in JavaScript, consider using WebSockets or libraries like Socket.io for two-way communication between client and server.',
    ansBy: 'RealtimeDev',
    ansDate: new Date('2022-11-05T13:30:00'),
  }
],
tags : [
    { name: 'react'},
    { name: 'javascript'},
    { name: 'android-studio'},
    { name: 'shared-preferences'},
    { name: 'node.js' },
    { name: 'python' },
    { name: 'java' },
    { name: 'docker' },
    { name: 'kubernetes' },
    { name: 'vue.js' },
    { name: 'angular' },
    { name: 'css' },
    { name: 'html' },
    { name: 'mongodb' },
    { name: 'sql' },
    { name: 'nosql' },
    { name: 'express.js' },
    { name: 'typescript' },
    { name: 'flutter' },
    { name: 'swift' },
    { name: 'kotlin' },
    { name: 'csharp' },
    { name: 'asp.net' },
    { name: 'ruby' },
    { name: 'rails' },
    { name: 'php' },
    { name: 'laravel' },
    { name: 'go' },
    { name: 'rust' },
    { name: 'c++' },
    { name: 'c' },
    { name: 'matlab' },
    { name: 'r' },
    { name: 'machine-learning' },
    { name: 'data-science' },
    { name: 'ai' },
    { name: 'cloud-computing' },
    { name: 'aws' },
    { name: 'azure' },
    { name: 'google-cloud' },
    { name: 'devops' },
    { name: 'git' },
    { name: 'github' },
    { name: 'gitlab' },
    { name: 'agile' },
    { name: 'scrum' },
    { name: 'web-development' },
    { name: 'mobile-development' },
    { name: 'software-engineering' },
    { name: 'networking' },
    { name: 'security' },
    { name: 'blockchain' }
  ]

  };
  
  module.exports = data;
  