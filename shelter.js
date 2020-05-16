import mongoose from "mongoose";
import Entity from "./entity.js";

export default class Shelter extends Entity{
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        shelterName: { type: "String", required: true },
        shelterAdmin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        phoneNumber: { type: "String", required: true },
        timeOpen: { type: "String", required: true },
        timeClose: { type: "String", required: true },
        address: { type: "String", required: true },
        city: { type: "String", required: true },
        state: { type: "String", required: true },
        zip: { type: "Number", required: true },
        county: { type: "String", required: true },
        isActive: { type: "Boolean", required: true },
        shelterDescription: { type: "String", required: true },
        totalBeds: { type: "Number", required: false },
        bedsAvailable: { type: "Number", required: false },
        addedBy: { type: "String" },
        changedBy: { type: "String", default: "Administration" },
        changedDateTime: { type: "Date", default: new Date() },
        addedDateTime: { type: "Date", default: new Date() }
    });

    static model = mongoose.model("Shelter", Shelter.schema, "Shelters");
}

// const getShelterBySearch = async(searchCriteriaObj) => {
//     try {
//         return Shelter.find(searchCriteriaObj).exec();
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// const addShelter = async(shelterObj) => {
//     try {
//         const newShelter = new Shelter(shelterObj);
//         let savePromise = newShelter.save();
//         savePromise.then((newShelterDoc) => {
//             console.log(`The Shelter doc has been saved with the ID of ${newShelterDoc.id}`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// const updateShelter = async(id) => {
//     try {
//         let foundShelterDoc = await Shelter.findById(id).exec();
//         foundShelterDoc.height = 88;
//         let updatePromise = foundShelterDoc.save();
//         updatePromise.then((theUpdatedShelter) => {
//             console.log(`Updated Shelter document with the ID of ${theUpdatedShelter.id}`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// const deleteShelter = async(theActualShelterDocObj) => {
//     try {
//         let deletePromise = theActualShelterDocObj.deleteOne();
//         deletePromise.then(() => {
//             console.log(`The Shelter document with ID ${theActualShelterDocObj.id} has been deleted.`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }