import mongoose from "mongoose";
import Entity from "./entity.js";

export default class Shelter extends Entity{
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        shelterName: { type: "String" },
        shelterAdmin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        phoneNumber: { type: "String" },
        timeOpen: { type: "String" },
        timeClose: { type: "String" },
        address: { type: "String" },
        city: { type: "String" },
        state: { type: "String" },
        zip: { type: "Number" },
        county: { type: "String" },
        isActive: { type: "Boolean" },
        shelterDescription: { type: "String" },
        totalBeds: { type: "Number" },
        bedsAvailable: { type: "Number" },
        addedBy: { type: "String" },
        changedBy: { type: "String", default: "Administration" },
        changedDateTime: { type: "Date" },
        addedDateTime: { type: "Date" }
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