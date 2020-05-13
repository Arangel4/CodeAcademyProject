// Bring in the MongoDB Connection import
import "./dbconnection.js";

// Import the entities to test.
import User from "./user.js";
import Shelter from "./shelter.js";
import Beds from "./beds.js";

// Bringing in Express and Body-Parser
import express from "express";
import bodyParser from "body-parser";

const main = async() => {
    try {
        await connectToDB();

        
    }
    catch (err) {
        console.log(err);
    }
}

main();