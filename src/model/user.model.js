import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, lowerCase: true, unique: true, required: true},
        password: {type: String, required: true},
        role: {type: String, enum: ['admin', 'user'], default: 'user'},
        isActivated: {type: Boolean, default: false},
        otp: {type: String},
        otpExpire: {type: Date},
    },
    {
        timestamps: true
    },
    {
        collection: "users",
        versionKey: false
    }
)

// Middleware: hash the password was defined before the model was compiled
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

// validate the hashed password
userSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const userModel = model("users", userSchema)

export default userModel