import mongoose from "mongoose";
import Entity from "./entity.js";
import Shelter from "./shelter.js";

export default class Beds extends Entity{
    // Defined static properties pertaining to the schema and model of this entity type.
    static schema = new mongoose.Schema({
        shelterAdmin: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shelter" }],
        bedAvailability: { type: "Number"},
        updatedBedAvailability: { type: "Number" },
        addedBy: { type: "String" },
        addedDateTime: {type: "Date"}
    });

    static model = mongoose.model("Bed", Beds.schema, "Beds");

   
}
