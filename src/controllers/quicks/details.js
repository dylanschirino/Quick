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

     oCurrentPosition = checkPosition( iLatitude, iLongitude ); // On check la position de l'utilisateur

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
              date = new Date(),
              CurrentHours = date.getHours(), // On recupere la date d'aujourd'hui et on en extrait l'heure mais l'heure du serveur est GMT:0 donc on fait +1 pour que ca soit juste.
              CurrentDay = date.getDay(),
              OpenHours = hours[ CurrentDay ][ 0 ],
              CloseHours = hours[ CurrentDay ][ 1 ]; // On recupere le jour de la semaine

          if ( CurrentDay ) {
            // Si l'heure courante est supérieur à l'heure d'ouverture et l'heure de fermeture a l'heure courante
              if ( CurrentHours >= OpenHours && CurrentHours <= CloseHours ) {
                  open = true;
              } else if ( CurrentHours >= OpenHours && CurrentHours <= 24 ) {
                  open = true;
                  // Si l'heure courante est supérieur à l'heure d'ouverture et inférieur à 24h
              } else if ( CurrentHours <= OpenHours && CurrentHours <= CloseHours ) {
                  open = true;
                  // Si l'heure courante est inférieur à l'heure d'ouverture et l'heure de fermeture est inférieur à l'heure courante
              }
          }
          oCleanQuick = {
              "id": _id,
              "open": !!open,
              slug, name, latitude, longitude, address, hours,
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
