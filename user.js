import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export default class User {
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        administration: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shelter"}],
        userName: { type: "String" },
        userPassword: { type: "String" },
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

    // Define the 4 CRUD functions as statically available properties.
    // Define a CREATE function
    static async create(theProperties) {
        // Assume that theProperties parameter is a JSON object containing the properties to use in creating a document.
        try {
            // Instantiate a new model of whatever the child class is representing.
            let newModel = new this.model();
            // Get all of the properties in theProperties parameter and assign them to the new model object..
            for (let [key, value] of Object.entries(theProperties)) {
                newModel[key] = value;
            }
            // Now save the Mongoose model.
            return newModel.save();
        }
        catch (err) {
            console.log(err);
        }
    }

    // Define READ function
    static async read(filter, relationshipsToPopulate) {
        // filter is a JSON object to actually filter model.find()
        // relationshipsToPopulate is an array of the names of the properties that contain the linking relationships for this model.
        try {
            let query = null;   // This will hold the Query object returned from find()
            // Handle the situation where filter is available 
            if (filter) {   // checking to see if filter is define (that is, something is passed into it)
                query = this.model.find(filter);    // No matter what, the documents that will eventually come out of a find() query will be in an array, even if it is an array of 0 documents.
            } else {
                query = this.model.find();
            }
            // Now handle the situation where we need to populate relationships
            if (relationshipsToPopulate) {
                for (let i = 0; i < relationshipsToPopulate.length; i++) {
                    query = query.populate(relationshipsToPopulate[i]);
                }
            }
            return query.exec();
        }
        catch (err) {
            console.log(err);
        }
    }

    // Define UPDATE function
    static async update(theDocToBeUpdated, theUpdatedInfo) {
        // theDocToBeUpdated is an actual Mongoose Document Model object (like something return from a read() or create())
        // theUpdatedInfo is JSON object that contains the properties and values to be modified.
        try {
            // Modify the properties of theDocToBeUpdated with the properties of theUpdatedInfo
            for (let [key, value] of Object.entries(theUpdatedInfo)) {
                theDocToBeUpdated[key] = value;
            }
            return theDocToBeUpdated.save();
        }
        catch (err) {
            console.log(err);
        }
    }

    // Define DELETE function
    static async delete(theActualDoc) {
        // theActualDoc is an actual Mongoose Document Model object (like what is returned from create(), read(), even update())
        try {
            return theActualDoc.delete();
        }
        catch (err) {
            console.log(err);
        }
    }
};




// const addUser = async(userObj) => {
//     try {
//         const newUser = new User(userObj);
//         let savePromise = newUser.save();
//         savePromise.then((newUserDoc) => {
//             console.log(`The User doc has been saved with the ID of ${newUserDoc.id}`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// const updateUser = async(id) => {
//     try {
//         let foundUserDoc = await User.findById(id).exec();
//         foundUserDoc.height = 88;
//         let updatePromise = foundUserDoc.save();
//         updatePromise.then((theUpdatedUser) => {
//             console.log(`Updated User document with the ID of ${theUpdatedUser.id}`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// const deleteUser = async(theActualUserDocObj) => {
//     try {
//         let deletePromise = theActualUserDocObj.deleteOne();
//         deletePromise.then(() => {
//             console.log(`The User document with ID ${theActualUserDocObj.id} has been deleted.`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }