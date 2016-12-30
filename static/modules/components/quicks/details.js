/* Dylan/Quick
 *
 * /Static/modules/controllers/Details.js- Details.js
 *
 * coded by Dylan Schirino
 * started at 30/12/2016
 */
import Vue from "vue";
import reqwest from "reqwest";

let QuickDetails = Vue.component( "quick-details", {
    "data": function() {
        return {
            "loaded": false,
            "quicks": {},
            "error": null,
        };
    },
    "template": `
    <div class="list-group quick-details">
      <div class="alert alert-info" v-if="!loaded">
        <p>loading…</p>
      </div>
      <div class="error" v-if="loaded && error">
        <p>
          <strong>Error:</strong> {{error.message}}
        </p>
      </div>
      <div class="list-group-item" v-if="loaded">
          <h2>
            Details du Quick : {{ quicks.name }}
            <span class="badge"> {{ quicks.id }}</span>
          </h2>
          <p class="list-group-item-text">{{quicks.address}}</p>
          <p class="list-group-item-text">Latitude : {{quicks.latitude}}</p>
          <p class="list-group-item-text">Longitude : {{quicks.longitude}}</p>
          <p class="open list-group-item-text" v-if="quicks.open == true">Actuellement Ouvert</p>
          <br>
          <table class="table table-striped">
        <thead>
          <legend class="legend"> Heures d'ouvertures</legend>
          <tr>
            <th>Jour de la semaine</th>
            <th>Ouvertures</th>
            <th>Fermetures</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lundi</td>
            <td>{{quicks.hours[0][0]}} h</td>
            <td>{{quicks.hours[0][1]}} h</td>
          </tr>
          <tr>
            <td>Mardi</td>
            <td>{{quicks.hours[1][0]}} h</td>
            <td>{{quicks.hours[1][1]}} h</td>
          </tr>
          <tr>
            <td>Mercredi</td>
            <td>{{quicks.hours[2][0]}} h</td>
            <td>{{quicks.hours[2][1]}} h</td>
          </tr>
          <tr>
            <td>Jeudi</td>
            <td>{{quicks.hours[3][0]}} h</td>
            <td>{{quicks.hours[3][1]}} h</td>
          </tr>
          <tr>
            <td>Vendredi</td>
            <td>{{quicks.hours[4][0]}} h</td>
            <td>{{quicks.hours[4][1]}} h</td>
          </tr>
          <tr>
            <td>Samedi</td>
            <td>{{quicks.hours[5][0]}} h</td>
            <td>{{quicks.hours[5][1]}} h</td>
          </tr>
          <tr>
            <td>Dimanche</td>
            <td>{{quicks.hours[6][0]}} h</td>
            <td>{{quicks.hours[6][1]}} h</td>
          </tr>
        </tbody>
      </table>
      <router-link class="btn btn-primary" to="/">Retour à la page d'accueil</router-link>
      </div>
    </div>
    `,
    mounted() {
        reqwest( {
            "url": `/quicks/${ this.$route.params.id }`,
            "method": "get",
            "data": {},
            "error": ( oError ) => {
                this.loaded = true;
                this.error = oError.message;
            },
            "success": ( oResponse ) => {
                this.loaded = true;
                this.quicks = oResponse.data;
            },
        } );
    },
} );

export default QuickDetails;
