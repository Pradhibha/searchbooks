# Book Search App

A brief description of what this application does.

## Login

LoginPage component has the registration and login features . On successful login , the application will be redirect to SearchPage 

## Search Books

A user interface for a book search functionality. Here is a breakdown of the various elements:

**Search Fields:**

**Search by title:** A text input for entering the book title.
**Search by author:** A text input for entering the author’s name.
**Start date:** A date picker input for specifying the start date.
**End date:** A date picker input for specifying the end date.
**Genre:** A text input for entering the genre.

**Sort and Filter Options:**

**Sort By:** A dropdown menu to select sorting criteria (e.g., Title, Author, Date).
**Order:** A dropdown menu to select the order of sorting (Ascending or Descending).
**Page Size:** A text input to specify the number of results per page.
**Page:** A text input to specify the page number of the search results.
**In-stock only:** A checkbox to filter results to show only books that are in stock.

**Buttons:**

**SEARCH:** A button to initiate the search based on the specified criteria.
**RESET:** A button to reset all the search fields and filters to their default values.

This interface allows users to perform detailed searches for books by various criteria, sort the results, and paginate through the results. The "In-stock only" checkbox helps users filter for availability.

## Search Results Table

The result page of a book search functionality displays a table with the search results. Here's a breakdown of the elements and data shown in the table:

**Table Headers**

**ID:** The unique identifier for each book.
**Title:** The title of the book.
**Authors:** The authors of the book.
**Description:** A brief description of the book.
**Published Date:** The date when the book was published.
**Genre:** The genre of the book.
**ISBN:** The International Standard Book Number of the book.
**Availability:** The availability status of the book.

**Pagination and Rows per Page**

**Rows per page:** A dropdown menu to select the number of rows displayed per page. 
**Page Navigation:** Buttons to navigate between pages of results

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

- use the below query to create table users ( username and hash passwords are saved and fetched from this table using jwt authorization and authentication):

```

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
