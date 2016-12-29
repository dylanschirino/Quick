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
 import destroy from "../controllers/quicks/destroy";

 let oRouter = new Router();

 oRouter.get( "/quicks", list );
 oRouter.get( "/quicks/:id", details );
 oRouter.post( "/quicks", create );
 oRouter.patch( "/quicks/:id", update );
 oRouter.delete( "/quicks/:id", destroy );

 export default oRouter;
