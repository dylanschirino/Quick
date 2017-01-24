/* Dylan/Quick
 *
 * /src/controllers/quicks/list.js - Quick listing
 *
 * coded by Dylan Schirino
 * started at 28/12/2016
 */
 import getQuicks from "../../models/quicks";
 import { send, error } from "../../core/utils/api";
 import distance from "jeyo-distans";
 import checkPosition from "../../core/utils/position";

 const ARC_KILOMETER = 0.0092529, // 1 décimal de lat/long vaut X km
     DEFAULT_RADIUS = 1,
     MAX_RADIUS = 10;

 export default function( oRequest, oResponse ) {
     // Verification de la position de l'utilisateur
     let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ),
         iSearchRadius = +oRequest.query.radius;

     if ( !oCurrentPosition ) {
         return error( oRequest, oResponse, "Invalid position!", 400 );
     }
     // Si le nombre entré n'est pas un nombre on mets nous meme le default radius
     if ( isNaN( iSearchRadius ) ) {
         iSearchRadius = DEFAULT_RADIUS;
     }
     // Si il est inférieur au radius par default on mets le default radius
     if ( iSearchRadius < DEFAULT_RADIUS ) {
         iSearchRadius = DEFAULT_RADIUS;
     }
     // Si c'est plus grand que le max radius on mets nous même le max radius
     if ( iSearchRadius > MAX_RADIUS ) {
         iSearchRadius = MAX_RADIUS;
     }
     iSearchRadius *= ARC_KILOMETER; // On covertit le radius de kilometre en ARC_KILOMETER

     getQuicks()
     .find( {
         "latitude": {
             "$gt": oCurrentPosition.latitude - iSearchRadius, // $gt = plus grand, $lt = plus petit
             "$lt": oCurrentPosition.latitude + iSearchRadius,
         },
         "longitude": {
             "$gt": oCurrentPosition.longitude - iSearchRadius,
             "$lt": oCurrentPosition.longitude + iSearchRadius,
         },
         "deleted_at": null,
     } )
     // Ici on va garder que les propriétés qui nous intéresse.
     .toArray()
     .then( ( aQuicks = [] ) => {
         let aCleanQuicks,
             aQuickToReset = [];

         aCleanQuicks = aQuicks.map( ( { _id, name, slug, address, latitude, longitude, open, hours } ) => {

             aQuickToReset.push( _id );

             let date = new Date(),
                 CurrentHours = date.getHours(), // On recupere la date d'aujourd'hui et on en extrait l'heure mais l'heure du serveur est GMT:0 donc on fait +1 pour que ca soit juste.
                 CurrentDay = date.getDay(),
                 OpenHours = hours[ CurrentDay ][ 0 ],
                 CloseHours = hours[ CurrentDay ][ 1 ]; // On recupere le jour de la semaine

             if ( CurrentDay ) {
           // Si l'heure courante est supérieur à l'heure d'ouverture et l'heure de fermeture a l'heure courante
                 if ( CurrentHours >= OpenHours && CurrentHours <= CloseHours ) {
                     open = true;
                 } else if ( CurrentHours >= OpenHours && CurrentHours <= 23 ) {
                     open = true;
                   // Si l'heure courante est supérieur à l'heure d'ouverture et inférieur à 24h
                 } else if ( CurrentHours <= OpenHours && CurrentHours <= CloseHours ) {
                     open = true; // Si l'heure courante est inférieur à l'heure d'ouverture et l'heure de fermeture est inférieur à l'heure courante
                 }
             }

             return {
                 "id": _id,
                 "open": !!open,
                 "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000, name, slug, latitude, longitude, address,
             };
         } );
         // Sort by distances
         aCleanQuicks.sort( ( oQuickOne, oQuickTwo ) => oQuickOne.distance - oQuickTwo.distance );
         send( oRequest, oResponse, aCleanQuicks );
     } )
     .catch( ( oError ) => {
         error( oRequest, oResponse, oError );
     } );
 }
