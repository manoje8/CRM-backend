import customerModel from "../model/customer.model.js";
import queryModel from "../model/query.model.js";
import communicationModel from "../model/communication.model.js";

class Customer
{
    static async createCustomer(req, res, next)
    {
        const {name, company, email, phone, title, address, source, description, communicationMethod, fabricTypes, colors, brand} = req.body
        const {aud} = req.payload
        try 
        {
            const doesExist = await customerModel.findOne({email})
            if(doesExist) return res.status(400).send({message: `${doesExist.email} is already been used. Please select different one.`})
            await customerModel.create({
                userId: aud,
                name,
                email,
                company,
                phone,
                title,
                source,
                description,
                address,
                preferences: {
                    communicationMethod,
                    fabricTypes,
                    colors,
                    brand,
                }
            });

            res.status(200).send({message: `${name} succesfully Added.`})
        } 
        catch (error) 
        {
            console.log("Error in while creating customer: ", error);
            next(error)
        }
        
    }

    static async getCustomer(req, res, next)
    {
        try 
        {
            const customer = await customerModel.find();
            if(customer.length === 0) return res.send({message: "Customer List is empty"})

            res.status(200).send(customer)
        } 
        catch (error) 
        {
            console.log("Error in fetching customer details: ", error);
            next(error)
        }
    }

    // Admin
    static async getCustomerById(req, res, next)
    {
        const {id} = req.params
        try 
        {
            const customer = await customerModel.findById(id)
            if(!customer) return res.status(400).send({message: "Customer not found"})
            res.status(200).send(customer)
        } 
        catch (error) 
        {
            console.log("Error in fetching customer details by mail: ", error);
            next(error)
        }
    }

    // user
    static async getCustomerByToken(req, res, next)
    {
        const {aud} = req.payload
        try 
        {
            const customer = await customerModel.findOne({userId: aud})
            if(!customer) return res.status(400).send({message: "Update your profile"})
            res.status(200).send(customer)
        } 
        catch (error) 
        {
            console.log("Error in fetching customer details by token: ", error);
            next(error)
        }
    }

    static async updateCustomerById(req, res, next)
    {
        const {id} = req.params
        try 
        {

            const customer = await customerModel.findOneAndUpdate(
                {_id:id},
                {$set: req.body}
            )
            res.status(200).send({message: "profile updated successfully"})
        } 
        catch (error) 
        {
            console.log("Error in Updating customer details by id: ", error);
            next(error)
            
        }
    }

    static async updateCustomerStatus(req, res, next)
    {
        const {id, status} = req.body
        try 
        {
            const updateStatus = await customerModel.findByIdAndUpdate(id,
                {$set: {status:status}},
                {new : true}
            )

            res.status(200).send({message: "status updated successfully", updatedStatus: updateStatus})
        } 
        catch (error) 
        {
            console.log("Error in Updating customer status: ", error);
            next(error)
            
        }
    }

    static async deleteCustomer(req, res, next)
    {
        const {id} = req.params
        try 
        {
            const customer = await customerModel.deleteOne({_id:id})
            if(!customer) return res.status(400).send({message: "Customer not found"})
            const queries = await queryModel.deleteMany({_id:id})
            const comm = await communicationModel.deleteMany({_id: id})
            res.status(200).send({message: "Customer deleted successfully"})
        } 
        catch (error) 
        {
            console.log("Error in deleting customer ", error);
            next(error)
            
        }
    }
}

export default Customer