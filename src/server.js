/* Dylan/Quick
 *
 * /gulpfile - Server.js
 *
 * coded by Dylan Schirino
 * started at 28/12/2016
 */

// init db
import { init as initDB } from "./core/mongodb.js";
import { init as initExpress } from "./core/express";
const APP_PORT = 12345;

// init express
initDB()
  .then( () => {
      initExpress( APP_PORT );
  } );
