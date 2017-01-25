/* Dylan/Quick
 *
 * /src/controllers/quicks/Details.js - Quick Details
 *
 * coded by Dylan Schirino
 * started at 29/12/2016
 */
 import getQuicks from "../../models/quicks";
 import { send, error } from "../../core/utils/api";
 import { ObjectID } from "mongodb";
 import distance from "jeyo-distans";
 import checkPosition from "../../core/utils/position";

 export default function( oRequest, oResponse ) {
     let sQuickID = ( oRequest.params.id || "" ).trim(),
         iLatitude = +oRequest.query.latitude, // On convertis en chiffre avec le + comme parseInt(10)
         iLongitude = +oRequest.query.longitude,
         oCurrentPosition;

     if ( !sQuickID ) {
      // On vérifie que l'ID soit valide d'abord
         error( oRequest, oResponse, "Invalid ID!!", 400 );
     }

     oCurrentPosition = checkPosition( oRequest.query.latitude, +oRequest.query.longitude ); // On check la position de l'utilisateur

     getQuicks()
      .findOne( {
          "_id": new ObjectID( sQuickID ),
          "deleted_at": null,
      } )
      .then( ( oQuick ) => {

          if ( !oQuick ) {
              return error( oRequest, oResponse, "Unknow terminal", 404 );
          }

          let { _id, slug, name, latitude, longitude, address, hours, open } = oQuick,
              oCleanQuick,
              sDate = new Date(),
              iCurrentHours = sDate.getHours(), // On recupere la date d'aujourd'hui et on en extrait l'heure mais l'heure du serveur est GMT:0 donc on fait +1 pour que ca soit juste.
              iCurrentDay = sDate.getDay(),
              iOpenHours = hours[ iCurrentDay ][ 0 ],
              iCloseHours = hours[ iCurrentDay ][ 1 ]; // On recupere le jour de la semaine

          if ( iCurrentDay ) {
            // Si l'heure courante est supérieur à l'heure d'ouverture et l'heure de fermeture a l'heure courante
              if ( iCurrentHours >= iOpenHours && iCurrentHours <= iCloseHours ) {
                  open = true;
              } else if ( iCurrentHours >= iOpenHours && iCurrentHours <= 24 ) {
                  open = true;
                  // Si l'heure courante est supérieur à l'heure d'ouverture et inférieur à 24h
              } else if ( iCurrentHours <= iOpenHours && iCurrentHours <= iCloseHours ) {
                  open = true;
                  // Si l'heure courante est inférieur à l'heure d'ouverture et l'heure de fermeture est inférieur à l'heure courante
              }
          }
          oCleanQuick = {
              "id": _id,
              "open": !!open,
              slug, name, latitude, longitude, address, hours, distance,
          };
          if ( oCurrentPosition ) {
              oCleanQuick.distance = distance( oCurrentPosition, oCleanQuick ) * 1000;
          }
          send( oRequest, oResponse, oCleanQuick );

      } )
      .catch( ( oError ) => {
          error( oRequest, oResponse, oError );
      } );
 }
