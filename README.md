# Smart To Do List

## Project Setup

### Set Up the Database

1. Install psql and set up a user for your machine.
2. Run `psql` to enter the database
3. Run the below code to create a new user and database for the project

```sql
CREATE ROLE labber WITH LOGIN password 'labber';
CREATE DATABASE midterm OWNER labber;
```

### Set Up the Code

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
