import queryModel from "../model/query.model.js"
import userModel from "../model/user.model.js";

class Query
{
    static async addQuery(req, res, next)
    {
        const {userEmail, subject, description} = req.body
        
        try 
        {
            const findUser = await userModel.findOne({email: userEmail})
            if(!findUser) return res.status(400).send({message: "User not found"})
            
            await queryModel.create({
                userId: findUser._id,
                subject,
                description
            })
            
            res.status(200).send({message: "Query send successfully"})
        } 
        catch (error) 
        {
            console.log("Error in adding Query", error);
            next(error)
        }
    }


    static async getQueries(req, res, next)
    {
        try 
        {
            const queries = await queryModel.find().populate('userId')
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

            const queries = await queryModel.find({userId: query.userId})

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