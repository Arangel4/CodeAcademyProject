 // This Entity class will serve as the parent class for all model-like children classes.
export default class Entity {
    // Defined below are the 4 CRUD functions that will be used throughout the database.
    // CREATE function
    static async create(theProperties) {
        // theProperties parameter will take in a JSON object containing the all the properties to use in creating a new document.
        try {
            // Instantiate a new model of whatever the child class is representing.
            let newModel = new this.model();
            // Get all of the properties in theProperties parameter and assign them to the new model object.
            for (let [key, value] of Object.entries(theProperties)) {
                newModel[key] = value;
            }
            // Save the Mongoose model.
            return newModel.save();
        }
        catch (err) {
            console.log(err);
        }
    }

    // READ function
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

    // UPDATE function
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

    // DELETE function
    static async delete(theActualDoc) {
        // theActualDoc is an actual Mongoose Document Model object (like what is returned from create(), read(), even update())
        try {
            return theActualDoc.delete();
        }
        catch (err) {
            console.log(err);
        }
    }
}