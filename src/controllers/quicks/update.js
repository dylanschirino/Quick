/* Dylan/Quick
 *
 * /src/controllers/quicks/Update.js - Quick Update
 *
 * coded by Dylan Schirino
 * started at 29/12/2016
 */
 import { ObjectID } from "mongodb";
 import getQuicks, { checkQuick } from "../../models/quicks";
 import { send, error } from "../../core/utils/api";
 import distance from "jeyo-distans";
 import checkPosition from "../../core/utils/position";

 const MAX_MOVE_DISTANCE = 0.1; // 1km

 export default function( oRequest, oResponse ) {
  // Get the values
     const POST = oRequest.body;

     let iLatitude = POST.latitude,
         iLongitude = POST.longitude,
         sName = POST.name,
         sQuickID,
         sAddress = ( POST.address || "" ).trim(),
         aHours = POST.hours,
         oPosition,
         aModification = [];

     try {
         sQuickID = new ObjectID( oRequest.params.id );
     } catch ( oError ) {
         return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
     }
  // Check si le quick existe
     getQuicks()
    .findOne( {
        "_id": sQuickID,
    } )
    .then( ( oQuick ) => {
        if ( !oQuick ) {
            return error( oRequest, oResponse, new Error( "Unknow Quick" ), 400 );
        }
      // Check les valeurs
        if ( iLatitude != null && iLongitude != null ) {
            oPosition = checkPosition( +iLatitude, +iLongitude );

            if ( !oPosition ) {
                return error( oRequest, oResponse, new Error( "Invalid position" ), 400 );
            }
            // Si la position n'est pas = à l'ancienne position, on check le déplacement avec la distance
            if ( oQuick.latitude !== oPosition.latitude || oQuick.longitude !== oPosition.longitude ) {
                if ( distance( oPosition, oQuick ) > MAX_MOVE_DISTANCE ) {
                    return error( oRequest, oResponse, new Error( "Movement is too big" ), 400 );
                }
                oQuick.latitude = oPosition.latitude;
                oQuick.longitude = oPosition.longitude;
                aModification.push( "latitude", "longitude" );
            }
        }
        // On check et modifie l'adresse
        if ( sAddress ) {
            oQuick.address = sAddress;
            aModification.push( "address" );
        }
        // On check et modifie les heures
        if ( aHours ) {
            oQuick.hours = aHours;
            aModification.push( "hours" );
        }
        // On check et modifie le nom
        if ( sName ) {
            oQuick.name = sName;
            oQuick.slug = sName; // Je profite d'avoir le nom pour mettre la même chose dans le slug sans que l'utilisateur doivent changer lui même.
            aModification.push( "name", "slug" );
        }


        return checkQuick( sQuickID ).then( () => {
            let oModificationToApply = {};

            if ( aModification.length === 0 ) {
                return error( oRequest, oResponse, new Error( "No changes" ), 400 );

            }
            aModification.forEach( ( sPropertyName ) => {
                oModificationToApply[ sPropertyName ] = oQuick[ sPropertyName ];
            } );

            oModificationToApply.updated_at = new Date();

            return getQuicks()
            .updateOne( {
                "_id": oQuick._id,
            },
                {
                    "$set": oModificationToApply,
                } )
            .then( ( { matchedCount, modifiedCount } ) => {
                if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                    return error( oRequest, oResponse, new Error( "Unknown save error" ), 500 );
                }

                return send( oRequest, oResponse, null, 204 );
            } );
        } );
    } )
    .catch( ( oError ) => {
        error( oRequest, oResponse, oError );
    } );
 }
