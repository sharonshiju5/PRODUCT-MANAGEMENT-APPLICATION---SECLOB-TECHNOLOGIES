import mongoose from "mongoose";

const subcategorySchema=new mongoose.Schema({
    category:{type:String,require:true},
    subcategory:{type:String,require:true},
    })
export default mongoose.model.subcategory||mongoose.model("subcategory",subcategorySchema)
