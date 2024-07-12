# Book Search App

A brief description of what this application does.

# Features

## Login

## Search Books

## Add New Books

## CLI Commands

Install dependencies

```
npm install
```
Run app locally at http://localhost:3000

```
npm start
```

Run unit tests

```
npm run test
```

To run single unit test case (Jest is used for unit and integration testing.)

```
npm run test -t "test file name"
```

Run integration tests (Cypress is used for end-to-end testing.)

```
npm run test:cypress
```

Run cypress integration test in headless mode

```
npm run test:cypress-run
```

## Prerequisites

- Node - [Downloads](https://nodejs.org/en/download/)

## Setup the Database

- Make sure you have a MySQL database running and accessible with the credentials provided in the .env file. Create the database if it doesn't exist
- Connect to Your Database:
 Use a database client tool (e.g., MySQL Workbench, pgAdmin for PostgreSQL) or command-line interface (e.g., MySQL command-line tool, psql for PostgreSQL) to connect to your database.

```
CREATE DATABASE your_database_name;
```

- use the below query to create table books ( From this table , you can search and add books):

```

CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `authors` varchar(255) DEFAULT NULL,
  `description` text,
  `published_date` date DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT '1',
  `isbn` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

```

- use the below query to create table users ( users who can access to your application are saved and fetched from this table using jwt authorization and authentication):

```
-- book_search_db.users definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
)

```

## Setting up Local Environment

- Copy a copy of the .env file from `.env.sample` and save to `.env` 
- You will need to update your .env value according to your database credentials
