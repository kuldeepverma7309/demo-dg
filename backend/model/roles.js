import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    _id: Number, // Specify Number type for _id
    name: String,
    description: String
}, {
    _id: false // Disable auto-generation of _id
});

export const Role = new mongoose.model("Role", roleSchema);