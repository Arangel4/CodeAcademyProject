import mongoose from "mongoose";
import { truncate } from 'fs';

class DBConnection {
    constructor() {
        const mongoDBUrl = "localhost";
        const mongoDBPort = "27017";
        const mongoDBDatabase = "CodeAcademyProject";

        const connectionInfo = `mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBDatabase}`;
        const mongoDBConfigObject = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connect(connectionInfo, mongoDBConfigObject).then(() => {
            console.log("Connected to MongoDB.");
        });
    }
}

export default new DBConnection();