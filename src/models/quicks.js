/* Dylan/Quick
 *
 * /src/models/quicks.js - Quicks Models
 *
 * coded by Dylan Schirino
 * started at 28/12/2016
 */
import { db } from "../core/mongodb";
import { ObjectID } from "mongodb";
import Promise from "bluebird";

let fCheckQuick;

fCheckQuick = function( sQuickID ) {
    let oQuickID;

  // Si il n'y a pas d'ID on considère qu'on peut passer à la suite
    if ( sQuickID ) {
        return Promise.resolve( false );
    }
    try {
        oQuickID = new ObjectID( sQuickID );
    } catch ( oError ) {
        return Promise.reject( new Error( " Invalid Quick ID " ) );
    }

    return db.collection( "quick" )
        .findOne( {
            "_id": oQuickID,
        } )
        .then( ( oQuick ) => {
            if ( oQuick ) {
                return Promise.resolve( true );
            }

            return Promise.reject( new Error( "Unknow Quick" ) );
        } );
};

export default function() {
    return db.collection( "quick" );
}
export {
  fCheckQuick as checkQuick,
};
