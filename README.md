![](https://github.com/Mechanix-Ufscar/web-api/blob/master/public/images/Logo.png)

# README.md

![](https://img.shields.io/github/issues/Mechanix-Ufscar/web-api)
![](https://img.shields.io/github/forks/Mechanix-Ufscar/web-api)
![](https://img.shields.io/github/stars/Mechanix-Ufscar/web-api)
![](https://img.shields.io/github/license/Mechanix-Ufscar/web-api)

# Mechanix - CRUD Operations
> [Mechanix-Ufscar Repository](https://github.com/Mechanix-Ufscar)

This tutorial  introduces the concept of [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete), allowing users to manipulate the data held within the context of a mechanic register in an application.

The tutorial is also available as Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/de5fcdece7e85635ad6b)

## Contents

<details>
<summary><strong>Details</strong></summary>

-   [Data Entities](#data-entities)
-   [Architecture](#architecture)
-   [Prerequisites](#prerequisites)
-   [Getting started](#getting-started)
-   [Example CRUD Operations](#example-crud-operations)
    - [Create an User](#create-an-user)
    - [Create a Mechanic](#create-a-mechanic)
    -[Read a Mechanic](#read-a-mechanic)
    	-[Read a Mechanic by Id](#read-a-mechanic-by-id)
    - [Update a Mechanic](#update-a-mechanic)
    - [Delete a Mechanic](#delete-a-mechanic)
-   [Authors](#authors)
</details>

## Data Entities

For the CRUD operations, we are only working with one entity, the mechanic. A mechanic is defined as an professional who wants to get more visible through an app - it is a conceptual object. Mechanics would have properties such as:
- Mechanic name, e.g. "Wagner Ribeiro"
- Title (name of the mechanical workshop), e.g. "Oficina Ribeiro"
- Category (which is your specialty), e.g. "Motors rectification"
- Address, e.g. "Rodovia João Leme dos Santos, SP-264, Km 110"
- City, e.g. "Sorocaba";
- State, e.g. "São Paulo"

The struture of this entity is represented below.

| Column     | Type   | Required |
|------------|--------|----------|
| name       | String | true     |
| title      | String | true     |
| category   | String | true     |
| address    | String | true     |
| city       | String | true     |
| state      | String | true     |

## Architecture

In this project, we use Node, [Express](http://www.passportjs.org/packages/passport-jwt/), MongoDB and [Mongoose](https://www.npmjs.com/package/mongoose) REST API using [Passport.js](http://www.passportjs.org/packages/passport-jwt/) Authentication or log in.

So, in this project, you will see a lot of Passport.js domination. Authentication mechanism to generate JSON web token (JWT), all handled by Passport.js. The Express job just handles the API routing, while the middleware for accessing the MongoDB database is handled by Mongoose.js.

The flow of this tutorial is very simple,: 
1. An unauthorized user accessing secure resource will return 403 response. 
2. Then the user login using credentials username and password. 
3. The success response will return the JWT codes (generated by Passport.js - JWT module) that should put in the Authorization headers in every request to the secure resources. 
4. The failure login will return a 401 response. 

## Prerequisites
  - [Node,js](https://nodejs.org/en/) 10.19.0 or higher
  - [NPM](https://www.npmjs.com/get-npm) 6.13.4 or higher
  - [MongoDB](https://www.mongodb.com/download-center) 4.0.5 or higher 

## Getting started

Clone this repo to your local machine using https://github.com/Mechanix-Ufscar/web-api.git

Before we start, please check that you have installed the latest Node.js. In the Terminal or Command Line type this command to check the version of Node.js and NPM.

    node -v
    npm -v

Type this command to install default required Node dependencies.

    npm install

Make sure MongoDB server is running. Open another terminal, then type this command to start MongoDB server.

    mongod

Now test your Express server by type this command.

    npm start` or `nodemon

You will see this log in the terminal if the server runs correctly.

    [nodemon] 1.11.0
    [nodemon] to restart at any time, enter rs
    [nodemon] watching: *.*
    [nodemon] starting node ./bin/www

Test the server conection by opening the following URL:

    http://localhost:3000

## Example CRUD Operations

## Create an User

If you want to create a record the request can be written in URL format as: 

    POST /api/signup

You have to send a body containing:

    {
        "username": "teste@example.com",
        "password": "123456"
    }

And it will return the message above:

	{
		"success": true,
		"msg": "Successful created new user."
	}

For the users data, the structure above is considered. Note that the name must be unique.

| Column   | Type   | Required | Constraint |
|----------|--------|----------|------------|
| username | String | true     | unique     |
| password | String | true     |            |

## Create a Mechanic

The REST API for Mechanic resource is restricted for the authorized user only.  So, if you send the GET request:

    GET /api/mechanic

You should see this message:

`Unauthorized`

To access the mechanic resource, we have to log in using the previously registered user. Change method to "POST" and then fill credentials you have created before.

    POST /api/signin

If login is successful, we should get a JWT token like below.

```json
    {
      "success": true,
      "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IiQyYSQxMCRCLjByc3lnTHEwMzE4Njk5RWNlTU9lMllqWlJQZ3ZwL1VhZk8yb25OUkwuZDVWR3hmUjlOZSIsInVzZXJuYW1lIjoidGVzdEBleGFtcGxlLmNvbSIsIl9pZCI6IjU4ZWI5MzljNGE4MGYzNGU4OGU2NGY2MiJ9LCJpYXQiOjE0OTE4MzQ0OTF9.O2ljjVJVYBt65b0bTWnjyU-IDwJ9gXfDbzqDO7lccWc"
    }
```
Just copy and paste the token value for use in request headers of restricted mechanic resource. Now, do previous get mechanic and add this header.

And it will return the message below:

	{
		"success": true,
		"msg": "Successful created new mechanic."
	}

## Read a Mechanic




### Read a Mechanic by id

## Update a Mechanic

## Delete a Mechanic



## Authors

* **Camille Kamimura** - *Mathematical Modelling Analyst* - [CamilleKamimura](https://github.com/CamilleKamimura)
* **Richard Felix** - *Data Scientist* - [wagnerabr](https://github.com/wagnerabr)
* **Wagner Ribeiro** - *PHP developer* - [riichfelix](https://github.com/riichfelix)

See also the list of [contributors](https://github.com/Mechanix-Ufscar/web-api/graphs/contributors) who participated in this project.
