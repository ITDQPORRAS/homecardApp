import Vue from 'vue'
import VueRouter from 'vue-router'

import routess from './routes'
import qr from './module/qr'
import dashboard from './module/dashboard'
// import scheduled from './module/scheduled'
import Admin from './module/Admin'

// const whiteList = ['/login', '/auth-redirect', '/reset-password', '/reset-password/:token'];
import store from 'src/store';
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export const constantRoutes = [];
export const AllRoute = [
    routess,
    qr,
    // scheduled,
    dashboard,
    Admin
];
AllRoute.forEach(element => {
    element.forEach(el => {
        constantRoutes.push(el)
    });
});
export const allRoutes = [
    constantRoutes
]
export default function( /* { store, ssrContext } */ ) {
    const Router = new VueRouter({
        scrollBehavior: () => ({ x: 0, y: 0 }),
        routes: constantRoutes,
        // Leave these as they are and change in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        mode: process.env.VUE_ROUTER_MODE,
        base: process.env.VUE_ROUTER_BASE
    })

    return Router
}