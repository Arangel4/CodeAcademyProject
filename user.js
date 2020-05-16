import mongoose from "mongoose";
import Entity from './entity.js';
import bcrypt from 'bcrypt';

export default class User extends Entity{
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        administration: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shelter"}],
        userName: { type: "String", required: true },
        userPassword: { type: "String", required: true },
        passwordSetDate: { type: "Date" },
        requestedPasswordChange: { type: "Boolean" },
        resetPasswordToken: { type: "String" },
        salt: { type: "String" },
        isAdministration: { type: "Boolean" },
        isDisabled: { type: "Boolean" },
        firstName: { type: "String", required: true },
        lastName: { type: "String", required: true },
        phoneNumber: { type: "String", required: true },
        emailAddress: { type: "String", required: true },
        changedBy: { type: "String", default: "Administration" },
        changedDateTime: { type: "Date", default: new Date() },
        addedBy: { type: "String" },
        addedDateTime: { type: "Date", default: new Date() }
    });

    static async generateHash(theString) {
        // Bcrypt is used to first generate a part of the encryption: the salt
        // The value passed into genSalt() is the number of rounds brcypt will use to generate the salt value. For this project 10 rounds will be performed.
        const saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);    // Get the salt value out of the returned Promise genSalt();
        // Use the generated salt for encrypting the passed in string.
        let hash = await bcrypt.hash(theString, salt);  // Does the actual encryption of the given string.
        return { salt: salt, encryptedString: hash };
    }

    // A method that can check to see if the user provided the correct password and username.
    static async authenticate(givenPassword, theUserDoc) {
        // Assume givenPassword is what the user typed in, and assume thePersonDoc is the actual User Document found for the given username. ******NOTE: Make sure that you enforce unique usernames
        let salt = theUserDoc.salt;
        let encryptedPassword = theUserDoc.userPassword;

        const match = await bcrypt.compare(givenPassword, encryptedPassword);
        return match;   // True for a match, false if they don't match.
    }

    static model = mongoose.model("User", User.schema, "Users");
}