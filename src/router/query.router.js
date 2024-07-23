import {Router} from "express"
import Query from "../controller/query.controller.js";

const queryRoute = Router();

queryRoute.post("/add-query", Query.addQuery);
queryRoute.get("/get-user-query/:email",Query.getUserQuery);
queryRoute.get("/queries", Query.getQueries);
queryRoute.put("/update-query", Query.updateQueryById);
queryRoute.put("/query-solution", Query.querySolution);

export default queryRoute