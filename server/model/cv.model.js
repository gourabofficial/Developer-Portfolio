import mongoose from "mongoose";

const cvSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps:true})

const CV = mongoose.model("CV",cvSchema);

export default CV;