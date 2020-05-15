import mongoose from "mongoose";
import Entity from './entity.js';
import bcrypt from 'bcryptjs';

export default class User extends Entity{
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        administration: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shelter"}],
        userName: { type: "String" },
        userPassword: { type: "String" },
        salt: { type: "String" },
        disabled: { type: "Boolean" },
        firstName: { type: "String" },
        lastName: { type: "String" },
        phoneNumber: { type: "String" },
        emailAddress: { type: "String" },
        changedBy: {type: "String", default: "Administration"},
        changedDateTime: {type: "Date"},
        addedDateTime: {type: "Date"}
    });

    static model = mongoose.model("User", User.schema, "Users");



}