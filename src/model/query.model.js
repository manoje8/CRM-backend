import { model, Schema } from "mongoose";

const querySchema = new Schema(
    {
        customerId: {type: Schema.Types.ObjectId, ref: "customers"},
        subject: { type: String, required: true },
        description: { type: String, required: true},
        solution: {type: [String], default: []},
        status: {type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open'},
    },
    {
        timestamps: true
    },
    {
        collection: "queries",
        versionKey: false
    }
)

const queryModel = model("queries", querySchema);

export default queryModel;