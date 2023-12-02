// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
mongoose.connect('mongodb://127.0.0.1:27017/fake_so', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use((req, res) => {
    res.status(404).send('Sorry, that route does not exist.');
  });


const server  = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const gracefulShutdown = () => {
  server.close(() => {
    console.log('Server closed. Shutting down database connection...');
    mongoose.connection.close().then(() => {
      console.log('Database instance disconnected');
      process.exit(0);
    }).catch((err) => {
      console.error('Error during database disconnection:', err);
      process.exit(1);
    });
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);