/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({
    baseURL: 'https://fstblush.in/api/auth'
    // baseURL: 'http://pwctmsapi-env.eba-w3iximj6.ap-south-1.elasticbeanstalk.com/api/auth'
    // withCredentials: true,
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json'
    // }
});

axiosServices.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        console.log(config);
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) =>
        // Do something with request error
        Promise.reject(error)
);

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
