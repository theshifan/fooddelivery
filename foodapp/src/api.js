// in here the interseptor are written in here adn what it does it it auto matically writes the header so we dont nee dto write it repeatedly 
// and we gonna use axios and its easier way to set up the request in here and its check if there is a access token in here and it will add it to the request 

import axios from "axios";
import { ACCESS_TOKEN } from "./constans";
import { configs } from "eslint-plugin-react-refresh";
import { error } from "jquery";


// It will import anything that is sepcified in the env variable file and it should start with VITE
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //adn this the base url
});

// this is to check if the given token in the local storage is valid or not 
 api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
 )
 export default api