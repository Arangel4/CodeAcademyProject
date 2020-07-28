import mongoose from "mongoose";
import Entity from "./entity.js";
import Beds from './beds.js';

export default class Shelter extends Entity{
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        shelterName: { type: "String", required: true },
        shelterAdmin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        beds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Beds" }],
        phoneNumber: { type: "String", required: true },
        timeOpen: { type: "String", required: true },
        timeClose: { type: "String", required: true },
        address: { type: "String", required: true },
        city: { type: "String", required: true },
        state: { type: "String", required: true },
        zip: { type: "Number", required: true },
        county: { type: "String", required: false },
        isActive: { type: "Boolean", required: false },
        shelterDescription: { type: "String", required: true },
        totalBeds: { type: "Number" },
        bedsAvailable: { type: "Number" },
        addedBy: { type: "String", default: "Administration" },
        changedBy: { type: "String", default: "Administration" },
        changedDateTime: { type: "Date", default: new Date() },
        addedDateTime: { type: "Date", default: new Date() }
    });

    static model = mongoose.model("Shelter", Shelter.schema, "Shelters");
}
