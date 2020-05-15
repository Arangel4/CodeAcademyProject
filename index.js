// Bring in the MongoDB Connection import
import './dbconnection.js';

// Import the entities to test.
import User from './user.js';
import Shelter from './shelter.js';
import Beds from './beds.js';

// Bringing in Mongoose, Express and Body-Parser
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

// Bring in bcrypt
import bcrypt from 'bcryptjs';

// const app = express();  // The actual web server
// const port = 3000;  // Port Express will listen on.

// // Using the bodyparder middleware in Express
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // Allows us to work with x-www-url-encoded data (used primarily in JSON Web Token authentication processes)

// // Allows Express to listen for HTTP traffic.
// app.listen(port, () => {
//     console.log(`Express is now listening for HTTP traffic on port ${port}.`);
// });

// // GET endpoint for retrieving all Person documents
// app.get("/user", async(req, res) => {
//     // GET all of the User documents from MongoDB.
//     try {
//         let alluserDocs = await User.read();
//         // Send all of the User Document objects to whatever requested this particular url endpoint.
//         res.send(alluserDocs);
//     }
//     catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });

// // GET endpoint that returns one User document based on ID.
// app.get("/user/:userId", async(req, res) => {   // ":userId" is a url parameter, in this case, the ID of a specific User document.
//     try {
//         // Get the ID from the url request.
//         let id = req.params.userId
//         // Retrieve the one User document.
//         let personDocs = await User.read({ _id:id });
//         let personDoc = personDocs[0];
//     }
//     catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });

// // POST endpoint that will create a User document
// app.post("/user", async(req, res) => {
//     try {

//     }
//     catch(err){

//     }
// })






const main = async() => {
    try {
        
        
    }
    catch (err) {
        console.log(err);
    }
}

main();