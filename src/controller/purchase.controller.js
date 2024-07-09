import customerModel from "../model/customer.model.js";
import purchaseModel from "../model/purchase.model.js";

class Purchase
{
    // Get all purchases for a specific customer
    static async getPurchases(req, res, next)
    {
        const {id} = req.params
        try 
        {
            const purchases = await purchaseModel.find({ customerId: id})
            if(purchases.length === 0) return res.status(400).send({message: "Purchase empty"})
            
            res.status(200).send(purchases)
        } 
        catch (error) 
        {
            console.log("Error in fetching purchase details: ", error);
            next(error)
        }
    }

    // Add a new purchase for a specific customer
    static async addPurchase(req, res, next)
    {
        const { productName, amount, quantity } = req.body;
        const {aud} = req.payload
        try 
        {
            const customer = await customerModel.findOne({userId: aud})

            if(!customer) return res.status(400).send({message: "Not valid!. Please update your profile"})

            await purchaseModel.create({
                customerId: customer._id,
                productName,
                amount,
                quantity,
                totalPrice: (amount * quantity).toFixed(2)
            })

            await customerModel.findByIdAndUpdate(customer._id,
                { status: "active"},
                { new: true}
            )

            res.status(200).send({message: "Successfully Purchased"})
        } 
        catch (error) 
        {
            console.log("Error in adding purchase: ", error);
            next(error)
        }
    }
}

export default Purchase