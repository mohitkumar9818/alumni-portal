// Simple script to run seeding from root directory
const { execSync } = require('child_process');
const path = require('path');

console.log('========================================');
console.log('Seeding All Database Data');
console.log('========================================\n');

try {
    console.log('Step 1: Seeding Users, Events, and Jobs...\n');
    execSync('node backend/scripts/seed.js', {
        stdio: 'inherit',
        cwd: __dirname
    });

    console.log('\nStep 2: Seeding Leaderboard Data...\n');
    execSync('node backend/scripts/seedLeaderboard.js', {
        stdio: 'inherit',
        cwd: __dirname
    });

    console.log('\n========================================');
    console.log('All data seeded successfully!');
    console.log('========================================\n');
    console.log('You can now:');
    console.log('- View leaderboard at: http://localhost:5174/leaderboard');
    console.log('- View dashboard at: http://localhost:5174/\n');
} catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
}
