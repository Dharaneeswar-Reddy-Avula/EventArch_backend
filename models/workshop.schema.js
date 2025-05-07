import mongoose from "mongoose";
const WorkshopSchema = new mongoose.Schema(
    {
        category:{
            type:String,
            required:true,
            trim:true,
        },
        name:{
            type:String,
            required:true,
            trim:true,
        },
        organisedby:{
            type:String,
            required:true,
            trim:true,
        },
        venue:{
            type:String,
            required:true,
            trim:true,
        },
        date:{
            type:String,
            required:true,
        },
        time:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            trim:true,
        },

    },
    {
        timestamps:true,
    }
)

const Workshop = mongoose.model("workshop",WorkshopSchema);
export default Workshop;
