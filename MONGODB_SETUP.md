# MongoDB Setup Guide for Windows

You have 2 options to run MongoDB:

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

This is the easiest option - no local installation needed!

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 Sandbox)
4. Click "Connect" on your cluster
5. Add your IP address to whitelist (or allow from anywhere: 0.0.0.0/0)
6. Create a database user with username and password
7. Choose "Connect your application"
8. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
9. Update `backend/.env` file:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni_portal?retryWrites=true&w=majority
   ```
10. Save and you're done!

## Option 2: Install MongoDB Locally

### Download and Install

1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer (.msi file)
4. Choose "Complete" installation
5. Install as a Windows Service (check the box)
6. Install MongoDB Compass (GUI tool) - optional but recommended

### Start MongoDB

MongoDB should start automatically as a Windows service. To verify:

```cmd
# Check if MongoDB service is running
sc query MongoDB

# Or start it manually
net start MongoDB
```

### Verify Installation

```cmd
# Connect to MongoDB
mongosh

# You should see MongoDB shell
# Type 'exit' to quit
```

### Connection String

If MongoDB is running locally, your connection string is:
```
mongodb://localhost:27017/alumni_portal
```

This is already set in `backend/.env` file.

## Troubleshooting

### MongoDB won't start
- Check Windows Services (services.msc)
- Look for "MongoDB Server" service
- Right-click and Start

### Can't connect
- Make sure MongoDB is running
- Check firewall settings
- Verify the connection string in backend/.env

### Port 27017 already in use
- Another MongoDB instance might be running
- Check Task Manager and end mongod.exe processes
- Restart MongoDB service

## Next Steps

Once MongoDB is set up:
1. Run `start-backend.bat` to start the backend server
2. Run `seed-database.bat` to populate test data
3. Run `start-ai-service.bat` to start AI service
4. Run `start-frontend.bat` to start the frontend
5. Open http://localhost:5173 in your browser
