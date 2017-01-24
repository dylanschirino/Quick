/* Dylan/Quick
 *
 * /src/core/express.js - Express configuration
 *
 * Coded by Dylan Schirino
 * At 28/12/16
 */
import express from "express";
import bodyParser from "body-parser";
import responseTime from "response-time";
import mitanEko from "mitan-eko";
import zouti from "zouti";
import systemRoutes from "../routes/system";
import quicksRoutes from "../routes/quicks";
import pagesRoutes from "../routes/pages";

let oApp,
    fInit;
const APP_PORT = 8080;

fInit = function( iAppPort = APP_PORT ) {
    if ( oApp ) {
        return oApp;
    }
    oApp = express();

    // Configure middlewares( small softwares components )

    oApp.use( mitanEko( "quick" ) );
    oApp.use( responseTime() );
    oApp.use( bodyParser.json() );
    oApp.use( bodyParser.urlencoded( {
        "extended": true,
    } ) );

    oApp.use( express.static( `${ __dirname }/../../static` ) );

    // configure templates
    oApp.set( "views", `${ __dirname }/../views` );
    oApp.set( "view engine", "pug" );

    // Routes
    oApp.use( systemRoutes );
    oApp.use( quicksRoutes );
    oApp.use( pagesRoutes );

    // Listening on port
    oApp.listen( iAppPort, () => {
        zouti.success( `Server is listening on the port ${ iAppPort }.`, "quick" );
    } );
};

export {
  fInit as init,
};
