import customerModel from "../model/customer.model.js";
import queryModel from "../model/query.model.js"
import userModel from "../model/user.model.js";

class Query
{
    static async addQuery(req, res, next)
    {
        const {customerId} = req.body
        try 
        {
            const findUser = await customerModel.findById(customerId)
            if(!findUser) return res.status(400).send({message: "User not found"})
            
            await queryModel.create(req.body)
            
            res.status(200).send({message: "Query send successfully"})
        } 
        catch (error) 
        {
            console.log("Error in adding Query", error);
            next(error)
        }
    }

    static async getQueryById(req, res, next)
    {
        const {id} = req.params
        try 
        {
            const userQuery = await queryModel.find({customerId: id})

            if(!userQuery) return res.status(400).send({message: "Query is empty"})
            res.status(200).send(userQuery)
        } 
        catch (error) 
        {
            console.log("Error in getting customer Query", error);
            next(error)
        }
    }

    static async getQueries(req, res, next)
    {
        try 
        {
            const queries = await queryModel.find()
            if(!queries) return res.status(400).send({message: "Queries Empty"})
            res.status(200).send(queries)
        } 
        catch (error) 
        {
            console.log("Error in fetching Queries", error);
            next(error)
        }
    }

    static async updateQueryById(req, res, next)
    {
        const {queryId, status} = req.body;

        try 
        {
            const query = await queryModel.findByIdAndUpdate(queryId,
                { status },
                { new: true}
            )

            const queries = await queryModel.find({customerId: query.customerId})

            res.status(200).send({message: "Updated successfully", queries})

        } 
        catch (error) 
        {
            console.log("Error in updating Query", error);
            next(error)
        }
    }

    static async querySolution(req, res, next)
    {
        const {queryId, message} = req.body;

        try 
        {
            await queryModel.findByIdAndUpdate(queryId,
                { $push: {solution: message} },
                { new: true}
            )

            res.status(200).send({message: "message successfully"})

        } 
        catch (error) 
        {
            console.log("Error in updating Query", error);
            next(error)
        }
    }
}

export default Query