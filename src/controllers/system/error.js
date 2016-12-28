/* Dylan/Quick
 *
 * /src/controllers/system/Error.js - Error.js
 *
 * Coded by Dylan Schirino
 * At 28/12/16
 */
import { error } from "../../core/utils/api";
export default function( oRequest, oResponse ) {
    error( oRequest, oResponse, { "message": "Theres an error" } );
}
