const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('Server will continue running without database connection.');
        console.log('Some features may not work properly.');
        // Don't exit - allow server to run for testing
    }
};

module.exports = connectDB;
