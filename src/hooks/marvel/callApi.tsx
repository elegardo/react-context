import axios from 'axios';

export const GETApi = () => {

    const params = {
        ts: '1', 
        apikey: '{apikey}', 
        hash: '{hash}'
    }
    
    const axiosMarvel = axios.create({
        timeout: 20000,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        data: {}
    });
    
    axiosMarvel.interceptors.request.use((config) => {
        config.baseURL = 'https://gateway.marvel.com/v1/public'
        config.params = params
        return config
    })

    return axiosMarvel
}