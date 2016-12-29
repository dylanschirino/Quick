/* Dylan/Quick
 *
 * /src/controllers/quicks/Destroy.js - Quick Destroy
 *
 * coded by Dylan Schirino
 * started at 29/12/2016
 */
 import { ObjectID } from "mongodb";
 import getQuicks from "../../models/quicks";
 import { send, error } from "../../core/utils/api";

 export default function( oRequest, oResponse ) {
     let oQuickID;

     try {
         oQuickID = new ObjectID( oRequest.params.id );
     } catch ( oError ) {
         return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
     }

     getQuicks()
     .deleteOne( {
       // On verifie l'ID
         "_id": oQuickID,
     } )
    .then( ( { deletedCount } ) => {
        if ( deletedCount === 1 ) {
          // On supprime
            return send( oRequest, oResponse, "", 204 );
        }

        return error( oRequest, oResponse, "Unknow deletion error", 500 );
    } )
    .catch( ( oError ) => {
        error( oRequest, oResponse, oError );
    } );
 }
