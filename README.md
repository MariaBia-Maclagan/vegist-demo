# Vegist 

## Project Description 

**Vegist** is a simple vegan recipe search engine app that fetches data from spoonacular food API.

This is a full-stack MVP project that was build using React, Node.js, Express, and MySQL.

![Vegist](images/Vegist_main.png)

![Vegist Search](images/Vegist_search.png)

![Vegist Favorites](images/Vegist_favorites.png)

## Project Setup 

### Dependencies

- Run `yarn` in the project folder to install dependencies related to Express.

- `cd client` and run `yarn` install dependencies related to React.

### Database

- Create `.env` file in project directory and add:

```
DB_NAME=vegist
DB_PASS=YOUR_PASSWORD
```
- Type `mysql -u root -p` to access the MySQL CLI using your password.

- In the MySQL CLI, type `create database vegist;` to create a database in MySQL.

- in the MySQL CLI, type `create table favorites (id int not null auto_increment, title varchar(255), source_url varchar(255), primary key (id));` to create a table favorites, and add the columns.

### Development Servers

- Run `yarn start` in project directory to start the Express server on port 5000
- `cd client` and run `yarn start` to start client server in development mode with hot reloading in port 3000.
- Test client with: `http://localhost:3000`
- Test API with: `http://localhost:5000/api`
  
## Database Schema  

![DB Schema](images/db_schema.png)

## API Routes Design

![API Routes](images/API_routes.png)

## Resources

API: https://spoonacular.com/food-api

## Notes

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._

