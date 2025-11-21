import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,  
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    githubLink:{
        type:String,
    },
    liveLink:{
        type:String,
    }
},{timestamps:true})

const Project = mongoose.model("Project",projectSchema);

export default Project;