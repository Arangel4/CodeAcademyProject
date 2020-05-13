import mongoose from "mongoose";
import Entity from "./entities.js";

export default class Beds {
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        bedAvailability: { type: "Number"},
        changedBy: {type: "String", default: "Administration"},
        changedDateTime: {type: "Date"},
        addedDateTime: {type: "Date"}
    });

    static model = mongoose.model("Bed", Beds.schema, "Beds");
}
    

const addBeds = async(bedObj) => {
    try {
        const newBed = new Beds(bedObj);
        let savePromise = newShelter.save();
        savePromise.then((newBedDoc) => {
            console.log(`The Bed doc has been saved with the ID of ${newBedDoc.id}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

const updateBed = async(id) => {
    try {
        let foundBedDoc = await Beds.findById(id).exec();
        foundBedDoc.height = 88;
        let updatePromise = foundBedDoc.save();
        updatePromise.then((theUpdatedBed) => {
            console.log(`Updated Bed document with the ID of ${theUpdatedBed.id}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

const deleteBed = async(theActualBedDocObj) => {
    try {
        let deletePromise = theActualBedDocObj.deleteOne();
        deletePromise.then(() => {
            console.log(`The Bed document with ID ${theActualBedDocObj.id} has been deleted.`);
        });
    }
    catch (err) {
        console.log(err);
    }
}