import communicationModel from "../model/communication.model.js"
import customerModel from "../model/customer.model.js"
import generateMail from "../utils/generateMail.js"

class Communication
{
    static async sendEmail(req, res, next)
    {
        const {customerId, subject, content} = req.body
        try 
        {
            const customer = await customerModel.findById(customerId)
            if(!customer) return res.status(400).send("Customer not found.")
            

            await communicationModel.create(req.body)

            const mailResponse = await generateMail(customer, subject, content);
            res.status(200).send(mailResponse)
        } 
        catch (error) 
        {
            console.log("Error in while Sending message: ", error);
            next(error)
        }
    }

    static async userCommunicationDetails(req, res, next)
    {
        const {userId} = req.params
        try 
        {
            const communication = await communicationModel.find({customerId:userId?.toString()}).populate("customerId")
            res.status(200).send(communication)
        } 
        catch (error) 
        {
            console.log("Error in fetching user communication log: ", error);
            next(error)
        }
    }
}

export default Communication