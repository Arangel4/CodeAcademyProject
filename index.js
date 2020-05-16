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
        res.send(personDoc);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

// GET endpoint that returns one Shelter document based on ID.
app.get("/shelter/:shelterId", async(req, res) => {   // ":shelterId" is a url parameter, in this case, the ID of a specific Shelter document.
    try {
        // Get the ID from the url request.
        let id = req.params.shelterId
        // Retrieve the one User document.
        let shelterDocs = await Shelter.read({ _id:id });
        let shelterDoc = shelterDocs[0];
        res.send(shelterDoc);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

// // POST endpoint that will create a User document
app.post("/user", async(req, res) => {
    try {
// **************************************************DELETE TEST CODE BEFORE TURN IN!!*****************************
        // CHECK CODE WITH THE FOLLOWING CODE BELOW!
        // console.log(`req.body.firstName = ${req.body.firstName}`);
        // console.log(`req.body.lastName = ${req.body.lastName}`);
        // console.log(`req.body.phoneNumber = ${req.body.phoneNumber}`);
        // console.log(`req.body.emailAddress = ${req.body.emailAddress}`);
        // console.log(`req.body = ${req.body}`);
        // for (let [key, value] of Object.entries(req.body)) {
        //     console.log(`req.body[${key}] = ${value}`);
        // }

        // Checking to see if the values came in on the POST.
        if( req.body.firstName
            && req.body.lastName
            && req.body.phoneNumber
            && req.body.emailAddress
            && req.body.userName
            && req.body.userPassword) { 
                // Get the encrypted password and salt (object)
                let encryptedPasswordAndSalt = await User.generateHash(req.body.userPassword);
                // encryptedPassword is the actual encrypted password
                let encryptedPassword = encryptedPasswordAndSalt.encryptedString;
                // salt is the salt used was used for the encryption.
                let salt = encryptedPasswordAndSalt.salt;


            let newUserInfo = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                emailAddress: req.body.emailAddress,
                userName: req.body.userName,
                userPassword: encryptedPassword, // Storing the encrypted form of the password.
                salt: salt
            };
            // Create the User document.
            let newUser = await User.create(newUserInfo);
            res.send({ message: "User created successfully", newUser });
        }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});

app.post("/user/authenticate", async(req, res) => {
    try {
        // Take the userName a userPassword of the request body
        if (req.body.userName && req.body.userPassword) {
            let theUserName = req.body.userName;
            let theUserPassword = req.body.userPassword;
            // Get the User document that matches with the given username.
            let theUserDocs = await User.read({ userName: theUserName });
            let theUserDoc = theUserDocs[0];    // Should be only one document in the User collection with the given username.
            let authResult = await User.authenticate(theUserPassword, theUserDoc);
            res.send({ auth: authResult });
        }
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

// // POST endpoint that will create a Shelter document
app.post("/shelter", async(req, res) => {
    try {
        if( req.body.shelterName
            && req.body.phoneNumber
            && req.body.timeOpen
            && req.body.timeClose
            && req.body.address
            && req.body.city
            && req.body.state
            && req.body.zip
            && req.body.county
            && req.body.shelterDescription
            && req.body.totalBeds
            && req.body.bedsAvailable) {

            let newShelterInfo = {
                shelterName: req.body.shelterName,
                phoneNumber: req.body.phoneNumber,
                timeOpen: req.body.timeOpen,
                timeClose: req.body.timeClose,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                county: req.body.county,
                shelterDescription: req.body.shelterDescription,
                totalBeds: req.body.totalBeds,
                bedsAvailable: req.body.bedsAvailable
            };

            let newShelter = await Shelter.create(newShelterInfo);
            res.send({ message: "Shelter created successfully", newShelter });
        }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});

// PUT endpoint for updating an existing User document
app.put("/user/:userId", async(req, res) => {
    try {
        // Get the id.
        let id = req.params.userId;
        // Find the one User document for the choosen id.
        let userDocs = await User.read({ _id: id });
        let userDoc = userDocs[0];
        console.log(userDoc);
        // Update the one User document
        // Look at the POST req.body for the data used to update the User document.
        let updateUserInfo = {};
        if (req.body.firstName) {
            updateUserInfo["firstName"] = req.body.firstName;
        }
        if (req.body.lastName) {
            updateUserInfo["lastName"] = req.body.lastName;
        }
        if (req.body.phoneNumber) {
            updateUserInfo["phoneNumber"] = req.body.phoneNumber;
        }
        if (req.body.emailAddress) {
            updateUserInfo["emailAddress"] = req.body.emailAddress;
        }
        // Performs the update
        let updateUserDoc = await User.update(userDoc, updateUserInfo);
        res.send({ message: "Update User document was successful!", updateUserDoc });
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

// PUT endpoint for updating an existing Shelter document
app.put("/shelter/:shelterId", async(req, res) => {
    try {
        // Get the id.
        let id = req.params.shelterId;
        // Find the one Shelter document for the choosen id.
        let shelterDocs = await Shelter.read({ _id: id });
        let shelterDoc = shelterDocs[0];
        // Update the one Shelter document
        // Look at the POST req.body for the data used to update the Shelter document.
        let updateShelterInfo = {};
        if (req.body.shelterName) {
            updateShelterInfo["shelterName"] = req.body.shelterName;
        }
        if (req.body.phoneNumber) {
            updateShelterInfo["phoneNumber"] = req.body.phoneNumber;
        }
        if (req.body.timeOpen) {
            updateShelterInfo["timeOpen"] = req.body.timeOpen;
        }
        if (req.body.timeClose) {
            updateShelterInfo["timeClose"] = req.body.timeClose;
        }
        if (req.body.address) {
            updateShelterInfo["address"] = req.body.address;
        }
        if (req.body.city) {
            updateShelterInfo["city"] = req.body.city;
        }
        if (req.body.state) {
            updateShelterInfo["state"] = req.body.state;
        }
        if (req.body.zip) {
            updateShelterInfo["zip"] = req.body.zip;
        }
        if (req.body.county) {
            updateShelterInfo["county"] = req.body.county;
        }
        if (req.body.isActive) {
            updateShelterInfo["isActive"] = req.body.isActive;
        }
        if (req.body.shelterDescription) {
            updateShelterInfo["shelterDescription"] = req.body.shelterDescription;
        }
        if (req.body.totalBeds) {
            updateShelterInfo["totalBeds"] = req.body.totalBeds;
        }
        if (req.body.bedsAvailable) {
            updateShelterInfo["bedsAvailable"] = req.body.bedsAvailable;
        }
        // Performs the update
        let updateShelterDoc = await Shelter.update(shelterDoc, updateShelterInfo);
        res.send({ message: "Update Shelter document was successful!", updateShelterDoc });
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

// DELETE endpoint that will delete one User Document
app.delete("/user/:userId", async(req, res) => {
    try {
        // Get the id 
        let id = req.params.userId;
        // First find the one User document
        let userDocs = await User.read({ _id: id });
        let userDoc = userDocs[0];
        // Now delete that one document
        let deletedUserDoc = await User.delete(userDoc);
        res.send({ message: "Delete was a success", deletedUserDoc});
    }
    catch (err)
    {
        console.log(err);
        res.send(err);
    }
});

// DELETE endpoint that will delete one Shelter Document
app.delete("/shelter/:shelterId", async(req, res) => {
    try {
        // Get the id 
        let id = req.params.shelterId;
        // First find the one Shelter document
        let shelterDocs = await Shelter.read({ _id: id });
        let shelterDoc = shelterDocs[0];
        // Now delete that one document
        let deletedShelterDoc = await Shelter.delete(shelterDoc);
        res.send({ message: "Delete was a success", deletedShelterDoc});
    }
    catch (err)
    {
        console.log(err);
        res.send(err);
    }
});