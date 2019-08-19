import axios from 'axios';

export const GETApi = () => {
    
    const axiosTV = axios.create({
        timeout: 20000,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    
    axiosTV.interceptors.request.use((config) => {
        config.baseURL = 'http://api.tvmaze.com'
        return config
    })

    return axiosTV
}