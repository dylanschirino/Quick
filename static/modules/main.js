/* Dylan/Quick
 *
 * /Static/modules/main.js- Main.js
 *
 * coded by Dylan Schirino
 * started at 30/12/2016
 */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use( VueRouter );

// import QuickList from "./components/quicks/list";
// import QuickDetails from "./components/quicks/details";

let oRouter, oApp;

oRouter = new VueRouter( {
   "routes": [
    //  { "path": "/", "component": QuickList },
    //  { "path": "/:id", "component": QuickDetails },
   ],
} );

oApp = new Vue( {
    "template": `
        <div class="wrapper">
            <header>
                <h1>Quick Application</h1>
            </header>
            <main>
                <router-view></router-view>
            </main>
            <footer>
                <a href="https://github.com/dylanschirino/Quick">dylanschirino/Quick</a>
            </footer>
        </div>
    `,
    "router": oRouter,
} );

oApp.$mount( "#app" );
