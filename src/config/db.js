const mongoose = require('mongoose');

// MongoDB URI (You can store the URI in .env file for security)
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmaster';

// Connect to the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,     // Use new URL parser for MongoDB
            useUnifiedTopology: true, // Use the new server discovery and monitoring engine
            useCreateIndex: true,     // Enable index creation for schema fields (optional for newer versions of Mongoose)
            useFindAndModify: false   // Disable legacy findAndModify functionality
        });

        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit the process with a failure code
    }
};

module.exports = connectDB;
