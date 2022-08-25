import axios from "axios";

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json'
})

export default {
    all() {
        return api.get('/all')
    },
    listen(coinsCode= []) {
        return api.get(`/all/${coinsCode.join()}`)
    }
};