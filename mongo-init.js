// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

db = db.getSiblingDB('pick-story');

// Create the application database user
db.createUser({
  user: 'pickstory_user',
  pwd: 'pickstory_password',
  roles: [
    {
      role: 'readWrite',
      db: 'pick-story'
    }
  ]
});

// Create collections with initial indexes
db.createCollection('stories');
db.createCollection('replies');
db.createCollection('userdailypicks');

// Create indexes for better performance
db.stories.createIndex({ "createdAt": -1 });
db.stories.createIndex({ "author": 1 });

db.replies.createIndex({ "storyId": 1 });
db.replies.createIndex({ "createdAt": -1 });

db.userdailypicks.createIndex({ "userId": 1, "pickDate": 1 }, { unique: true });
db.userdailypicks.createIndex({ "createdAt": -1 });

print('MongoDB initialization completed for pick-story database');
