# Autstudy

A study platform for autism students social interaction improvement

## Features

### Authentication

- [ ] It should be able to authenticate using e-mail & password;
- [ ] It should be able to authenticate using Gmail;
- [ ] It should be able to recover password using e-mail;
- [ ] It should be able to create an account (e-mail, name and password);
- [ ] It should be able to create an account with Gmail;


### Rooms

- [ ] It should be able to create a new room;
- [ ] It should be able to send text messages (Q&A)
- [ ] It should be able to send audio messages (Q&A)
- [ ] It should be able to send images (Q&A)

### Invites

- [ ] It should be able to invite a new member (e-mail, role);
- [ ] It should be able to accept an invite;
- [ ] It should be able to delete an invite;
- [ ] It should be able to create an invite;
- [ ] It should be able to send an invite;


### Permissions table

| Action              | Teacher | Student |
| ------------------- | ------- | ------- |
| Update room         | ✅      | ❌      |
| Delete room         | ✅      | ❌      |
| Invite a student    | ✅      | ❌      |
| List students       | ✅      | ✅      |
| Remove student      | ✅      | ❌      |
| Create a new room   | ✅      | ❌      |
| Join in a room      | ✅      | ✅      |
| Send a question     | ✅      | ✅      |

> ✅ = allowed
> ❌ = not allowed

### Running Guide (Developlement Environment)

#### 🐋 Docker Container (PostgreSQL)
```
cd server
docker compose up -d
```

#### 🗄️ Server (NodeJs API)
```
cd server
npm install 
npm run dev
```
##### Open Prisma Studio
GUI to view and edit data in database
```
cd server
npm run studio
```

##### Prisma Migration
```
cd server
npm run migrate
```

#### 📱 Mobile (React Native)
```
cd mobile
npm install 
npm run start
```