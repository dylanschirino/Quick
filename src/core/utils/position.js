/* Dylan/Quick
 *
 * /src/core/utils/Position.js - Position Utils
 *
 * Coded by Dylan Schirino
 * At 28/12/16
 */
 export default function( iLatitude, iLongitude ) {


     // Si ce n'est pas un chiffre on s'arrete
     if ( isNaN( iLatitude ) || isNaN( iLongitude ) ) {
         return false;
     }
     // On verifie qu'on bien sur la surface de la terre au niveau de la latitude
     if ( iLatitude < -90 || iLatitude > 90 ) {
         return false;
     }
     // On verifie qu'on bien sur la surface de la terre au niveau de la longitude
     if ( iLongitude < -180 || iLongitude > 180 ) {
         return false;
     }

     return {
         "latitude": iLatitude,
         "longitude": iLongitude,
     };

 }
