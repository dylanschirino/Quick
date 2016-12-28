/* Dylan/Quick
 *
 * /src/controllers/system/Ping.js - Ping.js
 *
 * Coded by Dylan Schirino
 * At 28/12/16
 */
import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
    send( oRequest, oResponse, true );
}
