import axios from 'axios';
import axiosCancel from 'axios-cancel';
import { Notify } from 'quasar';
import router from 'src/router';
import { getToken, setToken } from '@/utils/auth';
import { axiosInstance } from 'src/boot/axios'

axiosInstance.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + getToken(); // Set JWT token
            config.headers['Content-type'] = 'application/pdf,application/json'; // Set JWT token
        }
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        let message = error.message;
        if (error.response.data && error.response.data.errors) {
            message = error.response.data.errors;
        } else if (error.response.data && error.response.data.error) {
            message = error.response.data.error;
        }
        Notify.create({
            message: message,
            color: 'negative',
            icon: 'report_problem',
            position: 'top'
        })
        return Promise.reject(error);
    }
);

export default axiosInstance;