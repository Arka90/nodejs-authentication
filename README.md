# NodeJs Authentication

## About

This is an authentication system which can be used by any application which require Authentication and authorization

Some Snapshots:

Sign Up page:

![sup](https://user-images.githubusercontent.com/64225385/226327405-77af4480-2ae5-482e-b96b-3341264145b9.JPG)

Sign In page :

![sin](https://user-images.githubusercontent.com/64225385/226327462-5fcb774f-035b-4ed8-8fd1-3c33ef0c4a12.JPG)


Forgot Password :

![forgot pass](https://user-images.githubusercontent.com/64225385/226327536-95ad5174-43e8-4fc1-9f9f-35f8a79fb3a6.JPG)


Profile :


![profile](https://user-images.githubusercontent.com/64225385/226327588-4a796ccd-efd6-405f-a168-374267af712f.JPG)




## Setup Guide

- Step 1 : Download the files locally

- Step 2 : Open the project directory inside any text editor

- Step 3 : Insall all the dependencies

**command to install all dependencies :**

``` npm install ```

- Step 4 : Configure the project according to you

To configure the project find config.env


![config](https://user-images.githubusercontent.com/64225385/226322162-2c93645e-c38b-4a91-a862-47580c25180b.JPG)


Inside config you will find this :

```
NODE_ENV=development
PORT=<PORT_NUMBER>
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
GOOGLE_CALLBACK_URL=<YOUR_GOOGLE_CALLBACK_URL>
MAIL_ID=<YOUR_MAIL_ID>
MAIL_PASSWORD=<YOUR_MAIL_PASSWORD>
SESSION_SECRET=<YOUR_SESSION_SECRET>
MONGO_URL=<YOUR_MONGODB_URL>
DB=<YOUR_DB_NAME>
```

**PORT_NO**
Define an port number like 3000

**GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET and GOOGLE_CALLBACK_URL**
Required for Google Authentication generate your's form Google console

**MAIL_ID and PASSWORD**
give the mail Id and password form which you want to send the mails


**SESSION_SECRET**
Generate your own secret from random keygen

**MONGO_URL**
give the db link Where Do you want to store your sessions

**DB**
Name Your DB


**Note I have used Mailtrap as my mailing service but you can use whatever you want to just locate config folder --> nodemailer.js and change the following code**

```
let trasporter = nodemailer.createTransport({
  host: "YOUR_MAILING_SERVICE",
  port: YOUR_MAILER_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});
```

**IMPORTANT : IF you are using node js 18.0.0 or above you need to do some changes in config --> mongoose.js**

```
const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/${process.env.DB}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB ✔");
});

module.exports = db;
```
replace the ```localhost``` with ```127.0.0.1:27017 ```


## How to run the Project

-- Step 1 : On your terminal locate the project folder

-- Step 2 : write :  ``` npm start ``` to start the project in Development mode and ``` npm run start_prod ``` to start the project in Production mode


## Fututure Improvements

- Going to add recaptcha on Sign In and And Sign up
- 2 factor verification




