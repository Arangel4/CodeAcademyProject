// Bring in the MongoDB Connection import
import './dbconnection.js';

// Import the entities to test.
import User from './user.js';
import Shelter from './shelter.js';
import Beds from './beds.js';

// Bringing in Express and Body-Parser
import express from 'express';
import bodyParser from 'body-parser';

// Bringing in bcrypt
import bcrypt from 'bcryptjs';

const app = express();  // The actual web server
const port = 3000;  // Port Express listening on.

// Using the bodyparder middleware in Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Allows us to work with x-www-url-encoded data (used primarily in JSON Web Token authentication processes)

// Allows Express to listen for HTTP traffic.
app.listen(port, () => {
    console.log(`Express is listening for HTTP traffic on port ${port}.`);
});

// GET endpoint for retrieving all Shelter documents for display.
app.get("/shelters", async(req, res) => {
    // GET all of the Shelter documents from MongoDB.
    try {
        let allShelterDocs = await Shelter.read();
        // Send all of the Shelter Document objects to whatever requested this particular url endpoint.
        res.send(allShelterDocs);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

// GET endpoint that returns one User document based on ID.
app.get("/user/:userId", async(req, res) => {   // ":userId" is a url parameter, in this case, the ID of a specific User document.
    try {
        // Get the ID from the url request.
        let id = req.params.userId
        // Retrieve the one User document.
        let personDocs = await User.read({ _id:id });
        let personDoc = personDocs[0];
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

// // POST endpoint that will create a User document
// app.post("/user", async(req, res) => {
//     try {
        
//     }
//     catch(err){

//     }
// })

// PUT endpoint for updating an existing User document
app.put("/user/:userId", async(req, res) => {
    try {
        // Get the id.
        let id = req.params.userId;
        // Find the one User document for the choosen id.
        let userDocs = await User.read({ _id: id });
        let userDoc = userDocs[0];
        // Update the one User document
        // Look at the POST req.body for the data used to update the User document.
        let updateInfo = {};
        if (req.body.firstName) {
            updateInfo["firstName"] = req.body.firstName;
        }
        if (req.body.lastName) {
            updateInfo["lastName"] = req.body.lastName;
        }
        if (req.body.phoneNumber) {
            updateInfo["phoneNumber"] = req.body.phoneNumber;
        }
        if (req.body.emailAddress) {
            updateInfo["emailAddress"] = req.body.emailAddress;
        }
        // Performs the update
        let updateUserDoc = await User.update(userDoc, updateInfo);
        res.send({ message: "Update User document was successful!", updateUserDoc });
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});