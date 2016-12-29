/* Dylan/Quick
 *
 * /src/controllers/quicks/Create.js - Quick Creation
 *
 * coded by Dylan Schirino
 * started at 29/12/2016
 */
 import { ObjectID } from "mongodb";
 import getQuicks, { checkQuick } from "../../models/quicks";
 import { send, error } from "../../core/utils/api";
 import checkPosition from "../../core/utils/position";

 export default function( oRequest, oResponse ) {
     const POST = oRequest.body;

     let iLatitude = +POST.latitude,
         iLongitude = +POST.longitude,
         sQuickID = new ObjectID(),
         sName = ( POST.name || "Quick sans nom" ).trim(), // Si vide on ajoute la chaine de caractère
         sSlug = ( POST.slug || "Quick sans nom" ).trim(),
         sAddress = ( POST.address || "" ).trim(),
         aHours = POST.hours,
         oPosition = checkPosition( iLatitude, iLongitude ),
         oQuick,
         fCreateQuick;

     if ( !oPosition ) {
         return error( oRequest, oResponse, "Invalid position", 400 );
     }

     oQuick = {
         "latitude": oPosition.latitude,
         "longitude": oPosition.longitude,
         "created_at": new Date(),
         "updated_at": new Date(),
     };

     // Assignement des données à leur valeur si on a pas c'est pas grave c'est optionnel
     sAddress && ( oQuick.address = sAddress );
     sName && ( oQuick.name = sName );
     sSlug && ( oQuick.slug = sSlug );
     aHours && ( oQuick.hours = aHours );

     fCreateQuick = () => {
         return getQuicks().insertOne( oQuick );

     };

     checkQuick( sQuickID )
        .then( fCreateQuick )
        .then( () => {
          // Tout est ok
            send( oRequest, oResponse, {
                "id": oQuick._id,
                "slug": oQuick.slug || null,
                "name": oQuick.name || null,
                "address": oQuick.address || null,
                "hours": oQuick.hours,
                "latitude": oQuick.latitude,
                "longitude": oQuick.longitude,
            }, 201 );
        } )
        .catch( ( oError ) => {
            error( oRequest, oResponse, oError );
        } );

 }
