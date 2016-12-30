/* Dylan/Quick
 *
 * /Static/modules/utils/location-manager.js - location-manager.js
 *
 * coded by Dylan Schirino
 * started at 30/12/2016
 */
 import Promise from "bluebird";

 const DEFAULT_OPTIONS = { "enableHighAccuracy": true },
     TTL = 60 * 1000; // 60s

 let oLastPosition;

 export default function( oOptions = {} ) {
     if ( oLastPosition && Date.now() - oLastPosition.timestamp < TTL ) {
         return Promise.resolve( oLastPosition );
     }

     return new Promise( function( fResolve, fReject ) { // eslint-disable-line prefer-arrow-callback
         navigator.geolocation.getCurrentPosition( ( oPosition ) => fResolve( oLastPosition = oPosition ), fReject, Object.assign( {}, DEFAULT_OPTIONS, oOptions ) );
     } );
 }
