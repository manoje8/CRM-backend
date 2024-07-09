import { Schema, model } from "mongoose";

const cummunicationSchema = new Schema(
    {
        customerId: {type: Schema.Types.ObjectId, ref:"customers", required:true},
        type: {type:String, enum: ['email', 'meeting']},
        subject: {type: String, required: true},
        content: {type: String, required: true}
    },
    {
        timestamps: true
    },
    {
        collection: "communications",
        versionKey: false
    }
)

const communicationModel = model("communications", cummunicationSchema);

export default communicationModel