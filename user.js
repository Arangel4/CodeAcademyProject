const userSchema = new Schema({
    administration: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shelter"}],
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

const addUser = async(userObj) => {
    try {
        const newUser = new User(userObj);
        let savePromise = newUser.save();
        savePromise.then((newUserDoc) => {
            console.log(`The User doc has been saved with the ID of ${newUserDoc.id}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

const updateUser = async(id) => {
    try {
        let foundUserDoc = await User.findById(id).exec();
        foundUserDoc.height = 88;
        let updatePromise = foundUserDoc.save();
        updatePromise.then((theUpdatedUser) => {
            console.log(`Updated User document with the ID of ${theUpdatedUser.id}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

const deleteUser = async(theActualUserDocObj) => {
    try {
        let deletePromise = theActualUserDocObj.deleteOne();
        deletePromise.then(() => {
            console.log(`The User document with ID ${theActualUserDocObj.id} has been deleted.`);
        });
    }
    catch (err) {
        console.log(err);
    }
}