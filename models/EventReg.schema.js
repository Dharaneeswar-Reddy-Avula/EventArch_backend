import mongoose from "mongoose";

const eventRegSchema = new mongoose.Schema(
  {
    IdNum: {
      type: String,
      required: true,
      trim: true,
    },
    EventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventReg = mongoose.model("EventReg", eventRegSchema);
export default EventReg;