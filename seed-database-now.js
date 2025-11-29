const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('./backend/models/User');
const Job = require('./backend/models/Job');
const Event = require('./backend/models/Event');
const LeaderboardEntry = require('./backend/models/LeaderboardEntry');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Job.deleteMany({});
        await Event.deleteMany({});
        await LeaderboardEntry.deleteMany({});

        // Create users
        console.log('👥 Creating users...');
        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = await User.create([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                gradYear: 2020,
                company: 'Google',
                location: 'San Francisco, CA',
                skills: ['JavaScript', 'React', 'Node.js'],
                interests: ['Web Development', 'AI'],
                optInMentor: true,
                bio: 'Software Engineer at Google, passionate about web technologies.',
                linkedIn: 'https://linkedin.com/in/johndoe'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword,
                gradYear: 2019,
                company: 'Microsoft',
                location: 'Seattle, WA',
                skills: ['Python', 'Machine Learning', 'Data Science'],
                interests: ['AI', 'Research'],
                optInMentor: true,
                bio: 'ML Engineer at Microsoft, love teaching and mentoring.',
                linkedIn: 'https://linkedin.com/in/janesmith'
            },
            {
                name: 'Bob Johnson',
                email: 'bob@example.com',
                password: hashedPassword,
                gradYear: 2021,
                company: 'Amazon',
                location: 'Austin, TX',
                skills: ['Java', 'AWS', 'DevOps'],
                interests: ['Cloud Computing', 'Startups'],
                optInMentor: true
            },
            {
                name: 'Alice Williams',
                email: 'alice@example.com',
                password: hashedPassword,
                gradYear: 2022,
                company: 'Meta',
                location: 'Menlo Park, CA',
                skills: ['React', 'TypeScript', 'GraphQL'],
                interests: ['Frontend', 'UX Design'],
                optInMentor: false
            },
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
                gradYear: 2018,
                company: 'Alumni Association',
                location: 'New York, NY'
            }
        ]);

        console.log(`✅ Created ${users.length} users`);

        // Create events
        console.log('📅 Creating events...');
        const events = await Event.create([
            {
                title: 'Annual Alumni Reunion 2025',
                description: 'Join us for our annual reunion! Reconnect with old friends and make new connections.',
                startDate: new Date('2025-06-15'),
                endDate: new Date('2025-06-17'),
                location: 'University Campus',
                capacity: 200,
                ticketPrice: 50,
                createdBy: users[4]._id
            },
            {
                title: 'Tech Career Fair',
                description: 'Meet recruiters from top tech companies. Bring your resume!',
                startDate: new Date('2025-03-20'),
                endDate: new Date('2025-03-20'),
                location: 'Convention Center',
                capacity: 500,
                ticketPrice: 0,
                createdBy: users[4]._id
            },
            {
                title: 'Networking Mixer',
                description: 'Casual networking event with drinks and appetizers.',
                startDate: new Date('2025-02-10'),
                endDate: new Date('2025-02-10'),
                location: 'Downtown Bar & Grill',
                capacity: 100,
                ticketPrice: 25,
                createdBy: users[4]._id
            },
            {
                title: 'Alumni Mentorship Program Kickoff',
                description: 'Launch event for our new mentorship program. Meet potential mentors and mentees.',
                startDate: new Date('2025-01-25'),
                endDate: new Date('2025-01-25'),
                location: 'Virtual (Zoom)',
                capacity: 300,
                ticketPrice: 0,
                createdBy: users[4]._id
            },
            {
                title: 'Homecoming Weekend',
                description: 'Celebrate homecoming with football, food, and fun!',
                startDate: new Date('2025-10-05'),
                endDate: new Date('2025-10-07'),
                location: 'University Stadium',
                capacity: 1000,
                ticketPrice: 75,
                createdBy: users[4]._id
            }
        ]);

        console.log(`✅ Created ${events.length} events`);

        // Create jobs
        console.log('💼 Creating jobs...');
        const jobs = await Job.create([
            {
                title: 'Senior Software Engineer',
                company: 'Google',
                description: 'Join our team building next-generation cloud infrastructure.',
                location: 'Mountain View, CA',
                type: 'Full-time',
                tags: ['JavaScript', 'Python', 'Cloud'],
                applyUrl: 'https://careers.google.com',
                salary: '$150k - $200k',
                postedBy: users[0]._id
            },
            {
                title: 'Machine Learning Engineer',
                company: 'Microsoft',
                description: 'Work on cutting-edge AI and ML projects.',
                location: 'Redmond, WA',
                type: 'Full-time',
                tags: ['Python', 'TensorFlow', 'ML'],
                applyUrl: 'https://careers.microsoft.com',
                salary: '$140k - $190k',
                postedBy: users[1]._id
            },
            {
                title: 'DevOps Engineer',
                company: 'Amazon',
                description: 'Build and maintain AWS infrastructure at scale.',
                location: 'Seattle, WA',
                type: 'Full-time',
                tags: ['AWS', 'Docker', 'Kubernetes'],
                applyUrl: 'https://amazon.jobs',
                salary: '$130k - $180k',
                postedBy: users[2]._id
            },
            {
                title: 'Frontend Developer',
                company: 'Meta',
                description: 'Create amazing user experiences for billions of users.',
                location: 'Menlo Park, CA',
                type: 'Full-time',
                tags: ['React', 'TypeScript', 'CSS'],
                applyUrl: 'https://metacareers.com',
                salary: '$135k - $185k',
                postedBy: users[3]._id
            },
            {
                title: 'Software Engineering Intern',
                company: 'Apple',
                description: 'Summer internship program for talented students.',
                location: 'Cupertino, CA',
                type: 'Internship',
                tags: ['Swift', 'iOS', 'Mobile'],
                applyUrl: 'https://apple.com/careers',
                salary: '$8k/month',
                postedBy: users[4]._id
            },
            {
                title: 'Data Scientist',
                company: 'Netflix',
                description: 'Use data to improve content recommendations.',
                location: 'Los Gatos, CA',
                type: 'Full-time',
                tags: ['Python', 'SQL', 'Statistics'],
                applyUrl: 'https://jobs.netflix.com',
                salary: '$145k - $195k',
                postedBy: users[4]._id
            },
            {
                title: 'Product Manager',
                company: 'Stripe',
                description: 'Lead product development for payment solutions.',
                location: 'San Francisco, CA',
                type: 'Full-time',
                tags: ['Product', 'Strategy', 'Fintech'],
                applyUrl: 'https://stripe.com/jobs',
                salary: '$160k - $210k',
                postedBy: users[4]._id
            },
            {
                title: 'UX Designer',
                company: 'Airbnb',
                description: 'Design beautiful and intuitive user experiences.',
                location: 'Remote',
                type: 'Full-time',
                tags: ['Figma', 'Design', 'UX'],
                applyUrl: 'https://careers.airbnb.com',
                salary: '$120k - $170k',
                postedBy: users[4]._id
            }
        ]);

        console.log(`✅ Created ${jobs.length} jobs`);

        // Create leaderboard entries
        console.log('🏆 Creating leaderboard entries...');
        const leaderboardEntries = [];

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const entry = {
                userId: user._id,
                scores: {
                    events: Math.floor(Math.random() * 20) + 5,
                    mentorship: user.optInMentor ? Math.floor(Math.random() * 15) + 5 : 0,
                    donations: Math.floor(Math.random() * 30) + 10,
                    engagement: Math.floor(Math.random() * 25) + 10,
                    total: 0
                },
                badges: [],
                rank: 0,
                lastUpdated: new Date()
            };

            // Calculate total
            entry.scores.total = entry.scores.events + entry.scores.mentorship +
                entry.scores.donations + entry.scores.engagement;

            // Assign badges
            if (entry.scores.events >= 15) entry.badges.push('Event Champion');
            if (entry.scores.mentorship >= 10) entry.badges.push('Mentor Master');
            if (entry.scores.donations >= 25) entry.badges.push('Generous Donor');
            if (entry.scores.engagement >= 20) entry.badges.push('Community Leader');
            if (entry.scores.total >= 70) entry.badges.push('Top Contributor');

            leaderboardEntries.push(entry);
        }

        await LeaderboardEntry.create(leaderboardEntries);
        console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);

        console.log('');
        console.log('========================================');
        console.log('✅ DATABASE SEEDING COMPLETE!');
        console.log('========================================');
        console.log('');
        console.log('📊 Summary:');
        console.log(`   Users: ${users.length}`);
        console.log(`   Events: ${events.length}`);
        console.log(`   Jobs: ${jobs.length}`);
        console.log(`   Leaderboard Entries: ${leaderboardEntries.length}`);
        console.log('');
        console.log('🔐 Test Login Credentials:');
        console.log('   Email: john@example.com');
        console.log('   Password: password123');
        console.log('');
        console.log('   Admin Email: admin@example.com');
        console.log('   Admin Password: password123');
        console.log('');
        console.log('✅ You can now refresh your browser!');
        console.log('');

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
