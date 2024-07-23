import { model, Schema } from "mongoose";

const customerSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, lowerCase: true, unique: true, required: true},
        company: {type: String},
        phone: {type: String},
        title: { type: String },
        source: { type: String },
        assignManager: {type: String},
        assignEmployee: {type: String},
        assignDate: {type: Date},
        status: {type: String, default: "none"},
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