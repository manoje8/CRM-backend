import { model, Schema } from "mongoose";

const customerSchema = new Schema(
    {
        userId: {type:Schema.Types.ObjectId, ref: "users", required: true},
        name: {type: String, required: true},
        email: {type: String, lowerCase: true, unique: true, required: true},
        company: {type: String},
        phone: {type: String},
        title: { type: String },
        source: { type: String },
        status: {type: String, enum: ['New', 'Active', 'Inactive'], default: 'New'},
        description: { type: String },
        address: {type: String},
        preferences: {
            communicationMethod: { type: String, enum: ['email', 'meeting',] },
            fabricTypes: { type: String },
            colors: { type: String },
            brand:  { type: String }
        }
    },
    {
        timestamps: true
    },
    {
        collection: "customers",
        versionKey: false
    }
)


const customerModel = model("customers", customerSchema);

export default customerModel;