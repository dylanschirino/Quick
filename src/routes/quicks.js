/* Dylan/Quick
 *
 * /src/routes/quicks.js - Quicks.js Routes
 *
 * coded by Dylan Schirino
 * started at 28/12/2016
 */
 import { Router } from "express";

 import list from "../controllers/quicks/list";

 let oRouter = new Router();

 oRouter.get( "/quicks", list );

 export default oRouter;
