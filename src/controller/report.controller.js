import customerModel from "../model/customer.model.js";
import purchaseModel from "../model/purchase.model.js";

class Reports
{
    static async salesByMonth(req, res, next)
    {
        try 
        {
            const sales = await purchaseModel.aggregate([
              {
                $group: {
                  _id: { month: { $month: "$purchaseDate" }, year: { $year: "$purchaseDate" } },
                  totalSales: { $sum: "$totalPrice" },
                }
              },
              {
                $sort: { "_id.year": 1, "_id.month": 1 }
              }
            ]);
            res.status(200).json(sales);

        } 
        catch (error) 
        {
        console.log("Error in fetching sales data ", error);
        next(error)
        
        }
    }

    static async conversion(req, res, next)
    {
        try 
        {
            const totalCustomers = await customerModel.countDocuments();
            const activeCustomers = await customerModel.countDocuments({ status: 'active' });
            const conversionRate = (activeCustomers / totalCustomers) * 100;
        
            res.status(200).json({ totalCustomers, activeCustomers, conversionRate });
          } 
          catch (error) {
            console.log("Error in conversion ", error);
            next(error)
            
          }
    }
}

export default Reports