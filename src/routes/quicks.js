/* Dylan/Quick
 *
 * /src/routes/quicks.js - Quicks.js Routes
 *
 * coded by Dylan Schirino
 * started at 28/12/2016
 */
 import { Router } from "express";

 import list from "../controllers/quicks/list";
 import details from "../controllers/quicks/details";
 import create from "../controllers/quicks/create";
 import update from "../controllers/quicks/update";

 let oRouter = new Router();

 oRouter.get( "/quicks", list );
 oRouter.get( "/quicks/:id", details );
 oRouter.post( "/quicks", create );
 oRouter.patch( "/quicks/:id", update );

 export default oRouter;
