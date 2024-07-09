import { Schema, model } from "mongoose";

const purchaseSchema = new Schema(
    {
        customerId: {type: Schema.Types.ObjectId, ref: "customers", required: true},
        productName: {type: String, required: true},
        purchaseDate: {type: Date,default: Date.now},
        amount: {type:  Number, required: true},
        quantity: {type: Number, required: true},
        totalPrice: {type: Number, required: true}
    },
    {
        timestamps: true
    },
    {
        collection: "purchases",
        versionKey: false
    }
)

const purchaseModel = model("purchases", purchaseSchema);

export default purchaseModel

