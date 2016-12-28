/* Dylan/Quick
 *
 * /src/core/mongodb.js - MongoDB.js
 *
 * Coded by Dylan Schirino
 * At 28/12/16
 */
import { MongoClient } from "mongodb";
import Promise from "bluebird";
import zouti from "zouti";

// Adresse de la base de données
const MONGO_URL = "mongodb://127.0.0.1:27017/quick";

let oDB, fInit;

// Fonction d'initialisation de la base de données
fInit = function() {
    return new Promise( ( fResolve, fReject ) => {
        MongoClient.connect( MONGO_URL, ( oError, oLinkedDB ) => {

            if ( oError ) {
                return fReject( oError );
            }
            // Si y a pas d'erreur on affiche le message de connection
            zouti.success( "Connected to DB", "Quick" );
            fResolve( oDB = oLinkedDB );
        } );
    } );
};

export {
  fInit as init,
  oDB as db,
};
