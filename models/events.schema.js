import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
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

const Event = mongoose.model("Event",eventSchema);
export default Event;
