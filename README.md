# BOOK SEARCH APP

A brief description of what this application does.

## Login

LoginPage component has the registration and login features . The login page is used to authenticate users and grant them access to a protected area of a website or application. Users must provide valid credentials (username and password) to proceed.The authentication and authorization is done using jwt and hashpasswords are saved

**Elements of the Login Page:**

**Username Field:** A text input field where users are required to enter their username.<br />
**Password Field:** A password input field where users are required to enter their password. The characters typed in this field are typically masked to prevent onlookers from seeing the password.<br />
**Login Button:** A button that users click to submit their username and password for authentication.<br />
**Register Link:** A link for users who do not have an account. The "DON'T HAVE AN ACCOUNT? REGISTER" link is for users who need to create a new account. This feature ensures that only registered users can access the protected resources of the application. <br />

## Search Books

A user interface for a book search functionality. Here is a breakdown of the various elements:<br />

**Search Fields:**<br />

**Search by title:** A text input for entering the book title.<br />
**Search by author:** A text input for entering the author’s name.<br />
**Start date:** A date picker input for specifying the start date.<br />
**End date:** A date picker input for specifying the end date.<br />
**Genre:** A text input for entering the genre.<br />

**Sort and Filter Options:**

**Sort By:** A dropdown menu to select sorting criteria (e.g., Title, Author, Date).<br />
**Order:** A dropdown menu to select the order of sorting (Ascending or Descending).<br />
**Page Size:** A text input to specify the number of results per page.<br />
**Page:** A text input to specify the page number of the search results.<br />
**In-stock only:** A checkbox to filter results to show only books that are in stock.<br />

**Buttons:**

**SEARCH:** A button to initiate the search based on the specified criteria.<br />
**RESET:** A button to reset all the search fields and filters to their default values.<br />

This interface allows users to perform detailed searches for books by various criteria, sort the results, and paginate through the results. The "In-stock only" checkbox helps users filter for availability.

## Search Results Table

The result page of a book search functionality displays a table with the search results. Here's a breakdown of the elements and data shown in the table:<br />

**Table Headers**

**ID:** The unique identifier for each book.<br />
**Title:** The title of the book.<br />
**Authors:** The authors of the book.<br />
**Description:** A brief description of the book.<br />
**Published Date:** The date when the book was published.<br />
**Genre:** The genre of the book.<br />
**ISBN:** The International Standard Book Number of the book.<br />
**Availability:** The availability status of the book.<br />

**Pagination and Rows per Page**

**Rows per page:** A dropdown menu to select the number of rows displayed per page. <br />
**Page Navigation:** Buttons to navigate between pages of results<br />

## Add New Books<br />

The purpose of the add book functionality is to gather all necessary details about a book that needs to be added to a library or inventory system. Users are required to fill out the form with accurate information about the book and submit it to include the book in the system's database.

**Elements of the Add Book Form:**<br />

**Title Field:** A text input field where users enter the title of the book.<br />
**Authors Field:** A text input field where users enter the name(s) of the author(s) of the book.<br />
**Description Field:** A text input field where users provide a brief description or summary of the book.<br />
**Published Date Field:** A date input field where users enter the publication date of the book. The placeholder format dd/mm/yyyy indicates the expected date format.<br />
**Genre Field:** A text input field where users enter the genre of the book, such as fiction, non-fiction, mystery, etc.<br />
**Availability Checkbox:** A checkbox to indicate whether the book is currently available. If checked, the book is in stock.<br />
**ISBN Field:** A text input field where users enter the International Standard Book Number (ISBN) of the book, which is a unique identifier for books.<br />
**Submit Button:** A button that users click to submit the form and add the book to the system.<br />

## CLI Commands<br />

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
