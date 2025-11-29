const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected successfully!');
        return mongoose.connection.db.admin().listDatabases();
    })
    .then((result) => {
        console.log('Databases:', result.databases.map(db => db.name));
        return mongoose.disconnect();
    })
    .then(() => {
        console.log('✅ Test complete');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Error:', err.message);
        process.exit(1);
    });
