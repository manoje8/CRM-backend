import userModel from "../model/user.model.js"
import generateMail from '../utils/generateMail.js'
import { signAccessToken } from "../utils/jwtHelper.js"
import { randomString } from '../utils/generateKeys.js'

class User
{
    static async register(req, res, next)
    {
        const {name, email, password} = req.body
        try 
        {
            if(password.length < 5 ) return res.status(400).send({message: `Your password is too small. please enter the character more than 5`})
            
            const doesExist = await userModel.findOne({email})
            if(doesExist) return res.status(400).send({message: `${doesExist.email} is already been registered.`})

            const createUser = await userModel.create(req.body)

            // Generate activation mail
            const token = await signAccessToken(createUser._id)
            const activationLink = `${process.env.API_URI}/user/activate-account/${token}`
            const activationMessage = `Hello ${name} ,
            <br> 
            Here's your Activation link:  <a style="color:green" href="${activationLink}">Click Here To activate</a> 
            <br> 
            Link expires in 1 hour...`

            await generateMail(createUser, "Activation", activationMessage)

            res.status(200).send({message: `Account created succesfully for ${name}. And the activation link has sent to you mail.`})
        } catch (error) 
        {
            console.log("Error: ", error);
            next(error)
        }
    }

    
    static async activation(req, res, next)
    {
        const {token} = req.params
        try 
        {
            const arrayToken = token.split(".")
            const decodeToken = JSON.parse(atob(arrayToken[1]));
            const userId = decodeToken.aud;


            const isUserActivated = await userModel.findById(userId)

            if(isUserActivated.isActivated)
            {
                res.status(400).send({message: "Account already been activated"})
                res.redirect(`${process.env.CLIENT_URI}/user/login`)
            }

            await userModel.findByIdAndUpdate(
                userId, 
                {$set: {isActivated: true}},
                {new: true}
            )

            res.redirect(`${process.env.CLIENT_URI}/user/login`)

            res.status(200).send({message: "Successfully activated your account."});
        } 
        catch (error) 

        {
            console.log("Activation Error: ", error);
            next(error);
        }
    }
    

    static async login(req, res, next)
    {
        const {email, password} = req.body
        try 
        {
            const user = await userModel.findOne({email})
            if(!user) return res.status(400).send({message: "User not registered"})

            const isMatch = await user.isValidPassword(password)
            if(!isMatch) return res.status(400).send({message: "Email/password not valid"})

            if(!user.isActivated) return res.status(400).send({message: 'Account is not activated'})

            const accessToken = await signAccessToken(user._id);

            res.status(200).send({message: "Successfully signed", userName: user.name, accessToken, role: user.role, email: user.email})
        } catch (error) 
        {
            console.log(error);
            next(error)
        }
    }
    

    static async forgotPassword(req, res, next)
    {
        const {email} = req.body
        try 
        {
            const user = await userModel.findOne({email})
            if(user.role === "admin") return res.status(400).send({message: "UnAuthorized"})
            if(!user.isActivated) return res.status(400).send({message: "Your account is not activated"})
            if(!user) return res.status(400).send({message: "User not registered"}) 
                
            const otp = randomString();
            const otpExpire = new Date();
            otpExpire.setMinutes(otpExpire.getMinutes() + 5)

            const link = `${process.env.CLIENT_URI}/user/reset-password`

            user.otp = otp;
            user.otpExpire = otpExpire
            await user.save();

            const resetPasswordMessage = `Hello ${user.name} ,
            <br> 
            Here's your Reset password link:  <a style="color:green" href="${link}">Click Here To Reset</a> 
            <br> 
            Here is your One-Time Password (OTP): <strong>${otp}</strong></p>
            <br>
            OTP expires in 5 Minutes...`
            
            const mailResponse = await generateMail(user, "Reset password", resetPasswordMessage)
            res.status(200).send(mailResponse)

        } catch (error) 
        {
            console.log(error);
            next(error)
        }
    }

    static async resetPassword(req, res, next)
    {
        const {otp, email, newPassword} = req.body;
        try 
        {
            const user = await userModel.findOne({email})
            
            if(!user) return res.status(400).send({message: "User not registered"})
            if(user.otp !== otp) return res.status(400).send({message: "Invalid OTP"})
            

            if (user.otpExpire > new Date()) 
            {
                user.password = newPassword;
                user.otp = null;
                user.otpExpire = null;
                await user.save()

                res.status(200).send({ message: "Password changed successfully" });
            } else 
            {
                // Handle expired OTP scenario
                res.status(400).send({ message: 'OTP has expired' });
            }

        } catch (error) 
        {
            console.log("Error: ", error);
            next(error)
        }
    }


    static async getAllUsers(req, res, next)
    {
        try 
        {
            const findUser = await userModel.find({role: {$ne: "admin"}})
            res.status(200).send(findUser)
        } 
        catch (error) 
        {
            console.log("Error in fetching all users: ", error);
            next(error)
        }
    }

    static async deleteUser(req, res, next)
    {
        const {email} = req.params
        try 
        {
            const user = await userModel.deleteOne({email})
            if(!user) return res.status(400).send({message: "User not found"})
            res.status(200).send({message: `successfully deleted`})
        } 
        catch (error) 
        {
            console.log("Error in deleting user: ", error);
            next(error)
        }
    }

    static async updateUserRole(req, res, next)
    {
        const {id, role} = req.body
        try 
        {
            const updateRole = await userModel.findByIdAndUpdate(id,
                {$set: {role:role}},
                {new : true}
            )

            res.status(200).send({message: "Role updated successfully"})
        } 
        catch (error) 
        {
            console.log("Error in Updating user role: ", error);
            next(error)
            
        }
    }
}

export default User