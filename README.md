# Social-Network-API

## Description
An API for Social Network web applications that utilize MongoDB. Provides CRUD operations for users, thoughts, and reactions.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
    - [User Routes](#user)
    - [Thought Routes](#thought)
- [License](#license)
- [Tests](#tests)

## Installation
Once you have installed these folders into your application, you will need to ensure you install the dependencies listed in the package.json, express and mongoose. When ran locally, the default database is socialDB. If you would like to change that you can go into `config/connection.js` and change the endpoint of the following url. `mongodb://127.0.0.1:27017/socialDB`

## Usage
### User
Provided [here]() is a walkthough video of the routes being tested with Postman

There are 3 endpoints for User routes

`/api/users/`

`GET` request will return all users

`POST` request will add a new user document
- required properties of req.body
    - username: typeof `STRING`
    - email: typeof `STRING`
        - validates that email only contains alphanumeric or ( . _ - ) special characters left of @ sign

`/api/users/:id`

The `:id` represents the unique user `_id` field of your User document.

`GET` request will return the specific user with the given `_id`

`PUT` request will update the username and email of the user.

`DELETE` request will remove the user document, and all thoughts created by the user from the database

`/api/users/:userId/friends/:friendId`

`PUT` request will push the provided `:friendId` into the `friends: []` field of the user document that matches `_id === :userId`.

`DELETE` request will pull the provided `:friendId` fromt the `friends: []` field of the user document that matches `_id === :userId`.

### Thought
There are 3 endpoints for Thought routes

`/api/thoughts/`

`GET` request will return all thoughts

`POST` request will add a new thought document. Once the thought is created it will also update the user document associated with the thought's username by pushing the newly created thought _id into the user.thought field.
- required properties of req.body
    - thoughtText: typeof `STRING`
        - validates minLength is 1 and maxLength is 280

`/api/thoughts/:id`

The `:id` represents the unique thought `_id` field of your Thought document.

`GET` request will return the specific thought associated with the provided `_id`

`PUT` request will update the thoughtText of the thought document associated with `_id`.

`DELETE` request will remove the thought document associated with the given `_id`

`/api/thoughts/:thoughtId/reaction`

`PUT` request will push the new reaction to the thought matching `_id === :thoughtId`
- required properties of req.body
    - reactionBody: typeof `STRING`
        - validates maxLength: 280
    - username: typeof `STRING`

`DELETE` request will pull the reaction from the thought document matching `_id === :thoughtId` based on the `reactionId` provided in the req.body

## License
N/A

## Tests
There is some default seed data that you can run in order to initially fill your database for testing. From the root of your repo on terminal input `node utils/seed.js`. Running this will DELETE ALL documents currently in your Thought and User collections. Once you seed the data you can use Postman or similar tool to test the api routes.