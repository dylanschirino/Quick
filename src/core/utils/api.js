/* Dylan/Quick
 *
 * /src/core/utils/api.js - Api Utils
 *
 * Coded by Dylan Schirino
 * At 28/12/16
 */
 let fSend, fError;

 fSend = function( oRequest, oResponse, oData = {}, iStatus = 200 ) {
     oResponse.status( iStatus ).json( {
         "url": `[${ oRequest.method }] ${ oRequest.url }`,
         "timestamp": Date.now(),
         "data": oData,
         "error": false,
     } );
 };

 fError = function( oRequest, oResponse, mError, iStatus = 500 ) {
     oResponse.status( iStatus ).json( {
         "url": `[${ oRequest.method }] ${ oRequest.url }`,
         "timestamp": Date.now(),
         "data": null,
         "error": mError instanceof Error ? mError.message : mError,
     } );
 };

 export {
    fSend as send,
    fError as error,
};
