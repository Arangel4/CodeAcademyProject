import mongoose from 'mongoose';
import Entity from './entity.js';
import User from './user.js';
import bcrypt from 'bcrypt';
import dbconnection from './dbconnection.js';

const addUser = async(userObj) => {
    try {
        const firstUser = new User(userObj);
        firstUser.save((err, savedObj) => {
            if (err) {
                console.log(err);
            }
            console.log(savedObj);
        });
    }
    catch (err) {
        console.log(err);
    }
}

const main = async() => {
    await dbconnection();
    let firstUser = {
        userName: "TheAdmin",
        userPassword: encryptedPassword, 
        passwordSetDate: new Date(),
        firstName: "Main", 
        lastName: "Administrator", 
        phoneNumber: "(123) 456-7890", 
        emailAddress: "theAdmin@email.com",
        isDisabled: false,
        isAdministration: true,
        addedDateTime: new Date(),
        salt: salt
    };
    await addUser(firstUser);
}
    
    let encryptedPasswordAndSalt = await User.generateHash(req.body.userPassword);
    // encryptedPassword is the actual encrypted password
    let encryptedPassword = encryptedPasswordAndSalt.encryptedString;
    // salt is the salt used was used for the encryption.
    let salt = encryptedPasswordAndSalt.salt;


