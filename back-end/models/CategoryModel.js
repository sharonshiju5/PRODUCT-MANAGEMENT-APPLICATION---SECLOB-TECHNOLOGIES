import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    category:{type:String,require:true},
    })
export default mongoose.model.category||mongoose.model("category",categorySchema)
