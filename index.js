import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const mongoDBUrl = "localhost";
const mongoDBPort = "27017";
const mongoDBDatabase = "CodeAcademyProject";


const User = mongoose.model("User", userSchema, "Users");
const Shelter = mongoose.model("Shelter", shelterSchema, "Shelters");
const Beds = mongoose.model("Bed", bedSchema, "Beds");


const connectToDB = async() => {
    try {
        const connectionInfo = `mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBDatabase}`;
        const mongoDBConfigObject = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        await mongoose.connect(connectionInfo, mongoDBConfigObject);
    } 
    catch (err) {
        console.log(err);
    }
}


const main = async() => {
    try {
        await connectToDB();

        
    }
    catch (err) {
        console.log(err);
    }
}

main();