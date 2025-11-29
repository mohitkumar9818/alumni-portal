require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Job = require('../models/Job');
const Event = require('../models/Event');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Job.deleteMany({});
        await Event.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
            gradYear: 2015,
            company: 'Alumni Association',
            location: 'San Francisco'
        });
        console.log('Created admin user');

        // Create mentor users
        const mentors = await User.create([
            {
                name: 'Sarah Chen',
                email: 'sarah@example.com',
                password: 'password123',
                gradYear: 2015,
                company: 'Google',
                industry: 'Technology',
                location: 'Mountain View, CA',
                skills: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'],
                interests: ['AI', 'Research', 'Education'],
                optInMentor: true,
                bio: 'ML Engineer at Google with 8 years of experience in AI/ML'
            },
            {
                name: 'Michael Rodriguez',
                email: 'michael@example.com',
                password: 'password123',
                gradYear: 2017,
                company: 'Meta',
                industry: 'Technology',
                location: 'Menlo Park, CA',
                skills: ['React', 'JavaScript', 'Node.js', 'GraphQL'],
                interests: ['Web Development', 'Startups', 'Open Source'],
                optInMentor: true,
                bio: 'Senior Frontend Engineer passionate about building great user experiences'
            },
            {
                name: 'Emily Watson',
                email: 'emily@example.com',
                password: 'password123',
                gradYear: 2018,
                company: 'Amazon',
                industry: 'Technology',
                location: 'Seattle, WA',
                skills: ['Java', 'AWS', 'Microservices', 'Kubernetes'],
                interests: ['Cloud Computing', 'DevOps', 'Scalability'],
                optInMentor: true,
                bio: 'Cloud architect helping companies scale their infrastructure'
            },
            {
                name: 'David Kim',
                email: 'david@example.com',
                password: 'password123',
                gradYear: 2016,
                company: 'Stripe',
                industry: 'Fintech',
                location: 'San Francisco, CA',
                skills: ['Python', 'Ruby', 'API Design', 'Payment Systems'],
                interests: ['Fintech', 'APIs', 'Developer Tools'],
                optInMentor: true,
                bio: 'Backend engineer specializing in payment infrastructure'
            },
            {
                name: 'Lisa Park',
                email: 'lisa@example.com',
                password: 'password123',
                gradYear: 2019,
                company: 'Tesla',
                industry: 'Automotive',
                location: 'Palo Alto, CA',
                skills: ['C++', 'Python', 'Computer Vision', 'Robotics'],
                interests: ['Autonomous Vehicles', 'AI', 'Robotics'],
                optInMentor: true,
                bio: 'Working on autonomous driving technology at Tesla'
            }
        ]);
        console.log('Created mentor users');

        // Create regular users
        const users = await User.create([
            {
                name: 'Alice Johnson',
                email: 'alice@example.com',
                password: 'password123',
                gradYear: 2020,
                company: 'Startup Inc',
                location: 'San Francisco, CA',
                skills: ['Python', 'Machine Learning', 'React'],
                interests: ['AI', 'Startups', 'Education']
            },
            {
                name: 'Bob Smith',
                email: 'bob@example.com',
                password: 'password123',
                gradYear: 2021,
                company: 'TechCorp',
                location: 'New York, NY',
                skills: ['JavaScript', 'Node.js', 'MongoDB'],
                interests: ['Web Development', 'Databases']
            }
        ]);
        console.log('Created regular users');

        // Create jobs
        const jobs = await Job.create([
            {
                title: 'Senior Machine Learning Engineer',
                company: 'OpenAI',
                description: 'Join our team building cutting-edge AI systems. We are looking for experienced ML engineers passionate about advancing AI capabilities.',
                location: 'San Francisco, CA',
                type: 'Full-time',
                tags: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'NLP'],
                applyUrl: 'https://openai.com/careers',
                salary: '$180k-$250k',
                postedBy: admin._id
            },
            {
                title: 'Full Stack Developer',
                company: 'Airbnb',
                description: 'Build features that help millions of people find amazing places to stay. Work with React, Node.js, and modern web technologies.',
                location: 'Remote',
                type: 'Full-time',
                tags: ['React', 'Node.js', 'JavaScript', 'GraphQL', 'AWS'],
                applyUrl: 'https://airbnb.com/careers',
                salary: '$140k-$200k',
                postedBy: admin._id
            },
            {
                title: 'Data Science Intern',
                company: 'Netflix',
                description: 'Summer internship working on recommendation systems and data analysis. Great opportunity for students passionate about data science.',
                location: 'Los Gatos, CA',
                type: 'Internship',
                tags: ['Python', 'Data Science', 'Machine Learning', 'SQL'],
                applyUrl: 'https://netflix.com/careers',
                salary: '$8k/month',
                postedBy: admin._id
            },
            {
                title: 'DevOps Engineer',
                company: 'Spotify',
                description: 'Help us scale our infrastructure to serve millions of music lovers worldwide. Experience with Kubernetes and cloud platforms required.',
                location: 'Stockholm, Sweden',
                type: 'Full-time',
                tags: ['Kubernetes', 'AWS', 'Docker', 'Python', 'Terraform'],
                applyUrl: 'https://spotify.com/careers',
                salary: '€70k-€100k',
                postedBy: admin._id
            }
        ]);
        console.log('Created jobs');

        // Create events
        const events = await Event.create([
            {
                title: 'Alumni Networking Night 2025',
                description: 'Join us for an evening of networking, food, and drinks. Connect with fellow alumni and expand your professional network. Special guest speakers from leading tech companies.',
                startDate: new Date('2025-12-15T18:00:00Z'),
                endDate: new Date('2025-12-15T21:00:00Z'),
                location: 'San Francisco Marriott Marquis, 780 Mission St',
                capacity: 100,
                ticketPrice: 25,
                ticketUrl: 'https://eventbrite.com/alumni-networking',
                createdBy: admin._id
            },
            {
                title: 'Career Fair 2025',
                description: 'Annual career fair featuring top employers from tech, finance, and consulting. Bring your resume and dress professionally. Free for all alumni.',
                startDate: new Date('2025-11-20T10:00:00Z'),
                endDate: new Date('2025-11-20T16:00:00Z'),
                location: 'University Campus Center',
                capacity: 500,
                ticketPrice: 0,
                createdBy: admin._id
            },
            {
                title: 'AI & Machine Learning Workshop',
                description: 'Hands-on workshop covering the latest in AI and ML. Learn about transformers, LLMs, and practical applications. Laptops required.',
                startDate: new Date('2026-01-10T14:00:00Z'),
                endDate: new Date('2026-01-10T17:00:00Z'),
                location: 'Tech Hub, 123 Innovation Drive',
                capacity: 50,
                ticketPrice: 15,
                ticketUrl: 'https://eventbrite.com/ai-workshop',
                createdBy: admin._id
            }
        ]);
        console.log('Created events');

        console.log('\n=== Seed Data Summary ===');
        console.log(`Admin: admin@example.com / admin123`);
        console.log(`Mentors: ${mentors.length}`);
        console.log(`Users: ${users.length}`);
        console.log(`Jobs: ${jobs.length}`);
        console.log(`Events: ${events.length}`);
        console.log('\nTest accounts:');
        console.log('- sarah@example.com / password123 (Mentor)');
        console.log('- alice@example.com / password123 (User)');
        console.log('========================\n');

    } catch (error) {
        console.error('Seed error:', error);
    }
};

const run = async () => {
    await connectDB();
    await seedData();
    await mongoose.connection.close();
    console.log('Database seeding completed!');
    process.exit(0);
};

run();
