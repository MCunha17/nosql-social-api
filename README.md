# NoSQL Social API

![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)

The displayed license badge is sourced from <a href="https://shields.io/category/license">Shields IO</a>.

## Description
An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The API uses MongoDB database for handling unstructured data, Express.js for routing, and Mongoose ODM.

Social network applications are prevalent in today's digital landscape. By learning how to build an API that enables users to share thoughts, react to friends' thoughts, and create friend lists, developing this application provided me with insights into the functionality required for developing similar applications.

![Screenshot of application](/public/assets/application-screenshot.jpg)

## Table of Contents
* [Site](#site)
* [Repository](#repository)
* [Features](#features)
* [Usage](#usage)
* [Technologies Used](#technologies-used)
* [Contributing](#contributing)
* [Tests](#tests)
* [License](#license)
* [Resources](#resources)
* [Questions](#questions)

## Site
You can view a video of the functionality using Insomnia here [here](https://drive.google.com/file/d/1NTddNbJELPA3zj0SpjmnzcTY9BrMNdtj/view?usp=sharing).

## Repository
You can access the application's repository [here](https://github.com/MCunha17/nosql-social-api).

## Features
* CRUD operations for users, thoughts, friends, and reactions: You can create, read, update, and delete users and thoughts. Friends can be added to and removed from a user's friend list. Reactions can be added to and removed from thoughts.
* Data validation: Mongoose schemas are used to validate data before it is stored in the database.
* Relationships: The MongoDB database includes relationships between users and thoughts. Each user can have multiple thoughts, and thoughts can belong to a user.
* Aggregation: Virtual properties on the Mongoose schemas are used to count the number of friends and thoughts for each user.

## Usage
This application provides an API backend for a social network. It is not a full-stack application, so there is no user interface. However, you can interact with the API using API client tools such as Postman or Insomnia.

To install and use the application, follow these steps:

1. Clone the repository
2. Run npm install in your terminal to install all needed packages
3. Start the server with npm start

## Technologies Used
* Node.js
* Express.js
* MongoDB
* Mongoose
* JavaScript

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request with your proposed contributions.

## License
This project is licensed under: MIT License.

## Tests
Currently, there are no tests implemented for this project. If you would like to contribute, please follow the [contributing guidelines](#contributing).

## Resources
Resources referenced to build this application include:
* [MongDB CRUD Operations](https://www.mongodb.com/docs/manual/crud/)
* [MonggoDB Data Model Design](https://www.mongodb.com/docs/manual/core/data-model-design/#std-label-data-modeling-embedding)
* [MongoDB One-to-Many Relationships](https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/)
* []
* [Mongoose Models](https://mongoosejs.com/docs/models.html)
* [Mongoose Schemas](https://mongoosejs.com/docs/guide.html)
* [How to Use findOneAndUpdate() in Mongoose](https://mongoosejs.com/docs/tutorials/findoneandupdate.html)
* [Mongoose Virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html)

## Questions
If you have any questions, please visit my GitHub profile [MCunha17](https://github.com/MCunha17) or contact me at cunha.maria.theresa@gmail.com.