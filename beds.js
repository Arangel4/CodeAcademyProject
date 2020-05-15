import mongoose from "mongoose";
import Entity from "./entity.js";
import Shelter from "./shelter.js";

export default class Beds extends Entity{
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        bedAvailability: { type: "Number"},
        updatedBedAvailability: { type: "Number" },
        changedBy: {type: "String", default: "Administration"},
        changedDateTime: {type: "Date"},
        addedDateTime: {type: "Date"}
    });

    static model = mongoose.model("Bed", Beds.schema, "Beds");


    // static async updateBedCount(User, Shelter,BedTotal) {
    //     let currentDate = Date();
    //     let currentProperites = {
    //         bedAvailability: ,
    //         updatedBedAvailability: BedTotal,
    //         changedBy: User._id,
    //         changedDateTime: currentDate

    //     }
    //     try {
    //         //update the bed count and store in database
    //         ServiceOffered.AvaliableBeds = BedCount;
    //         let updateServiceOfferedBedCount = await ServiceOffered.save();
    //         //console.log(updateServiceOfferedBedCount);

    //         // instantiate a new model of whatever the child class is representing
    //         let newModel = new this.model();
    //         // Get all of the properties in theProperties parameter and assign them to the new model object.
    //         for(let [key, value] of Object.entries(theProperties)) {
    //             newModel[key] = value;
    //         }
    //         // Now save the Mongoose model.
    //         return newModel.save();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
   
}


    

// const addBeds = async(bedObj) => {
//     try {
//         const newBed = new Beds(bedObj);
//         let savePromise = newShelter.save();
//         savePromise.then((newBedDoc) => {
//             console.log(`The Bed doc has been saved with the ID of ${newBedDoc.id}`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }


// const updateBed = async(id) => {
//     try {
//         let foundBedDoc = await Beds.findById(id).exec();
//         foundBedDoc.height = 88;
//         let updatePromise = foundBedDoc.save();
//         updatePromise.then((theUpdatedBed) => {
//             console.log(`Updated Bed document with the ID of ${theUpdatedBed.id}`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// const deleteBed = async(theActualBedDocObj) => {
//     try {
//         let deletePromise = theActualBedDocObj.deleteOne();
//         deletePromise.then(() => {
//             console.log(`The Bed document with ID ${theActualBedDocObj.id} has been deleted.`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }