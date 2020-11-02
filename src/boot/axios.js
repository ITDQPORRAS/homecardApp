import Vue from 'vue'
import axios from 'axios'


/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const axiosInstance = axios.create({

    // baseURL: 'http://localhost:1111/api/',
    baseURL: 'http://18.221.253.87/HomeCardBackend/public/api',
    // baseURL: 'http://localhost:8000/quasar/backends_qr/public/api/',
    // baseURL: 'http://3.20.55.147/api/',
    // baseURL: 'http://localhost:8000/QuasarPassport/back_passport/public/api/',
    withCredentials: true,
    // headers: {
    //     Authorization: 'Bearer ' + token //the token is a variable which holds the token
    //   }
    // timeout: 100000,
})

// for use inside Vue files through this.$axios
Vue.prototype.$axios = axiosInstance

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance }