/* Dylan/Quick
 *
 * /Static/modules/controllers/list.js- List.js
 *
 * coded by Dylan Schirino
 * started at 30/12/2016
 */

import Vue from "vue";
import reqwest from "reqwest";
const GEO_OPTIONS = { "enableHighAccuracy": true };

let oQuickList = Vue.component( "quick-list", {
    "data": function() {
        return {
            "loaded": false,
            "quicks": {},
            "error": null,
        };
    },
    "template": `
    <div class="list-group quick-list">
      <div class="alert alert-info" v-if="!loaded">
        <p>loading…</p>
      </div>
      <div class="error" v-if="loaded && error">
        <p>
          <strong>Error:</strong> {{error.message}}
        </p>
      </div>
      <ul  class="list-group" v-if="loaded">
        <li class="list-group-item" v-for="elt in quicks" >
          <router-link class="list-group-item" :to="'/' + elt.id">
            <h3 class="list-group-item-heading"> {{ elt.name ? elt.name : "Unknown" }} </h3>
            <p class="list-group-item-text"">{{elt.address}}</p>
            <p class="open list-group-item-text" v-if="elt.open == true">Actuellement Ouvert</p>
            <p class="close" v-else="elt.open == false"> Fermé </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    `,
    mounted() {
        this.updateQuicks();
    },
    "methods": {
        updateQuicks() {
        // 1. Get user position avec jeolok pour récuperer la position actuelle de l'user
            navigator.geolocation.getCurrentPosition( this.geoSucces, this.showError, GEO_OPTIONS );
        },
        geoSucces( { coords } ) {
        // 2. Get quicks at position
            reqwest( {
                "url": "/quicks",
                "method": "get",
                "data": {
                    "latitude": coords.latitude,
                    "longitude": coords.longitude,
                    "radius": 10, // Y a pas de quick pres de chez moi !
                },
                "success": this.ajaxSuccess,
                "error": this.showError,
            } );
        },
        ajaxSuccess( oResponse ) {
            this.loaded = true;
            this.quicks = oResponse.data;
        },
        showError( oError ) {
            this.loaded = true;
            this.error = oError;
        },
    },

} );

export default oQuickList;
