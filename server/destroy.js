const mongoose = require('mongoose');

async function dropDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/fake_so', { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("Connected to MongoDB");

    // Drop the database
    await mongoose.connection.db.dropDatabase();

    console.log("Database dropped successfully");
  } catch (error) {
    console.error("Error dropping database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

// Call the function
dropDatabase();
