# MERN - Stack

M - Mongo
E - Express
R - React
N - Node

### Traditional Database

Databases - collection of tables (user, products, movies, blog)
Tables - Primary Key (ID) columns inside the table (ie: username, first name, last name, dob)
Records - Rows of values that are stored in the table

### Mongo Database

Database = Database
Collections = Tables
Documents = Records

## Getting Started Server

- Need a Package.json file (`npm init -y`)
- Install Express: (`npm i express`)
- Install Mongoose: ('npm i mongoose`)
- Install dotenv: (`npm i dotenv`)
- Update package.json from index.js to app.js

## .gitignore

Git Ignore - tells your git repo to ignore certain files and folders from being tracked.

- create a .gitignore
  `/node_modules`

## app.js file

- Add boiler plate code and have the app listen on 4000.

```js
require("dotenv").config();
const express = require("express");
const app = express();

app.listen(process.env.PORT, function () {
  console.log(`movie app is listening on port ${process.env.PORT}`);
});
```

## .env file

- Contains constants that are specific for our environment
- Store items in there that you do not want published
- add .env to the gitignore file
- Set the `PORT = 4000`

## Creating Models

- Models help define what your database collection will look like
- Boiler Plate

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // Create the Columns Here for the Collection
});

module.exports = mongoose.model("User", UserSchema);
```

## Controllers

- They will take in user requests and send back information
- Controllers will do the work and will Create, Read, Update, or Delete from the Database.

## Bcrypt - Hashing Passwords

- this will encrypt our password
- `npm i bycrypt` in order to use it in your files.
- to hash that password you can use this example

```js
bcrypt.hashSync(req.body.password, 10);
```

- you will need to use `bycrypt.compare()` to compare the passwords: this will return true or false

```js
const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
```

## JWT - JSON Web Token

- used to help identify and authenticate a user
- should be given in user login and signup
- jw.sign has 3 arguements: Payload, encrypt and decrypt message, option sets
- Example code:

```js
const token = jwt.sign({ id: newUser._id }, "secret_message_here", {
  expiresIn: 60 * 60 * 24,
});
```
