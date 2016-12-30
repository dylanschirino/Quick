/* Dylan/Quick
 *
 * /src/routes/pages.js - Pages.js Routes
 *
 * coded by Dylan Schirino
 * started at 30/12/2016
 */
 
import { Router } from "express";

import homepageController from "../controllers/pages/home";

let oRouter = new Router();

oRouter.get( "/", homepageController );

export default oRouter;
