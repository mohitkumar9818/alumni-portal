require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/directory', require('./routes/directory'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Root route
app.get('/', (_req, res) => {
    res.json({
        message: 'Alumni Portal API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/health',
            auth: '/api/auth',
            users: '/api/users',
            events: '/api/events',
            jobs: '/api/jobs',
            donations: '/api/donations',
            recommendations: '/api/recommendations',
            directory: '/api/directory',
            ai: '/api/ai',
            leaderboard: '/api/leaderboard'
        }
    });
});

// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
